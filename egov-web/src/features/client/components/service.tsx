import React from 'react';

import {
  Box, Button, Card, CardContent, Container, Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function Service() {
  const location = useLocation() as any;

  const { requestId } = useParams();

  const { service, user } = location.state;

  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            mt: 3,
          }}
        >
          Мои заказы
        </Typography>
        <Card sx={{ mt: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h5">
              Заказ
              {' '}
              {service.id}
            </Typography>
            <Typography>
              Наименование:
              {' '}
              {service.name}
            </Typography>
            <Typography>
              Отделение:
              {' '}
              {service.organizationName}
            </Typography>
            <Typography variant="h5">Данные получателя</Typography>
            <Typography>
              ИИН:
              {' '}
              {user.iin}
            </Typography>
            <Typography>
              Полное имя:
              {' '}
              {user.firstName}
              {' '}
              {user.middleName}
              {' '}
              {user.lastName}
            </Typography>
            <Typography>
              Номер телефона:
              {' '}
              {user.phone}
            </Typography>
            <Button
              size="medium"
              color="info"
              variant="contained"
              sx={{
                mt: 1,
                padding: 1,
              }}
              onClick={() => navigate(
                `/client/services/${requestId}/address`,
                { state: { service, user } },
              )}
            >
              Заказать доставку
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
