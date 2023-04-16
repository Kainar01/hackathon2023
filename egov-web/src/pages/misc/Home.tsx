import React from 'react';

import { styled, Container, Box } from '@mui/material';

import { Page } from '~/components/Page';
import { useResponsive } from '~/hooks/useResponsive';

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'hidden',
}));

export function HomePage() {
  const isMobile = useResponsive('down', 'sm');

  const border = { borderRadius: '30px' };
  const direction = { flexDirection: 'row' };
  const shadow = { boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)' };

  if (isMobile) {
    border.borderRadius = 'none';
    direction.flexDirection = 'column';
    shadow.boxShadow = 'none';
  }

  return (
    <Page title="Homepage">
      <Container sx={{ paddingTop: '12px' }}>
        <ContentStyle sx={{ ...border, ...direction, ...shadow }} />
      </Container>
    </Page>
  );
}
