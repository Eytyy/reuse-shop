export default {
  name: 'productMainContent',
  title: 'Product Main Content',
  type: 'object',
  fieldsets: [
    {
      name: 'breakdown',
      title: 'Transparency',
    },
    {
      name: 'availability',
      title: 'Availability',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Description',
      type: 'localeBlockContent',
    },
    {
      name: 'breakdown',
      title: 'Cost Breakdown',
      type: 'array',
      fieldset: 'breakdown',
      of: [{type: 'costBreakdown'}],
      validation: (Rule) =>
        Rule.custom((blocks, fields) => {
          const price = fields.document.defaultPrice;

          if (!blocks || !price || blocks.length === 0) return true;

          const total = blocks.reduce((acc, {cost}) => acc + cost, 0);

          if (total > price) {
            return 'Cost breakdown total is larger than item price!';
          } else if (total < price) {
            return 'Cost breakdown total is less than item price!';
          } else return true;
        }),
    },
    {
      name: 'breakdownDetails',
      fieldset: 'breakdown',
      type: 'string',
      options: {
        breakdownDetails: true,
      },
    },
    {
      name: 'continueSelling',
      title: 'Continue Selling',
      fieldset: 'availability',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
      type: 'boolean',
    },
    {
      name: 'availability',
      title: 'Note',
      type: 'localeString',
      description: 'Text to display when continue selling is set to true.',
      fieldset: 'availability',
    },
    {
      name: 'maker',
      title: 'Maker',
      type: 'reference',
      to: {type: 'maker'},
    },
    {
      name: 'color',
      title: 'Color',
      type: 'reference',
      to: {type: 'color'},
    },
    {
      name: 'material',
      title: 'Material',
      type: 'reference',
      to: {type: 'material'},
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'file',
          title: 'Video',
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
      description: 'This has to stay in sync with Shopify',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      maker: 'maker.title',
      media: 'defaultProductVariant.images[0]',
    },
  },
};
