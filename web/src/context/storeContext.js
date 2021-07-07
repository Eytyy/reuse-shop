import React, {useContext, useEffect, useState} from 'react';
import Client from 'shopify-buy/index.unoptimized.umd';
import {usePageContext} from './pageContext';
// import cookie from 'js-cookie';

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id';

const initialStoreState = {
  currency: 'jod', // valid_options: jod, usd
  client: null,
  isAdding: false,
  checkout: {lineItems: []},
  orders: [],
};

const StoreContext = React.createContext({
  store: initialStoreState,
  setStore: () => null,
});

const StoreContextProvider = ({children}) => {
  const [store, setStore] = useState(initialStoreState);
  const [initStore, setInitStore] = useState(false);
  const {lang} = usePageContext();

  useEffect(() => {
    const client = Client.buildClient({
      storefrontAccessToken: process.env.GATSBY_STOREFRONT_TOKEN,
      domain: process.env.GATSBY_SHOPIFY_URL,
      language: lang,
    });

    setStore((prevState) => ({
      ...prevState,
      client,
    }));
  }, [lang]);

  useEffect(() => {
    if (initStore === true) return;
    if (store.client === null) return;

    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined';
      const existingCheckoutId = isBrowser
        ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
        : null;

      if (existingCheckoutId) {
        try {
          const checkout = await fetchCheckout(store, existingCheckoutId);
          // Make sure none of the items in this cart have been deleted from Shopify.
          if (checkout.lineItems.some((lineItem) => !lineItem.variant)) {
            throw new Error(
              'Invalid line item in checkout. This variant was probably deleted from Shopify'
            );
          }

          // Make sure this cart hasn't already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout, setStore);
            return;
          }
        } catch (e) {
          console.log(e);
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null);
        }
      }

      const newCheckout = await createNewCheckout(store.client);
      setCheckoutInState(newCheckout, setStore);
    };

    initializeCheckout();
    setInitStore(true);
  }, [store, setStore, initStore]);

  return (
    <StoreContext.Provider value={{store, setStore}}>
      {children}
    </StoreContext.Provider>
  );
};

function fetchCheckout(store, id) {
  const checkout = store.client.checkout.fetch(id);
  return checkout;
}

function createNewCheckout(store) {
  return store.checkout.create();
}

function setCheckoutInState(checkout, setStore) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
  }

  setStore((prevState) => ({
    ...prevState,
    checkout,
  }));
}

function useStore() {
  const {store} = useContext(StoreContext);
  return store;
}

function useClient() {
  const {
    store: {client},
  } = useContext(StoreContext);
  return client;
}

function useCartCount() {
  const {
    store: {checkout},
  } = useContext(StoreContext);

  const count = checkout.lineItems.reduce(
    (runningTotal, item) => item.quantity + runningTotal,
    0
  );
  return count;
}

function useSwitchCurrency() {
  const {setStore} = useContext(StoreContext);
  return () => {
    setStore((prevState) => ({
      ...prevState,
      currency: prevState.currency === 'jod' ? 'usd' : 'jod',
    }));
  };
}

function useCartTotals() {
  const {
    store: {checkout},
  } = useContext(StoreContext);

  const tax = checkout.totalTaxV2
    ? Number(checkout.totalTaxV2.amount).toFixed(2)
    : null;
  const total = checkout.totalPriceV2
    ? Number(checkout.totalPriceV2.amount).toFixed(2)
    : null;

  return {
    tax,
    total,
  };
}

function useCartItems() {
  const {
    store: {checkout},
  } = useContext(StoreContext);
  return checkout.lineItems;
}

function useAddItemToCart() {
  const {
    store: {checkout, client},
    setStore,
  } = useContext(StoreContext);

  async function addItemToCart(variantId, quantity) {
    if (variantId === '' || !quantity) {
      console.error('Both a size and quantity are required.');
      return;
    }

    setStore((prevState) => ({
      ...prevState,
      isAdding: true,
    }));

    const checkoutId = checkout.id;
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}];

    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    setStore((prevState) => ({
      ...prevState,
      checkout: newCheckout,
      isAdding: false,
    }));
  }

  return addItemToCart;
}

function useRemoveItemFromCart() {
  const {
    store: {client, checkout},
    setStore,
  } = useContext(StoreContext);

  async function removeItemFromCart(itemId) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      itemId,
    ]);

    setStore((prevState) => ({
      ...prevState,
      checkout: newCheckout,
    }));
  }
  return removeItemFromCart;
}

function useUpdateItemsFromCart() {
  const {
    store: {checkout, client},
    setStore,
  } = useContext(StoreContext);

  return async function updateItemsFromCart(items) {
    const updatedItems = [].concat(items);
    const newCheckout = await client.checkout.updateLineItems(
      checkout.id,
      updatedItems
    );

    setStore((prevState) => ({
      ...prevState,
      checkout: newCheckout,
    }));
  };
}

function useCheckout() {
  const {
    store: {checkout},
  } = useContext(StoreContext);
  return () => {
    window.open(checkout.webUrl, '_self');
  };
}

export {
  useClient,
  StoreContextProvider,
  useSwitchCurrency,
  useAddItemToCart,
  useStore,
  useCartCount,
  useCartItems,
  useCartTotals,
  useRemoveItemFromCart,
  useUpdateItemsFromCart,
  useCheckout,
};
