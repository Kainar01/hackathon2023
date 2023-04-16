import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, styled, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import adminAuthApi from '~/api/admin-auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

type OrderFormData = {
    firstName: string,
    lastName: string,
    phone: string
  }

const codeSchema = yup.object().shape(
  {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
  },
);

export function CreateOperator() {
  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  const methods = useForm<OrderFormData>({
    resolver: yupResolver(codeSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
  } = methods;
  const [createOperator] = adminAuthApi.endpoints.createOperator.useMutation();
  const onSubmit = async (data: OrderFormData) => {
    const res = await createOperator(data);
    console.log(res);
  };

  return (
    <FormProviderStyle
      methods={methods}
    >
      <Stack spacing={2}>
        <RHFTextField name="firstName" label="Имя" color="success" />
        <RHFTextField name="lastName" label="Фамилия" color="success" />
        <RHFPhoneField
          name="phone"
          label="Ұйалы телефон нөмір"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
          size="large"
        >
          Зарегестрировать Оператора
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
