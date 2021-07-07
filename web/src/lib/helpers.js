import {colors} from '../styles/vars';
import {v4 as uuidv4} from 'uuid';

export const getLinksColor = (type) => {
  switch (type) {
    case 'fullImageTextModule':
      return {
        main: '#FFF',
        secondary: '#FFF',
      };

    case 'footerModule':
      return {
        main: colors.links,
        secondary: colors.links,
      };
    default:
      return {
        main: colors.base,
        secondary: colors.base,
      };
  }
};

export const breakTitle = (title) => {
  return title
    ? title.split('<br>').map((part) => ({
        text: `${part} `,
        key: uuidv4(),
      }))
    : title;
};

export const formatPrice = (price, currency) => {
  return currency === 'usd' ? parseFloat(price * 1.41) : parseFloat(price);
};
