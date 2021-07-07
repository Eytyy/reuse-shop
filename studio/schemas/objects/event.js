export default {
  name: 'event',
  title: 'Event',
  type: 'object',
  fieldsets: [
    {
      name: 'date',
      title: 'Date',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'localeString',
    },
    {
      name: 'by',
      title: 'By',
      type: 'localeString',
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
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'fees',
      title: 'Fees',
      type: 'number',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'date',
    },
    {
      name: 'timeFrom',
      title: 'From',
      type: 'number',
      fieldset: 'date',
    },
    {
      name: 'timeTo',
      title: 'To',
      type: 'number',
      fieldset: 'date',
    },
    {
      name: 'period',
      title: 'AM/PM',
      type: 'string',
      options: {
        list: [
          {value: 'am', title: 'am'},
          {value: 'pm', title: 'pm'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare: ({title, date, media}) => {
      const fullTitle = title?.en || title?.ar || 'untitled';
      return {
        title: fullTitle,
        subtitle: date,
        media,
      };
    },
  },
};
