import {MdViewModule} from 'react-icons/md';

export default {
  name: 'pagesModule',
  title: 'Nested Pages',
  type: 'object',
  icon: MdViewModule,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'body',
      title: 'Description',
      type: 'localeBlockContent',
    },
    {
      name: 'content',
      title: 'Pages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'page'}],
        },
      ],
    },
    {
      name: 'layout',
      title: 'Display As Grid?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare: ({title, content}) => ({
      title: title?.en || title?.ar || 'untitled pages block',
      subtitle:
        content.length > 0
          ? `nested pages block with ${content.length} pages`
          : '',
    }),
  },
};
