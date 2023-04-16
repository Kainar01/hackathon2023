import React from 'react';

import {
  Box, styled, Stack, Typography, Button,
} from '@mui/material';

import serviceCenterApi from '~/api/service-center/api';
import { DialogForm } from '~/components/Dialog';

import { OperatorRequest } from '../types';
import { HandoutOrderForm } from './handout-order-form';

type Props = {
    order: OperatorRequest
}

export function OrderCard({ order: { requesterUser, trustedUser, userRequest } }: Props) {
  const [open, setOpen] = React.useState(false);
  const [approveDelivery] = serviceCenterApi.endpoints.approveDelivery.useMutation();
  const [handoutOrder] = serviceCenterApi.endpoints.handoutOrder.useMutation();
  const handleAccept = async () => {
    await approveDelivery(userRequest.id).unwrap();
  };

  const handleDeny = () => {
    // deny the order
  };
  const handleHandout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BoxStyle>
      <Stack spacing={1.5}>
        <Typography variant="caption">
          ФИО клиента:
          {' '}

          {requesterUser.firstName}
          {requesterUser.lastName}
          {requesterUser.middleName}
        </Typography>
        {
            trustedUser && (
            <Typography variant="caption">
              ФИО клиента:
              {' '}
              {trustedUser.firstName}
              {' '}
              {trustedUser.lastName}
              {' '}
              {trustedUser.middleName}
            </Typography>
            )
        }
        <Typography variant="caption">
          Гос-услуга:
          {' '}
          {' '}
          {userRequest.request.serviceName}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {userRequest.status === 'pending' ? (
          <>
            <Button variant="outlined" color="secondary" onClick={handleAccept}>
              Принять
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeny}>
              Отказать
            </Button>
          </>
        )
          : (
            <Button variant="outlined" color="warning" onClick={handleHandout}>
              Выдать
            </Button>
          )}

        <DialogForm
          open={open}
          onClose={handleClose}
          onOpen={handleHandout}
          title="Проверка номера"
          hasCloser
        >
          <HandoutOrderForm
            id={userRequest.requesterUserId}
            buttonTitle="Проверить"
            onCloseForm={handleClose}
          />
        </DialogForm>
      </Stack>
    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  minWidth: '100%',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
}));
