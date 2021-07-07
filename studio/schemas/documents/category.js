import {AiFillTags} from 'react-icons/ai';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: AiFillTags,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => {
      let category_title = ``;
      if (title.en) {
        category_title += title.en;
      }
      if (title.ar) {
        category_title += ` | ${title.ar}`;
      }
      return {title: category_title};
    },
  },
};
