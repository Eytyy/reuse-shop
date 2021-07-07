export default {
  name: 'shopSettings',
  type: 'document',
  title: 'Shop Settings',
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
      name: 'displayTitle',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeText',
    },
    {
      name: 'curations',
      title: 'Curations',
      type: 'localeText',
    },
    {
      name: 'creations',
      title: 'Creations',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
