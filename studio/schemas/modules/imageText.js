import {MdImage} from 'react-icons/md';

export default {
  name: 'imageTextModule',
  title: 'Image & Text',
  type: 'object',
  icon: MdImage,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    },
    {
      name: 'linkTo',
      title: 'Link To',
      type: 'link',
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
      name: 'body',
      title: 'Body',
      type: 'localeBasicBlockContent',
    },
    {
      name: 'layout',
      title: 'Full Image?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare: ({title, media}) => ({
      title: 'Image & Text Block',
      subtitle: title.en || 'untitled',
      media,
    }),
  },
};
