export default {
  name: 'productLocale',
  title: 'Product Locale',
  type: 'document',
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: true,
      readOnly: true,
    },
    {
      name: 'size',
      title: 'Size',
      type: 'translation',
    },
    {
      name: 'maker',
      title: 'Maker',
      type: 'translation',
    },
    {
      name: 'colour',
      title: 'Colour',
      type: 'translation',
    },
    {
      name: 'material',
      title: 'Material',
      type: 'translation',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'translation',
    },
    {
      name: 'breakdown',
      title: 'Cost breakdown',
      type: 'translation',
    },
  ],
};
