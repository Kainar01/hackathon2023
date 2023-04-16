import React from 'react';

import { styled, Container, Box } from '@mui/material';

import { Page } from '~/components/Page';
import { Orders } from '~/features/service-center';

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'scroll',
  width: '100%',
  minHeight: theme.spacing(5),
  padding: theme.spacing(3),
}));

export function ServiceSenterPage() {
  return (
    <Page title="Homepage">
      <Container sx={{ paddingTop: '12px' }}>
        <ContentStyle>
          <Orders />
        </ContentStyle>
      </Container>
    </Page>
  );
}
