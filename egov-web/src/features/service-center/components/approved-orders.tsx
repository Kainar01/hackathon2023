import React from 'react';

import { Box, styled, Divider } from '@mui/material';

import serviceCenterApi from '~/api/service-center/api';

import { OrderCard } from './order-card';

export function ApprovedOrders() {
  const {
    data: orders = [], isLoading,
    isError,
  } = serviceCenterApi.endpoints.getApprovedOrders.useQuery(null);
  if (isLoading || isError) return <div>Loading or Error</div>;
  return (
    <BoxStyle>
      <BoxStyle>
        {orders.map((order: any, index: any) => (
          <Box key={order.requesterUser.id}>
            <OrderCard order={order} />
            {index !== orders.length - 1 && <Divider />}
          </Box>
        ))}
      </BoxStyle>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

// request/order/operator
