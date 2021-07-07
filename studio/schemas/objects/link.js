import conditionalFields from '../../components/conditionalFields';

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  inputComponent: conditionalFields,
  fields: [
    {
      type: 'linkTypes',
      name: 'input',
    },
    {
      type: 'linkOptions',
      name: 'options',
    },
  ],
};
