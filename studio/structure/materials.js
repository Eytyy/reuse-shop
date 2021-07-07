import S from '@sanity/desk-tool/structure-builder';
import {GiChemicalDrop} from 'react-icons/gi';

export const ProductMaterials = S.listItem()
  .title('Materials')
  .icon(GiChemicalDrop)
  .child(
    S.documentTypeList('material')
      .title('Materials')
      .menuItems(S.documentTypeList('material').getMenuItems())
      .child((documentId) => S.document().documentId(documentId))
  );
