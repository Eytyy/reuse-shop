export default {
  type: 'object',
  name: 'headerTextOptions',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeBasicBlockContent',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBasicBlockContent',
    },
    {
      name: 'headlineAndBody',
      title: 'Headline & Body',
      type: 'headlineAndBody',
    },
  ],
};
