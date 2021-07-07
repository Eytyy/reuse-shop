import React, {createContext, useContext, useState} from 'react';
import {Helmet} from 'react-helmet';

const LocaleContext = createContext();

const LocalePovider = ({children, pageContext}) => {
  const [locale, setLocale] = useState({});
  return (
    <LocaleContext.Provider value={{locale, setLocale}}>
      <Helmet
        htmlAttributes={{
          lang: pageContext.lang,
          dir: pageContext.lang === 'ar' ? 'rtl' : 'ltr',
        }}
      >
        {pageContext?.alternateLinks?.map((link) => (
          <link
            key={`alt-${link.language}`}
            rel='alternate'
            hrefLang={link.language}
            href={link.path}
          />
        ))}
      </Helmet>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const {locale, setLocale} = useContext(LocaleContext);
  return [locale, setLocale];
};

export default LocalePovider;
