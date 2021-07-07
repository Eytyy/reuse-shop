import {MdTranslate} from 'react-icons/md';

export default {
  title: 'Translation',
  name: 'translationText',
  type: 'object',
  icon: MdTranslate,
  fields: [
    {
      type: 'text',
      name: 'en',
      title: 'English',
    },
    {
      type: 'text',
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
