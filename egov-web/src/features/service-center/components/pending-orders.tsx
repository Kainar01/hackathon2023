import React from 'react';

import { Box, styled, Divider } from '@mui/material';

import serviceCenterApi from '~/api/service-center/api';

import { OrderCard } from './order-card';

export function PendingOrders() {
  const {
    data: orders = [], isLoading,
  } = serviceCenterApi.endpoints.getPendingOrders.useQuery(null);
  if (isLoading) return <div>Loading</div>;

  return (
    <BoxStyle>
      {orders.map((order: any, index: any) => (
        <Box key={order.requesterUser.firstName}>
          <OrderCard order={order} />
          {index !== orders.length - 1 && <Divider />}
        </Box>

      ))}
    </BoxStyle>

  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

// request/order/operator
