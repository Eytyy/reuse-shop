import {MdEvent} from 'react-icons/md';

export default {
  name: 'eventsModule',
  title: 'Events',
  type: 'object',
  icon: MdEvent,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'content',
      title: 'Events',
      type: 'array',
      of: [
        {
          type: 'event',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare: ({title}) => ({
      title: 'Events Block',
      subtitle: title || 'untitled',
    }),
  },
};
