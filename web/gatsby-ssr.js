import React from 'react';
import Layout from './src/components/layout';

import {PageContextProvider} from './src/context/pageContext';
import LocaleProvider from './src/context/localeProvider';
import {SectionsProvider} from './src/context/sectionsContext';
import {SiteContextProvider} from './src/context/siteContext';
import {StoreContextProvider} from './src/context/storeContext';

export const wrapPageElement = ({element, props}) => {
  return (
    <PageContextProvider {...props}>
      <StoreContextProvider>
        <SiteContextProvider>
          <LocaleProvider {...props}>
            <SectionsProvider {...props}>
              <Layout {...props}>{element}</Layout>
            </SectionsProvider>
          </LocaleProvider>
        </SiteContextProvider>
      </StoreContextProvider>
    </PageContextProvider>
  );
};
