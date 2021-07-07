import {MdViewQuilt} from 'react-icons/md';

export default {
  name: 'contentModule',
  title: 'Content',
  type: 'object',
  icon: MdViewQuilt,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'file',
          title: 'Video',
        },
      ],
    },
    {
      name: 'body',
      title: 'Description',
      type: 'localeBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'media',
    },
    prepare: ({title, media}) => {
      return {
        title: title?.en || title?.ar || 'untitled content block',
      };
    },
  },
};
