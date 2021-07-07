import {RiFileTextLine} from 'react-icons/ri';

export default {
  name: 'basicPage',
  type: 'document',
  title: 'Basic Page',
  icon: RiFileTextLine,
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
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      slug: 'slug.current',
    },
    prepare: ({title, slug}) => {
      const cleanTitle = title && title.replace(/\<br\>/, ' ');
      return {title: cleanTitle || 'untitled', subtitle: `/${slug}`};
    },
  },
};
