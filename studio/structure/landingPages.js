import S from '@sanity/desk-tool/structure-builder';

import {
  RiFileTextLine,
  RiPagesLine,
  RiHome2Line,
  RiStore2Line,
  RiHandHeartLine,
} from 'react-icons/ri';

export const LandingPages = S.listItem()
  .title('Pages')
  .icon(RiPagesLine)
  .child(
    S.list()
      .title('Pages')
      .items([
        S.documentListItem()
          .schemaType('front')
          .title('Home')
          .icon(RiHome2Line)
          .child(
            S.document()
              .schemaType('front')
              .documentId('home')
              .views([S.view.form()])
          ),
        S.documentListItem()
          .schemaType('shopSettings')
          .title('Shop')
          .icon(RiStore2Line)
          .child(
            S.document()
              .schemaType('shopSettings')
              .documentId('shop')
              .views([S.view.form()])
          ),

        S.documentListItem()
          .schemaType('transparency')
          .title('Transparency')
          .icon(RiHandHeartLine)
          .child(
            S.document()
              .schemaType('transparency')
              .documentId('transparency')
              .views([S.view.form()])
          ),
        S.divider(),
        S.listItem()
          .title('Modular Pages')
          .icon(RiPagesLine)
          .child(
            S.documentTypeList('page')
              .title('Modular Pages')
              .menuItems(S.documentTypeList('page').getMenuItems())
              .child((documentId) => S.document().documentId(documentId))
          ),
        S.listItem()
          .title('Basic Pages')
          .icon(RiFileTextLine)
          .child(
            S.documentTypeList('basicPage')
              .title('Basic Pages')
              .menuItems(S.documentTypeList('basicPage').getMenuItems())
              .child((documentId) => S.document().documentId(documentId))
          ),
      ])
  );
