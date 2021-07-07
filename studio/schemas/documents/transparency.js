import {RiFileTextLine} from 'react-icons/ri';

export default {
  name: 'transparency',
  type: 'document',
  title: 'Transparency',
  icon: RiFileTextLine,
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Transparency',
    }),
  },
};
