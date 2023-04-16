import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import adminAuthApi from '~/api/admin-auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';

import { assignToken } from '~/features/auth';
import { useAppDispatch } from '~/store';


type FormValuesProps = {
    verificationCode: string,
};
const ConfirmSchema = Yup.object().shape({
  verificationCode: Yup.string().required('Жасырын кодты дурыс және толық толтырыңыз'),
});

const defaultValues = {
  verificationCode: '',
};
type Props = {
    verificationId: number
}

export function ConfirmVerificationForm({ verificationId }: Props) {
  const [confirmVerification] = adminAuthApi.endpoints.confirmVerification.useMutation();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ConfirmSchema),
    defaultValues,
  });
  
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const res = await confirmVerification({
      verificationCode:
         data.verificationCode,
      verificationId,
    }).unwrap();

    dispatch(assignToken(res));
    
    console.log(res);

    if (res.user.roles[0] === 'admin') {
      navigate('/admin');
    } else if (res.user.roles[0] === 'operator') {
      navigate('/service-center');
    } else if (res.user.roles[0] === 'carrier') {
      navigate('/courier');
    } else {
      navigate('./');
    }
  };
  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <RHFTextField
          name="verificationCode"
          label="Жасырын кодты толтырыңыз"
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Кіру
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
