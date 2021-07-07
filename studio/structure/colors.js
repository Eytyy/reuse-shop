import S from '@sanity/desk-tool/structure-builder';
import {MdColorLens} from 'react-icons/md';

export const ProductColors = S.listItem()
  .title('Colors')
  .icon(MdColorLens)
  .child(
    S.documentTypeList('color')
      .title('Colors')
      .menuItems(S.documentTypeList('color').getMenuItems())
      .child((documentId) => S.document().documentId(documentId))
  );
