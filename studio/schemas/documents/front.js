export default {
  name: 'front',
  type: 'document',
  title: 'Home',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'header',
      type: 'headerModule',
      title: 'Header',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'contentModule',
        },
        {
          type: 'eventsModule',
        },
        {
          type: 'highlightModule',
        },
        {
          type: 'imageTextModule',
        },
        {
          type: 'pagesModule',
        },
        {
          type: 'productsModule',
        },
      ],
    },
  ],
};
