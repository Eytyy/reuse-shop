import conditionalFields from '../../components/conditionalFields';

export default {
  title: 'Header Text',
  name: 'headerText',
  type: 'object',
  inputComponent: conditionalFields,
  fields: [
    {
      type: 'headerTypes',
      name: 'input',
    },
    {
      type: 'headerTextOptions',
      name: 'options',
    },
  ],
};
