export default {
  name: 'headerModule',
  title: 'Header',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'headerText',
      type: 'headerText',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare: ({title}) => ({
      title: title.en || '',
    }),
  },
};
