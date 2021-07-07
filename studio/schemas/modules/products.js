import {MdShoppingBasket} from 'react-icons/md';

export default {
  name: 'productsModule',
  title: 'Products',
  type: 'object',
  icon: MdShoppingBasket,
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
      title: 'Products',
      type: 'array',
      description: 'Minimum 4 products and multiples of 4.',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (Rule) =>
        Rule.custom((blocks, fields) => {
          if (blocks.length < 3) {
            return `Minimum 3 products.`;
          }
          if (blocks.length % 3 !== 0) {
            return `Number of products need to be multiples of 3; 3, 9, 12 ...etc.`;
          }
          return true;
        }),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: 'Products Block',
      subtitle: title.en || 'untitled',
    }),
  },
};
