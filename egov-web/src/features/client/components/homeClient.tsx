/* eslint-disable max-len */
import React, { useState } from 'react';

import {
  Box, Button, Checkbox, TextField, Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import clientApi from '~/api/client/api';

export function HomeClient() {
  // eslint-disable-next-line max-len
  const [getVerificationCode] = clientApi.endpoints.getVerificationCode.useMutation();

  const [sendVerificationID] = clientApi.endpoints.sendVerificationCode.useMutation();

  const [verificationID, setVerificationID] = useState(0);

  const [dogovor, setDogovor] = useState(false);

  const [dataObrabotka, setDataObrabotka] = useState(false);

  const [iin, setIIN] = useState('');

  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [smsCode, setSmsCode] = useState('');

  const handleSubmitIIN = async () => {
    try {
      const { verificationId } = await getVerificationCode({ iin }).unwrap();
      setVerificationID(verificationId);
      setStep(1);
    } catch (e) {
      toast.error('Упс вышла ошибочка');
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await sendVerificationID({
        verificationCode: smsCode,
        verificationId: verificationID,
      }).unwrap();
      if (dogovor && dataObrabotka) {
        navigate('/client/services', { state: { response } });
      } else {
        toast.error('Выберите все поля');
      }
    } catch (e) {
      toast.error('Упс вышла ошибочка');
    }
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      {
        step === 0
        && (
          <>
            <TextField
              label="ИИН"
              value={iin}
              sx={{ mt: 3 }}
              onChange={(e) => setIIN(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                color: 'white',
                mt: 2,
                paddingX: 10,
              }}
              onClick={handleSubmitIIN}
            >
              Кіру
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{
                display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'left',
              }}
              >
                <Checkbox
                  color="success"
                  checked={dataObrabotka}
                  onChange={() => setDataObrabotka(!dataObrabotka)}
                />
                <Typography>
                  <Link to="/" style={{ color: 'black' }}>
                    Я принимаю условия публичного договора-оферты
                  </Link>
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex', alignItems: 'center', mt: 1,
              }}
              >
                <Checkbox
                  color="success"
                  checked={dogovor}
                  onChange={() => setDogovor(!dogovor)}
                />
                <Link to="/" style={{ color: 'black' }}>
                  Я ознакомлен и согласен с условиями политики конфиденциальности и персональных данных
                </Link>
              </Box>
            </Box>
          </>
        )
      }
      {
        step === 1

        && (
          <>
            <TextField
              label="Код из СМС"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              variant="outlined"
              sx={{
                width: 600,
              }}
            />
            <Button
              variant="contained"
              color="success"
              sx={{
                color: 'white',
                mt: 2,
                width: 600,
              }}
              onClick={handleSubmitCode}
            >
              Кіру
            </Button>
          </>
        )
      }
    </Box>
  );
}
