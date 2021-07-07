require('dotenv').config();

const axios = require('axios');
const sanityClient = require('@sanity/client');
const crypto = require('crypto');

const jsondiffpatch = require('jsondiffpatch');

const fetch = require('node-fetch').default;

const {PRODUCT_QUERY, PRODUCT_UPDATE} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');

const {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_TOKEN,
  SHOPIFY_SECRET,
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  SHOPIFY_URL,
} = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const updateEverything = async (data, inputObject) => {
  const product = {
    _type: 'product',
    _id: data.id.toString(),
  };

  // Select shopify specific fields to update
  const productSchema = {
    productId: data.id,
    title: data.title,
    defaultPrice: data.variants[0].price,
    'main.title.en': data.title,
    'main.slug.current': data.handle,
    'main.continueSelling': data.variants[0].inventory_policy === 'continue',
  };

  const metaPayLoad = preparePayload(PRODUCT_UPDATE, inputObject);

  const updateMetaField = await axios({
    url: `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_URL}/admin/api/2020-10/graphql.json`,
    method: 'POST',
    headers: shopifyConfig,
    data: JSON.stringify(metaPayLoad),
  });

  try {
    let tx = client.transaction();

    // Patch Product
    tx = tx.createIfNotExists(product);
    tx = tx.patch(data.id.toString(), (patch) => patch.set(productSchema));
    console.log(`Successfully updated/patched Product ${data.id} in Sanity`);

    // Patch Product Image
    const shopifyImage = data.image ? data.image.src : null;

    try {
      if (shopifyImage) {
        await fetch(shopifyImage)
          .then((res) => res.buffer())
          .then((buffer) => client.assets.upload('image', buffer))
          .then((assetDocument) => {
            const productImageObject = {
              image: {
                _type: 'image',
                asset: {_ref: assetDocument._id, _type: 'reference'},
              },
            };
            tx = tx.patch(data.id.toString(), (patch) =>
              patch.set(productImageObject)
            );

            console.log(`patching image ${data.id} in Sanity`);
          });
      }
    } catch (error) {
      console.log(error);
    }

    // Patch Variants
    const productVariants = data.variants.map((variant) => ({
      _type: 'variant',
      _id: variant.id.toString(),
    }));

    const productVariantSchema = data.variants.map((variant, index) => ({
      title: data.title,
      'localizedVariantTitle.en': data.title,
      default: index === 0 ? true : false,
      productId: data.id,
      variantId: variant.id,
      variantTitle: variant.title,
      taxable: variant.taxable,
      inventoryQuantity: variant.inventory_quantity,
      inventoryPolicy: variant.inventory_policy,
      barcode: variant.barcode,
      sku: variant.sku,
      price: variant.price,
    }));

    // Create Variant
    productVariants.forEach((variant, i) => {
      tx = tx.createIfNotExists(variant);
      tx = tx.patch(variant._id, (p) => p.set(productVariantSchema[i]));
    });

    console.log(
      `Updating/patching Variants ${data.variants
        .map((v) => v.id)
        .join(', ')} in Sanity`
    );

    // Include variants on product document
    tx = tx.patch(data.id.toString(), (p) =>
      p.set({
        variants: data.variants.map((variant) => ({
          _type: 'reference',
          _ref: variant.id.toString(),
          _key: variant.id.toString(),
        })),
      })
    );

    console.log(`Adding variant references to ${data.id} in Sanity`);

    const result = await tx.commit();
    return statusReturn(200, {body: JSON.stringify(result)});
  } catch (error) {
    console.log('this is an error', error);
    statusReturn(500, {
      body: JSON.stringify({
        error: 'An internal server error has occured',
      }),
    });
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '');
  }

  let data;
  const hmac = event.headers['x-shopify-hmac-sha256'];

  try {
    data = JSON.parse(event.body);
    const hash = crypto
      .createHmac('sha256', SHOPIFY_SECRET)
      .update(event.body, 'utf8', 'hex')
      .digest('base64');

    if (hash !== hmac) {
      return statusReturn(400, {error: 'Invalid Webhook'});
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bad request body'});
  }

  // Create / Update
  if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {
    // Build our initial product
    const payload = preparePayload(PRODUCT_QUERY, {
      id: data.admin_graphql_api_id,
    });

    try {
      const product = await axios({
        url: `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_URL}/admin/api/2020-10/graphql.json`,
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(payload),
      });

      const {
        metafield,
        title,
        id,
        handle,
        totalVariants,
        images,
        variants,
      } = product.data.data.node;

      const metaCompare = {
        id,
        title,
        handle,
        totalVariants,
        images,
        variants,
      };

      const inputObject = {
        input: {
          id: data.admin_graphql_api_id,
          metafields: [
            {
              id: metafield ? metafield.id : null,
              namespace: 'sync',
              key: 'productData',
              value: JSON.stringify(metaCompare),
              valueType: 'STRING',
            },
          ],
        },
      };

      if (metafield) {
        console.group('debug metafield comparison');
        consile.log('metafield start');
        console.log(metafield.value);
        console.log(metaCompare);
        console.groupEnd();

        if (jsondiffpatch.diff(JSON.parse(metafield.value), metaCompare)) {
          try {
            return updateEverything(data, inputObject);
          } catch (err) {
            return statusReturn(200, {error: 'Problem with mutation'});
          }
        } else {
          return statusReturn(200, {body: 'nothing important changed'});
        }
      } else {
        try {
          return updateEverything(data, inputObject);
        } catch (error) {
          console.log(error);
          return statusReturn(200, {error: 'Problem with mutation'});
        }
      }
    } catch (error) {
      console.log(error);
      return statusReturn(200, {error: 'Problem looking up Product'});
    }
  }

  // Delete
  else if (
    data.hasOwnProperty('id') &&
    !data.hasOwnProperty('title') &&
    !data.hasOwnProperty('handle')
  ) {
    // this is triggered if Shopify sends a Product Deletion webhook that does
    // NOT contain anything besides an ID
    // sets the "deleted" boolean to true
    // you could likely use this value in Gatsby to decide whether to render the item or not

    // tread carefully:
    return client
      .patch(data.id.toString())
      .set({deleted: true})
      .commit()
      .then((deletedObject) => {
        console.log(`successfully marked ${data.id} as 'deleted'`);
      })
      .catch((error) => {
        console.error(`Sanity error:`, error);
        return statusReturn(500, {error: error[0].message});
      });
  }
};
