import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import adminAuthApi from '~/api/admin-auth/api';
import { FormProvider } from '~/components/hook-form';
import { RHFPhoneField } from '~/components/hook-form/rhf-phone-field';

type FormValuesProps = {
  phoneNumber: string,
};
const SendSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Ұялы телефоныңызды толық толтырыңыз'),
});

const defaultValues = {
  phoneNumber: '',
};

interface Props {
  setVerification: (arg: number)=>void
}
export function SendVerificationForm({ setVerification }: Props) {
  const [sendVerification] = adminAuthApi.endpoints.sendVerification.useMutation();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SendSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);

    const response = await sendVerification({ phoneNumber: data.phoneNumber }).unwrap();
    setVerification(response.verificationId);
  };

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <RHFPhoneField
          name="phoneNumber"
          label="Ұйалы телефон нөмір"
        />
        <LoadingButton
          fullWidth
          size="large"
          color="secondary"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Жасырын код алу
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
