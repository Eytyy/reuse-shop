export default {
  type: 'object',
  name: 'linkTypes',
  fields: [
    {
      name: 'condition',
      title: 'Select a type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Page',
            value: 'page',
          },
          {
            title: 'Path',
            value: 'route',
          },
          {
            title: 'External Link',
            value: 'externalLink',
          },
        ],
        layout: 'radio', // <-- leave out to make it a dropdown menu
      },
    },
  ],
};
