export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'header',
      type: 'headerModule',
      title: 'Header',
    },
    {
      name: 'content',
      title: 'Content Blocks',
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
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      image: 'header.image',
      slug: 'slug.current',
    },
    prepare: ({image, title, slug}) => {
      return {title: title || 'untitled', media: image, subtitle: `/${slug}`};
    },
  },
};
