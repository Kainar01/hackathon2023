import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, styled, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import adminAuthApi from '~/api/admin-auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

type OrderFormData = {
    name: string,
    phone: string
  }

const codeSchema = yup.object().shape(
  {
    name: yup.string().required(),
    phone: yup.string().required(),
  },
);

export function CreateCarrier() {
  const defaultValues = {
    phone: '',
    name: '',
  };

  const methods = useForm<OrderFormData>({
    resolver: yupResolver(codeSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
  } = methods;
  const [createDeliveryProvider] = adminAuthApi.endpoints.createDeliveryProvider.useMutation();
  const onSubmit = async (data: OrderFormData) => {
    const res = await createDeliveryProvider(data);
  };

  return (
    <FormProviderStyle
      methods={methods}
    >
      <Stack spacing={2}>
        <RHFTextField name="name" label="Название Компании" color="success" />
        <RHFPhoneField
          name="phone"
          label="Номер телефона"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
          size="large"
        >
          Зарегестрировать Курьерскую службу
        </Button>
      </Stack>
    </FormProviderStyle>
  );
}

const FormProviderStyle = styled(FormProvider)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});
