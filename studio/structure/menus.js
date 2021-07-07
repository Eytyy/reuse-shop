import S from '@sanity/desk-tool/structure-builder';
import {RiNavigationLine} from 'react-icons/ri';

export const Menus = S.listItem()
  .title('Navigation')
  .icon(RiNavigationLine)
  .child(
    S.documentTypeList('menu')
      .title('Navigation')
      .menuItems(S.documentTypeList('menu').getMenuItems())
      .child((documentId) => S.document().documentId(documentId))
  );
