export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish' /* 'create', 'delete' */],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
    },
    {
      name: 'klaviyo_accountId',
      title: 'Klaviyo Account ID',
      description: `Can be retrieved from your account settings: https://www.klaviyo.com/account#api-keys-tab`,
      type: 'string',
    },
    {
      name: 'klaviyo_newslettertId',
      title: 'Klaviyo Newsletter List ID',
      description: `Can be retrieved from your list's settings.`,
      type: 'string',
    },
    {
      name: 'google_analytics',
      title: 'Google Analytics ID',
      type: 'string',
    },
    {
      name: 'google_map',
      title: 'Google Map Link',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
  ],
};
