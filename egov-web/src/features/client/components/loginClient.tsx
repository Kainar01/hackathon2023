/* eslint-disable max-len */
import React, { useState } from 'react';

import {
  Box,
  Button, Checkbox, Container, TextField, Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export function LoginClient() {
  const [IIN, setIIN] = useState('');

  const [dogovor, setDogovor] = useState(false);

  const [dataObrabotka, setDataObrabotka] = useState(false);

  const { requestId } = useParams();

  async function handleClick() {
    console.log('l');
  }

  return (
    <Container>
      <Box>
        <Typography
          sx={{
            fontSize: 24,
            mt: 3,
          }}
          align="center"
        >
          Вход в портал
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            disabled
            fullWidth
            sx={{
              mt: 2,
              '.Mui-disabled ': {
                color: '#000000',
                border: '#00000',
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000000',
              },

            }}
            label="Тапсырыстын нөмері"
            defaultValue={requestId}
            variant="outlined"
            size="medium"
          />
          <TextField
            label="ЖСН"
            value={IIN}
            fullWidth
            size="medium"
            onChange={(e) => setIIN(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <Button
            color="success"
            sx={{
              paddingX: 10,
              paddingY: 1,
              color: 'white',
              mt: 2,
            }}
            variant="contained"
            onClick={() => handleClick()}
          >
            Войти
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
        </Box>
      </Box>
    </Container>
  );
}
