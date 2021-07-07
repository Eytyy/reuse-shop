export default {
  name: 'siteLocale',
  title: 'Site Locale',
  type: 'document',
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      hidden: true,
      readOnly: true,
    },
    {
      name: 'title_1',
      title: 'Title',
      type: 'translation',
    },
    {
      name: 'title_2',
      title: 'Title 2',
      type: 'translation',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'translation',
    },
    {
      name: 'more',
      title: 'Read More',
      type: 'translation',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'translation',
    },
    {
      name: 'footer_headline',
      title: 'Footer Headline',
      type: 'translation',
    },
    {
      name: 'footer_opening_hours',
      title: 'Footer Opening Hours Text',
      type: 'translationText',
    },
    {
      name: 'footer_copyrights',
      title: 'Copyrights text',
      type: 'translation',
    },
    {
      name: 'newsletter_btn_text',
      title: 'Newsletter Button Text',
      type: 'translation',
    },
    {
      name: 'newsletter_success',
      title: 'Newsletter Success Message',
      type: 'translation',
    },
    {
      name: 'callus_text',
      title: 'Callus Text',
      type: 'translation',
    },
  ],
};
