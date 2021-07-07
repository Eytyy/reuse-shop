export default {
  type: 'object',
  name: 'linkOptions',
  fields: [
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{type: 'page'}],
    },
    {
      title: 'Path',
      name: 'route',
      description: 'Example: shop',
      type: 'string',
    },
    {
      title: 'External link',
      name: 'externalLink',
      type: 'externalLink',
      description:
        'Example: https://www.google.com, mailto:address@mail.com, tel:009625646549',
    },
  ],
};
