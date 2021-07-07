import {MdAttachMoney} from 'react-icons/md';

export default {
  name: 'cost',
  title: 'Cost',
  type: 'document',
  icon: MdAttachMoney,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({title}) => ({
      title: title?.en || 'untitled cost',
    }),
  },
};
