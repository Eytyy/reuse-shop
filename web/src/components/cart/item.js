import React from 'react';
import {useState} from 'react';

import {MdClose} from 'react-icons/md';
import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import {useProducts} from '../../context/siteContext';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {
  useRemoveItemFromCart,
  useClient,
  useUpdateItemsFromCart,
} from '../../context/storeContext';
import {Link} from '../link';
import QuantitySelector from '../quantitySelector';

import {RemoveItemButton} from './cart.style';
import {
  Item,
  ItemTitle,
  ItemImage,
  ItemContent,
  ItemContentTop,
  ItemActions,
  ItemPrice,
} from './item.styles';
import Price from '../price';

const CartItem = ({id, title, quantity, variant, last}) => {
  const updateItemsFromCart = useUpdateItemsFromCart();
  const removeFromCart = useRemoveItemFromCart();
  const {lang} = usePageContext();
  const client = useClient();

  const [locale] = useLocale();

  const [stateQuantity, setQuantity] = useState(quantity);

  const {getProductInfo, getVariantTitle} = useProducts();

  const info = getProductInfo(variant.id);
  const variantTitle = getVariantTitle(variant.id);

  const url = `/products/${info.main.slug.current}`;

  const updateQuantity = (quantity) => {
    updateItemsFromCart({id, quantity});
    setQuantity(quantity);
  };

  const {price, compareAtPrice, image} = variant;

  const itemImage =
    image &&
    client.image.helpers.imageForSize(image, {
      maxWidth: 300,
      maxHeight: 300,
    });

  const itemTitle = info?.main?.title[lang] || title;

  return (
    <Item last={last}>
      {itemImage && <ItemImage src={itemImage} alt={title} />}
      <ItemContent>
        <ItemContentTop>
          <Link className='cart_item_link' to={url}>
            <ItemTitle>{itemTitle}</ItemTitle>
          </Link>
          {variant && variant.title !== 'Default Title' && (
            <div className='variant_info'>
              {variantTitle[lang] || variant.title}
            </div>
          )}
          <ItemPrice>
            {compareAtPrice && (
              <>
                <span className='original-price'>
                  <Price
                    price={(parseFloat(compareAtPrice) * stateQuantity).toFixed(
                      2
                    )}
                  />
                </span>
                {lang === 'ar' ? (
                  <span className='sep'>
                    <BsArrowLeft />
                  </span>
                ) : (
                  <span className='sep'>
                    <BsArrowRight />
                  </span>
                )}
              </>
            )}
            <span className='current-price'>
              <Price price={(parseFloat(price) * stateQuantity).toFixed(2)} />
            </span>
          </ItemPrice>
        </ItemContentTop>
        <ItemActions>
          <QuantitySelector
            updateQuantity={updateQuantity}
            quantity={stateQuantity}
          />
          <RemoveItemButton onClick={() => removeFromCart(id)}>
            <MdClose className='block' />
          </RemoveItemButton>
        </ItemActions>
      </ItemContent>
    </Item>
  );
};

export default CartItem;
