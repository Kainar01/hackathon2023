import React, { useState } from 'react';

import {
  Box, Button, styled, Divider,
} from '@mui/material';

import { ApprovedOrders } from './approved-orders';
import { PendingOrders } from './pending-orders';

export function Orders() {
  const [pending, setPending] = useState(true);
  // request pending and approved orders
  const handleFirst = () => {
    setPending(!pending);
    setSecond(false);
    setFirst(true);
  };
  const handleSecond = () => {
    setPending(!pending);
    setFirst(false);
    setSecond(true);
  };

  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  return (
    <BoxStyle>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {
          first && (
          <>
            <Button onClick={handleFirst} variant="outlined" color="secondary">
              Не принятые Заявки
            </Button>
            <Button onClick={handleSecond} color="secondary">
              Принятые заявки
            </Button>
          </>
          )
        }
        {
          second && (
          <>
            <Button onClick={handleFirst} color="secondary">
              Не принятые Заявки
            </Button>
            <Button onClick={handleSecond} variant="outlined" color="secondary">
              Принятые заявки
            </Button>
          </>
          )
        }

      </Box>
      <Divider />
      {pending ? <PendingOrders />
        : <ApprovedOrders />}
      {/* <OrderTracking /> */}
    </BoxStyle>

  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '70vh',
  overflow: 'scroll',
  flexDirection: 'column',
  gap: theme.spacing(3),

}));
