export default {
  type: 'object',
  name: 'headerTypes',
  fields: [
    {
      name: 'condition',
      title: 'Select a type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Headline',
            value: 'headline',
          },
          {
            title: 'Body',
            value: 'body',
          },
          {title: 'Headline & Body', value: 'headlineAndBody'},
        ],
        layout: 'radio', // <-- leave out to make it a dropdown menu
      },
    },
  ],
};
