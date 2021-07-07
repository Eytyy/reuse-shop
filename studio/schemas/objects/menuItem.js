import {MdLink} from 'react-icons/md';

export default {
  title: 'Menu Item',
  name: 'menuItem',
  type: 'object',
  icon: MdLink,
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
      description: 'Only one value of these will be used',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'localeString',
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      fieldset: 'link',
      to: [{type: 'page', type: 'basicPage'}],
    },
    {
      title: 'Path',
      name: 'route',
      fieldset: 'link',
      description: 'Example: shop',
      type: 'string',
    },
    {
      title: 'External link',
      name: 'externalLink',
      type: 'externalLink',
      description:
        'Example: https://www.google.com, mailto:address@mail.com, tel:009625646549',
      fieldset: 'link',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      page: 'page.slug.current',
      route: 'route',
      link: 'externalLink',
    },
    prepare({title, page, route, link}) {
      let subtitle = 'Not set';
      if (page) {
        subtitle = `Route: /${page}`;
      }
      if (route) {
        subtitle = `Route: /${route}`;
      }
      if (link) {
        subtitle = `External: ${link}`;
      }
      return {
        title,
        subtitle,
      };
    },
  },
};
