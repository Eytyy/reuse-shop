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
          if (blocks.length < 4) {
            return `Minimum 4 products.`;
          }
          if (blocks.length % 4 !== 0) {
            return `Number of products need to be multiples of four; 4, 8, 12 ...etc.`;
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
