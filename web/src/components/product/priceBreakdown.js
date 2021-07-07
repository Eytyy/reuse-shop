import React from 'react';
import {useLocale} from '../../context/localeProvider';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {BreakdownLink, CostBreakdownItem, CostBreakdownWrapper} from './styles';

const CostBreakdown = ({content, lang}) => {
  const total = content.reduce((c, {cost}) => cost + c, 0);
  const [locale] = useLocale();

  return (
    <CostBreakdownWrapper>
      <CostBreakdownItem className='headline'>
        {locale?.breakdown?.[lang]}
      </CostBreakdownItem>
      {content.map(
        ({_key, cost, name}) =>
          name?.name?.[lang] && (
            <CostBreakdownItem key={_key}>
              <div className='name'>{name?.name[lang]}</div>
              <div className='value'>{cost}</div>
            </CostBreakdownItem>
          )
      )}
      <CostBreakdownItem className='total'>
        <div className='name'>{lang === 'en' ? 'Total' : 'المجموع'}</div>
        <div className='value'>{total}</div>
      </CostBreakdownItem>
      <BreakdownLink to={'/transparency'}>
        <span className='btn-text'>{locale?.more?.[lang]}</span>
        {lang === 'ar' ? (
          <span className='btn-icon'>
            <BsArrowLeft />
          </span>
        ) : (
          <span className='btn-icon'>
            <BsArrowRight />
          </span>
        )}
      </BreakdownLink>
    </CostBreakdownWrapper>
  );
};

export default CostBreakdown;
