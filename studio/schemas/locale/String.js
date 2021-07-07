import supportedLanguages from './supportedLanguages';

export default {
  name: 'localeString',
  type: 'object',
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
  })),
};
