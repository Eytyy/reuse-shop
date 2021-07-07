export default {
  name: 'shopLocale',
  title: 'Shop Locale',
  type: 'document',
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: true,
      readOnly: true,
    },
    {type: 'translation', name: 'nostock', title: 'Out of Stock'},
    {type: 'translation', name: 'preorder', title: 'Preorder'},
    {type: 'translation', name: 'addtocart', title: 'Add To Cart'},
    {type: 'translation', name: 'adding', title: 'Adding'},
    {
      type: 'translation',
      name: 'filters_label',
      title: 'Filters Label',
    },
    {
      type: 'translation',
      name: 'filters_clear',
      title: 'Filters Clear Label',
    },
    {
      type: 'translation',
      name: 'waitlistbutton',
      title: 'Waitlist button text',
    },
    {
      type: 'translation',
      name: 'waitlistmessage',
      title: 'Waitlist confirmation message',
    },
    {type: 'translation', name: 'jod', title: 'JOD currency'},
    {type: 'translation', name: 'usd', title: 'USD currency'},
    {type: 'translation', name: 'cart_headline', title: 'Cart Headline'},

    {type: 'translation', name: 'cart_notice_1', title: 'Cart Price Note'},
    {
      type: 'translation',
      name: 'cart_notice_2',
      title: 'Cart Shipping Cost Note',
    },
    {type: 'translation', name: 'cart_empty', title: 'Empty Cart Message'},
    {type: 'translation', name: 'cart_subtotal', title: 'Subtotal'},
    {type: 'translation', name: 'cart_checkout', title: 'Checkout'},
    {type: 'translation', name: 'cart_contine', title: 'Continue Shopping'},
    {
      name: 'waitlist_msg',
      title: 'Waitlist success message',
      type: 'translationText',
    },
    {
      name: 'newsletter_msg',
      title: 'Newsletter success message',
      type: 'translationText',
    },
  ],
};
