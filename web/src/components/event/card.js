import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {usePageContext} from '../../context/pageContext';
import {useSectionsContext} from '../../context/sectionsContext';
import {breakpoints} from '../../styles/vars';
import Figure from '../media/figure';
import Price from '../price';
import {
  Wrapper,
  ContentWrapper,
  EventImage,
  EventMeta,
  EventContent,
  EventHeadline,
  EventDescription,
  EventDetails,
  EventTime,
  EventDate,
  EventDateRow,
  EventFees,
} from './styles';

const EventCard = ({
  title,
  by,
  description,
  image,
  type,
  date,
  timeFrom,
  timeTo,
  period,
  _key,
  fees,
  last,
  wrapperTop,
  sectionIsVisible,
}) => {
  const {lang} = usePageContext();
  const {scrollPosition, headerHeight} = useSectionsContext();

  const [enableTransparency, setEnableTransparency] = useState(true);
  const [bounds, setBounds] = useState({height: 0, top: 0});
  const [visible, setVisible] = useState(true);
  const cardRef = useRef();

  const formatedDate = date
    .replace(/-/g, '/')
    .split('/')
    .reverse()
    .map((part, i, arr) => ({
      value: `${part}${i < arr.length - 1 ? '/' : ''}`,
      id: `${_key}-d-${i}`,
    }));

  const formatPeriod = (period) =>
    lang === 'en' ? period : period === 'am' ? 'ص' : 'م';
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    if (window.innerWidth >= breakpoints.tablet) {
      setEnableTransparency(false);
      setVisible(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (enableTransparency) {
      const {top, height} = cardRef.current
        ? cardRef.current.getBoundingClientRect()
        : 0;
      const initialScrollValue = scrollPosition;
      setBounds((state) => ({
        ...state,
        top: initialScrollValue > 0 ? top + initialScrollValue : top,
        height,
      }));
    }
  }, [wrapperTop, enableTransparency]);

  useLayoutEffect(() => {
    if (enableTransparency && !sectionIsVisible) {
      setVisible(false);
    }
    if (enableTransparency && sectionIsVisible) {
      const enteredFromTop = scrollPosition >= bounds.top - headerHeight;
      const didintLeave =
        scrollPosition <= bounds.top - headerHeight + bounds.height / 1.5;
      const newVisibleState = enteredFromTop && didintLeave;

      setVisible(newVisibleState);
    }
  }, [
    bounds,
    scrollPosition,
    enableTransparency,
    headerHeight,
    sectionIsVisible,
  ]);

  return (
    <Wrapper ref={cardRef} last={last}>
      <ContentWrapper>
        <EventImage>
          <Figure image={image} width={600} />
        </EventImage>
        <EventContent>
          <EventMeta>{`${type[lang]} ${lang === 'en' ? 'by' : 'عن طريق'} ${
            by[lang]
          }`}</EventMeta>
          <EventHeadline>{title && <h2>{title[lang]}</h2>}</EventHeadline>
          <EventDescription>
            {description && <div>{description[lang]}</div>}
          </EventDescription>
        </EventContent>
        <EventDetails visible={visible}>
          <EventDate className='date'>
            {date && (
              <EventDateRow>
                {formatedDate.map((date) => (
                  <div key={date.id}>{date.value}</div>
                ))}
              </EventDateRow>
            )}
            <EventFees>
              {fees ? <Price price={fees} /> : lang === 'en' ? 'Free' : 'مجاني'}
            </EventFees>
          </EventDate>
          <EventTime>
            <div className='time-from'>
              {timeFrom && <div>{formatTime(timeFrom)}</div>}
            </div>
            <div className='time-to'>
              {timeTo && <div>–{formatTime(timeTo)}</div>}
            </div>
            <div className='time-period'>{formatPeriod(period)}</div>
          </EventTime>
        </EventDetails>
      </ContentWrapper>
    </Wrapper>
  );
};

export default EventCard;
