import {MdStyle} from 'react-icons/md';
import S from '@sanity/desk-tool/structure-builder';

export const ProductVariantParent = S.listItem()
  .title('Variants')
  .icon(MdStyle)
  .child(
    S.documentTypeList('product')
      .title('By Product')
      .menuItems(S.documentTypeList('product').getMenuItems())
      .filter('_type == $type && !defined(parents) && subscription != true')
      .params({type: 'product'})
      .child((productId) =>
        S.documentList()
          .title('Variants')
          .menuItems(S.documentTypeList('variant').getMenuItems())
          .filter('_type == $type && productId == $productId')
          .params({type: 'variant', productId: Number(productId)})
      )
  );
