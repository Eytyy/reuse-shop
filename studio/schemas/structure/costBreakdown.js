import {MdReceipt} from 'react-icons/md';
export default {
  title: 'Cost Breakdown',
  name: 'costBreakdown',
  type: 'object',
  icon: MdReceipt,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'reference',
      to: [{type: 'cost'}],
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'number',
    },
  ],

  preview: {
    select: {
      cost: 'cost',
    },
    prepare: ({cost}) => {
      return {
        title: `JOD ${cost}`,
      };
    },
  },
};
