import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const SectionsContext = createContext({});

export const useSectionsContext = () => {
  const context = useContext(SectionsContext);
  return context;
};

export const SectionsProvider = ({location, children}) => {
  const [navWhereabouts, setNavWhereabouts] = useState(0);
  const [scrollWithinHeader, setScrollWithinHeader] = useState(true);
  const [sections, setSections] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollPosition, setScrollPoisition] = useState(0);

  const updateSection = useCallback(({id, ...props}) => {
    setSections((state) => {
      const index = state.findIndex((section) => section.id === id);
      if (index === -1) return state;

      const sliced = [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ];
      const updatedSection = {
        ...state[index],
        ...props,
      };
      return [...sliced, updatedSection];
    });
  }, []);

  const locationRef = useRef(location.pathname);
  const pathname = location?.pathname;

  useEffect(() => {
    const currentLocation = locationRef.current;
    if (location.pathname !== currentLocation.pathname) {
      locationRef.current = location.pathname;
    }
  }, [pathname]);

  // Add New Section -> section object {id, node, bounds, title, type, visible}
  const addSection = useCallback(
    ({
      id,
      node,
      bounds = {},
      title = null,
      type = 'default',
      visible = true,
      location,
    }) => {
      setSections((state) => {
        const index = state.findIndex((section) => section.id === id);
        if (index === -1) {
          return [...state, {id, node, bounds, title, type, visible, location}];
        }

        const sliced = [
          ...state.slice(0, index),
          ...state.slice(index + 1, state.length),
        ];
        const updatedSection = {
          ...state[index],
          id,
          node,
          bounds,
          title,
          type,
          visible,
          location,
        };

        return [...sliced, updatedSection];
      });
    },
    []
  );

  // Update whether or not we have scrolled past the header.
  // Used to update main nav font size based on scroll position
  const updateScrollWithinHeaderState = useCallback(
    (scrollY) => {
      setScrollWithinHeader(
        scrollY < window.innerHeight - window.innerHeight * 0.5
      );
    },
    [setScrollWithinHeader]
  );

  function updateHeaderHeight(height) {
    setHeaderHeight(height);
  }

  const scrollRef = useRef();
  const scrollCallback = useCallback(
    (scrollPosition) => {
      scrollRef.current = scrollPosition;
      updateScrollWithinHeaderState(scrollPosition);
      setScrollPoisition(scrollPosition);
    },
    [updateScrollWithinHeaderState]
  );

  const getActiveSectionInfo = useCallback(() => {
    function findVisibleSection(section) {
      const {y, height} = section.bounds;
      const {location, type, visible} = section;

      const withinRange =
        scrollPosition >= y - headerHeight && scrollPosition < y + height;
      const matchesCurrentLocation =
        type === 'headerModule' ||
        type === 'footerModule' ||
        location === locationRef.current;
      const isVisible = matchesCurrentLocation && visible && withinRange;

      return isVisible;
    }
    if (sections.length === 0) return {};

    const visible = sections.filter(findVisibleSection);
    return (visible && visible[0]) || {};
  }, [sections, headerHeight, scrollPosition]);

  return (
    <SectionsContext.Provider
      value={{
        sections,
        scrollPosition,
        scrollWithinHeader,
        navWhereabouts,
        headerHeight,
        location,

        addSection,
        updateSection,
        getActiveSectionInfo,
        scrollCallback,

        setNavWhereabouts,
        updateHeaderHeight,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSectionInfo = (id) => {
  const {sections, scrollPosition, scrollToBottom, headerHeight} = useContext(
    SectionsContext
  );

  const section = sections.find((section) => section.id === id);

  /* scrollPosition / (section top + section height) * 100 */
  const inboundScroll = section?.bounds
    ? (scrollPosition / (section.bounds.y + section.bounds.height)) * 100
    : 0;
  const visible = typeof section !== 'undefined' ? section.visible : true;

  return {
    headerHeight,
    scrollToBottom,
    inboundScroll,
    y: section?.bounds?.y || 0,
    height: section?.bounds?.height || 0,
    scrollPosition,
    visible,
  };
};
