import S from '@sanity/desk-tool/structure-builder';
import {MdTagFaces} from 'react-icons/md';

export const Makers = S.listItem()
  .title('Makers')
  .icon(MdTagFaces)
  .child(
    S.documentTypeList('maker')
      .title('Makers')
      .menuItems(S.documentTypeList('maker').getMenuItems())
      .child((documentId) => S.document().documentId(documentId))
  );
