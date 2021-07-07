import React, {useContext, useState} from 'react';

const initialState = {
  cartIsOpen: false,
  menuIsOpen: false,
  filterIsOpen: false,
  products: [],
};

const SiteContext = React.createContext({
  state: initialState,
  setState: () => null,
});

const SiteContextProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  return (
    <SiteContext.Provider value={{state, setState}}>
      {children}
    </SiteContext.Provider>
  );
};

function useSiteState() {
  const {state} = useContext(SiteContext);
  return state;
}

function useProducts() {
  const {
    state: {products},
  } = useContext(SiteContext);

  function decodeId(id) {
    return atob(id)?.match(/\/ProductVariant\/(?<id>\d+)/)?.groups?.id;
  }
  function getProductInfo(variantId) {
    const decodedVariantId = decodeId(variantId);

    const productInfo = products?.nodes?.find((product) =>
      product?.variants?.some(
        (variant) => String(variant.variantId) === decodedVariantId
      )
    );
    return productInfo;
  }

  function getVariantTitle(id) {
    const decodedVariantId = decodeId(id);
    const product = getProductInfo(id);
    if (!product) return null;

    const variant = product.allVariants.find(
      (variant) => String(variant.variantId) === decodedVariantId
    );

    return variant?.localizedVariantTitle || '';
  }

  return {products, getProductInfo, getVariantTitle};
}

function useAddProducts() {
  const {setState} = useContext(SiteContext);

  async function addProducts(products) {
    setState((prevState) => ({
      ...prevState,
      products,
    }));
  }
  return addProducts;
}

function useToggleCart() {
  const {
    state: {cartIsOpen},
    setState,
  } = useContext(SiteContext);

  async function toggleCart() {
    setState((prevState) => ({
      ...prevState,
      cartIsOpen: !cartIsOpen,
      menuIsOpen: false,
    }));
  }

  return toggleCart;
}

function useCloseCartAndMenu() {
  const {setState} = useContext(SiteContext);

  async function CloseCartAndMenu() {
    setState((prevState) => ({
      ...prevState,
      cartIsOpen: false,
      menuIsOpen: false,
    }));
  }

  return CloseCartAndMenu;
}

function useToggleFilters() {
  const {
    state: {filterIsOpen},
    setState,
  } = useContext(SiteContext);

  async function toggleFilters() {
    setState((prevState) => ({...prevState, filterIsOpen: !filterIsOpen}));
  }

  return toggleFilters;
}

function useToggleMenu() {
  const {
    state: {menuIsOpen},
    setState,
  } = useContext(SiteContext);

  async function toggleMenu() {
    setState((prevState) => ({
      ...prevState,
      menuIsOpen: !menuIsOpen,
      cartIsOpen: false,
    }));
  }

  return toggleMenu;
}

export {
  SiteContextProvider,
  useSiteState,
  useProducts,
  useAddProducts,
  useToggleCart,
  useToggleMenu,
  useToggleFilters,
  useCloseCartAndMenu,
};
