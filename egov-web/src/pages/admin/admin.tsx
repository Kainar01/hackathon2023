import React from 'react';

import {
  Box, styled, Container, Divider,
} from '@mui/material';

import { CreateOperator, CreateCarrier, Cards } from '~/features/admin';

export function AdminPage() {
  return (
    <BoxStyle>
      <Container>
        Create Operator
        <CreateOperator />
      </Container>
      <Divider />
      <Container>
        Create Carrier Provider
        <CreateCarrier />
      </Container>
      <Divider />
      <Container>
        View All operators
        <Cards />
      </Container>

    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),

  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

}));
