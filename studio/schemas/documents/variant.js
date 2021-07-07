import {MdStyle} from 'react-icons/md';
import variantDefaultContent from '../structure/variantDefaultContent';

export default {
  name: 'variant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  icon: MdStyle,
  fieldsets: [
    {
      name: 'shopify',
      title: 'Shopify',
      description: `This information is sync'd from Shopify and can not be modified here and is mostly just a reference.`,
      options: {collapsible: true},
    },
  ],
  fields: [
    ...variantDefaultContent,
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'localizedVariantTitle',
      title: 'Variant Title',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      variantTitle: 'variantTitle',
      variantDefault: 'default',
      media: 'main.mainImage',
    },
    prepare: ({title, variantTitle, variantDefault, media}) => ({
      title,
      subtitle: `${variantTitle}${variantDefault ? ' [default]' : ''}`,
      media,
    }),
  },
};
