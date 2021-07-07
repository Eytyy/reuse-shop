import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import {RiMailAddLine} from 'react-icons/ri';

import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import Waitlist from '../waitlist';

import {FormButton, OutofStockWrapper} from '../productForm/styles';

const OutOfStock = ({
  waitlist,
  activeVariantId,
  toggleWaitlist,
  location = 'default',
}) => {
  const data = useStaticQuery(graphql`
    query settingsQuery {
      settings: sanitySiteSettings(_id: {eq: "settings"}) {
        klaviyo_accountId
      }
    }
  `);

  const {lang} = usePageContext();
  const [locale] = useLocale();

  if (!data?.settings?.klaviyo_accountId) {
    console.log('Enter a valid Klaviyo account id in your site settings.');
  }

  return (
    <OutofStockWrapper location={location}>
      {!waitlist ? (
        <FormButton onClick={toggleWaitlist}>
          <span className='text'>{locale?.['nostock']?.[lang]}</span>
          <span className='btn-icon'>
            <RiMailAddLine />
          </span>
        </FormButton>
      ) : (
        <Waitlist
          accountId={data.settings.klaviyo_accountId}
          message={locale?.['waitlistmessage']?.[lang]}
          buttonText={locale?.['waitlistbutton']?.[lang]}
          variantId={activeVariantId}
        />
      )}
    </OutofStockWrapper>
  );
};

export default OutOfStock;
