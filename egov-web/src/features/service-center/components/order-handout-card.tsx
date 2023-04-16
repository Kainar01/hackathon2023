import React from 'react';

import {
  Box, styled, Stack, Typography, Button,
} from '@mui/material';

import { DialogForm } from '~/components/Dialog';

import { OperatorRequest } from '../types';
import { HandoutOrderForm } from './handout-order-form';

type Props = {
    order: OperatorRequest
}

export function OrderHandoutCard({ order: { requesterUser, trustedUser, userRequest } }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleAccept = async () => {
    setOpen(true);
    // make the request to the server and accept it, wait for the courier code
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BoxStyle>
      <Stack spacing={1.5}>
        <Typography variant="caption">
          ФИО клиента:
          {requesterUser.firstName}
          {requesterUser.lastName}
          {requesterUser.middleName}
        </Typography>
        <Typography variant="caption">
          ФИО курьера:
          ANsar Serikbayev
        </Typography>
        <Typography variant="caption">
          ГосУслуга:
          {userRequest.request.serviceName}
        </Typography>
        <Typography variant="caption">
          ГосУслуга:
          {userRequest.request.organizationName}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <Button variant="outlined" color="secondary" onClick={handleAccept}>
          Выдать
        </Button>
      </Stack>
      <DialogForm
        open={open}
        onClose={handleClose}
        onOpen={handleAccept}
        title="Проверка номера"
        hasCloser
      >
        <HandoutOrderForm
          id={userRequest.id}
          buttonTitle="Проверить"
          onCloseForm={handleClose}
        />
      </DialogForm>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  minWidth: '100%',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
}));
