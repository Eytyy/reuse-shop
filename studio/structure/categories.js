import S from '@sanity/desk-tool/structure-builder';
import {AiFillTags} from 'react-icons/ai';

export const ProductCategories = S.listItem()
  .title('Categories')
  .icon(AiFillTags)
  .child(
    S.documentTypeList('category')
      .title('Categories')
      .menuItems(S.documentTypeList('category').getMenuItems())
      .child((documentId) => S.document().documentId(documentId))
  );
