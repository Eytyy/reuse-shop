import S from '@sanity/desk-tool/structure-builder';
import {MdSettings} from 'react-icons/md';

import {ProductMenuItem} from './structure/products';
import {ProductVariantParent} from './structure/variants';
import {ProductCategories} from './structure/categories';
import {Makers} from './structure/maker';
import {ProductColors} from './structure/colors';
import {ProductMaterials} from './structure/materials';
import {Menus} from './structure/menus';
import {LandingPages} from './structure/landingPages';
import {Locales} from './structure/locales';
const excluded = [
  'product',
  'variant',
  'color',
  'material',
  'maker',
  'category',
  'front',
  // 'menu',
  'page',
  'basicPage',
  'shopSettings',
  'siteSettings',
  'event',
  'siteLocale',
  'shopLocale',
  'productLocale',
  'transparency',
];

export default () =>
  S.list()
    .title('Content')
    .items([
      LandingPages,
      Menus,
      S.divider(),
      ProductMenuItem,
      ProductVariantParent,
      ProductCategories,
      ProductColors,
      ProductMaterials,
      Makers,
      ...S.documentTypeListItems().filter(
        (listItem) => !excluded.includes(listItem.getId())
      ),
      S.divider(),
      Locales,
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('settings')
            .views([S.view.form()])
        ),
    ]);
