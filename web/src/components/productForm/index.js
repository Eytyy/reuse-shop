import React, {useCallback, useEffect, useReducer} from 'react';

import {
  useAddItemToCart,
  useCartItems,
  useClient,
} from '../../context/storeContext';

import ProductFormDisplay from './display';

const initialState = {
  quantity: 1,
  adding: false,
  price: 0,

  available: true,
  canPreorder: false,
  stockCount: 0,
  have_product_in_stock: true,
  waitlist: false,

  variants: [],
  activeVariantId: '',
  comparePrice: undefined,
  check: true,
  gift: {
    giftEmail: '',
    giftMessage: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCT_IN_STOCK':
      return {
        ...state,
        have_product_in_stock: action.payload,
      };
    case 'SET_ACTIVE_PRODUCT':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_QUANTITY':
      return {
        ...state,
        quantity: action.payload,
      };
    case 'SET_ADDING':
      return {
        ...state,
        adding: action.payload,
      };
    case 'SET_VARIANTS':
      return {
        ...state,
        variants: action.payload,
      };
    case 'SET_COMPARE_PRICE':
      return {
        ...state,
        comparePrice: action.payload,
      };
    case 'SET_CHECK':
      return {
        ...state,
        check: action.payload,
      };
    case 'SET_GIFT':
      return {
        ...state,
        gift: action.payload,
      };
    case 'TOGGLE_WAITLIST':
      return {
        ...state,
        waitlist: !state.waitlist,
      };
    default:
      return state;
  }
}

const ProductForm = ({setPrice, showQuantity, handle, product, location}) => {
  const addItemToCart = useAddItemToCart();
  const lineItems = useCartItems();
  const client = useClient();

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    quantity,
    adding,

    available,
    stockCount,
    have_product_in_stock,
    canPreorder,
    waitlist,

    variants,
    activeVariantId,
    check,
  } = state;

  // Update stock count when items in cart are changed
  // This is to ensure that customer doesn't add products
  // more than what's available in stock
  useEffect(() => {
    if (!lineItems || lineItems.length === 0) {
      if (!have_product_in_stock) {
        dispatch({
          type: 'UPDATE_PRODUCT_IN_STOCK',
          payload: true,
        });
      }
    } else {
      const product = lineItems.find(
        (item) => item.variant.id === activeVariantId
      );
      dispatch({
        type: 'UPDATE_PRODUCT_IN_STOCK',
        payload: product ? product.quantity < stockCount : true,
      });
    }
  }, [lineItems, have_product_in_stock, stockCount, activeVariantId]);

  function fetchProduct(handle) {
    function setProductProps(root) {
      root.add('productByHandle', {args: {handle: `${handle}`}}, (product) => {
        product.add('title');
        product.add('id');
        product.addConnection('variants', {args: {first: 99}}, (variant) => {
          variant.add('title');
          variant.add('id');
          variant.add('availableForSale');
          variant.add('quantityAvailable');
          variant.add('currentlyNotInStock');
          variant.add('compareAtPrice');
          variant.add('price');
        });
      });
    }
    const productQuery = client.graphQLClient.query(setProductProps);

    return client.graphQLClient
      .send(productQuery)
      .then((res) => JSON.parse(JSON.stringify(res.model.productByHandle)))
      .catch((error) => error);
  }

  const init = useCallback(
    (product) => {
      if (!product) return;

      const decodedVariants = [];

      product.variants.forEach((variant) =>
        decodedVariants.push({
          ...variant,
        })
      );

      const defaultVariant = decodedVariants[0];
      const hasMultipleVariants = variants.length !== 1;

      const payload = {
        variants: decodedVariants,
        activeVariantId: hasMultipleVariants ? '' : defaultVariant.id,
        comparePrice: defaultVariant.compareAtPrice,
        available: hasMultipleVariants
          ? false
          : defaultVariant.availableForSale,
        canPreorder: hasMultipleVariants
          ? false
          : defaultVariant.currentlyNotInStock,
        stockCount: defaultVariant.quantityAvailable,
        check: false,
      };

      dispatch({
        type: 'SET_ACTIVE_PRODUCT',
        payload,
      });
    },
    [variants.length]
  );

  useEffect(() => {
    if (client) {
      fetchProduct(handle)
        .then((product) => init(product))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [check, handle, init, client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (adding) {
      return false;
    }
    if (
      (activeVariantId && available && have_product_in_stock) ||
      canPreorder
    ) {
      dispatch({
        type: 'SET_ADDING',
        payload: true,
      });

      const attributes = [];

      addItemToCart(activeVariantId, quantity, attributes)
        .then(() => {
          dispatch({
            type: 'SET_ADDING',
            payload: false,
          });
        })
        .then(() => {
          setQuantity(1);
        });
    }
  };

  const setQuantity = (quantity) => {
    dispatch({
      type: 'SET_QUANTITY',
      payload: parseInt(quantity),
    });
  };

  const handleVariantChange = (e) => {
    const selectedVariantId = e.target.value;
    let variant =
      selectedVariantId === ''
        ? variants[0]
        : variants.find(({id}) => id === selectedVariantId);

    const payload = {
      activeVariantId: selectedVariantId,
      comparePrice: variant.compareAtPrice,
      available: variant.availableForSale,
      canPreorder: variant.currentlyNotInStock,
      stockCount: variant.quantityAvailable,
      check: false,
    };

    dispatch({
      type: 'SET_ACTIVE_PRODUCT',
      payload,
    });

    setPrice(variant.price);
  };

  const toggleWaitlist = (e) => {
    dispatch({
      type: 'TOGGLE_WAITLIST',
    });
  };

  return (
    <ProductFormDisplay
      location={location}
      product={product}
      activeVariantId={activeVariantId}
      adding={adding}
      available={available}
      canPreorder={canPreorder}
      check={check}
      handleSubmit={handleSubmit}
      handleVariantChange={handleVariantChange}
      quantity={quantity}
      setQuantity={setQuantity}
      showQuantity={showQuantity}
      reset={() => setQuantity(0)}
      waitlist={waitlist}
      variants={variants}
      toggleWaitlist={toggleWaitlist}
    />
  );
};

export default ProductForm;
