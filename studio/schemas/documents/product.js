import productDefaultContent from '../structure/productDefaultContent';

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fieldsets: [
    {
      name: 'shopify',
      title: 'Shopify',
      description: `This information is sync'd from Shopify and can not be modified here and is mostly just a reference.`,
      options: {collapsible: true},
    },

    {
      name: 'related',
      title: 'Recommended/Related Products Block',
      options: {collapsible: true},
    },
  ],
  fields: [
    ...productDefaultContent,
    {
      type: 'productMainContent',
      name: 'main',
    },
    {
      name: 'relatedProductsTitle',
      title: 'Title',
      type: 'localeString',
      fieldset: 'related',
    },
    {
      name: 'relatedProductsBody',
      title: 'Description',
      type: 'localeBlockContent',
      fieldset: 'related',
    },
    {
      name: 'relatedProductsContent',
      title: 'Products',
      type: 'array',
      fieldset: 'related',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'main.title',
      media: 'main.mainImage',
    },
    prepare: ({title, media}) => {
      return {title: title.en || 'untitled', subtitle: title.ar || '', media};
    },
  },
};
