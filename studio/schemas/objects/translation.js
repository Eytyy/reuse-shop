import {MdTranslate} from 'react-icons/md';

export default {
  title: 'Translation',
  name: 'translation',
  type: 'object',
  icon: MdTranslate,
  fields: [
    {
      type: 'string',
      name: 'en',
      title: 'English',
    },
    {
      type: 'string',
      name: 'ar',
      title: 'Arabic',
    },
  ],
  preview: {
    select: {
      title: 'key',
      text: 'text',
    },
    prepare: ({title, text}) => ({
      subtitle: `key: ${title}`,
      title: `${text?.en} -> ${text?.ar}`,
    }),
  },
};
