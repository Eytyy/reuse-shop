import {RiNavigationLine} from 'react-icons/ri';

export default {
  type: 'document',
  name: 'menu',
  __experimental_actions: ['create', 'delete', 'publish', 'update'],
  icon: RiNavigationLine,
  fields: [
    {
      name: 'title',
      title: 'title',
      type: 'string',
      // hidden: 'true',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      description: 'Add, edit, and sort links.',
      of: [{type: 'menuItem'}],
      validation: (Rule) => Rule.required(),
    },
  ],
};
