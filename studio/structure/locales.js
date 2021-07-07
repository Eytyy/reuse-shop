import S from '@sanity/desk-tool/structure-builder';
import {MdTranslate} from 'react-icons/md';

export const Locales = S.listItem()
  .title('Locale')
  .icon(MdTranslate)
  .child(
    S.list()
      .title('Locales')
      .items([
        S.listItem()
          .icon(MdTranslate)
          .title('Site')
          .child(
            S.document()
              .schemaType('siteLocale')
              .documentId('siteLocale')
              .views([S.view.form()])
          ),
        S.listItem()
          .title('Shop')
          .icon(MdTranslate)
          .child(
            S.document()
              .schemaType('shopLocale')
              .documentId('shopLocale')
              .views([S.view.form()])
          ),
        S.listItem()
          .title('Product')
          .icon(MdTranslate)
          .child(
            S.document()
              .schemaType('productLocale')
              .documentId('productLocale')
              .views([S.view.form()])
          ),
      ])
  );
