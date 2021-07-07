import React from 'react';
import PropTypes from 'prop-types';

import {withDocument} from 'part:@sanity/form-builder';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

import {
  ThemeProvider,
  studioTheme,
  Card,
  Text,
  Stack,
  Container,
  Inline,
} from '@sanity/ui';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value));

const BreakdownDetails = React.forwardRef((props, ref) => {
  const {document} = props;

  const {
    defaultPrice,
    main: {breakdown},
  } = document;

  const totalBreakdown =
    (breakdown && breakdown.reduce((acc, {cost}) => acc + cost, 0)) || [];

  return (
    <ThemeProvider theme={studioTheme}>
      <Container>
        <Stack space={[4, 4, 4]}>
          <Inline>
            <Card paddingRight={2}>
              <Text size={1} space={[4, 4, 4]} weight='bold'>
                Price:
              </Text>
            </Card>
            <Card paddingRight={2}>
              <Text size={1}>JOD{defaultPrice}</Text>
            </Card>
          </Inline>
          <Inline>
            <Card paddingRight={2}>
              <Text size={1} weight='bold'>
                Breakdown Total:
              </Text>
            </Card>
            <Card paddingRight={2}>
              <Text size={1}>JOD{totalBreakdown}</Text>
            </Card>
          </Inline>
        </Stack>
      </Container>
    </ThemeProvider>
  );
});

BreakdownDetails.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default withDocument(BreakdownDetails);
