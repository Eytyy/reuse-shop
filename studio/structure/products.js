import S from '@sanity/desk-tool/structure-builder';
import {FaShopify} from 'react-icons/fa';

export const ProductMenuItem = S.listItem()
  .title('Products')
  .icon(FaShopify)
  .child(
    S.documentTypeList('product')
      .title('Products')
      .menuItems(S.documentTypeList('product').getMenuItems())
      .filter('_type == $type && subscription != true')
      .params({type: 'product'})
      .child((documentId) => S.document().documentId(documentId))
  );
