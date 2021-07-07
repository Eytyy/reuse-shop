import {GiChemicalDrop} from 'react-icons/gi';

export default {
  name: 'material',
  title: 'Material',
  type: 'document',
  icon: GiChemicalDrop,
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
    prepare: ({title}) => {
      let bi_title = ``;
      if (title.en) {
        bi_title += title.en;
      }
      if (title.ar) {
        bi_title += ` | ${title.ar}`;
      }
      return {title: bi_title};
    },
  },
};
