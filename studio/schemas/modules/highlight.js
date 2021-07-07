import {MdStar} from 'react-icons/md';

export default {
  name: 'highlightModule',
  title: 'Highlighted Content',
  type: 'object',
  icon: MdStar,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'localeBasicBlockContent',
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
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare: ({title, media}) => ({
      title: 'Highlighted Content Block',
      media,
    }),
  },
};
