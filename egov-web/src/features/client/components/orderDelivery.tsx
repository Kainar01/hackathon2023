import React, { useEffect } from 'react';

import {
  Box, Button, Card, CardContent, Container, Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import orderApi from '~/api/order/api';

export function OrderDelivery() {
  const location = useLocation() as any;

  const {
    userLocation, service, user, orderForMyself, dataForm, iin,
  } = location.state;

  const { data = [] } = orderApi.endpoints.getProviders.useQuery();

  const [getRequestUserId, { data: userID }] = orderApi.endpoints.getRequestUserId.useMutation();

  const { data: trustedPerson } = orderApi.endpoints.getClientByIIN.useQuery(iin, {
    skip: orderForMyself,
  });

  const { data: trustedPersonPhone } = orderApi.endpoints.getClientPhone.useQuery(iin, {
    skip: orderForMyself,
  });

  const [requestOrderDelivery] = orderApi.endpoints.requestOrderDelivery.useMutation();

  console.log(trustedPerson);

  useEffect(() => {
    getRequestUserId();
  }, []);
  console.log(dataForm, iin);

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  // eslint-disable-next-line max-len
  const d = getDistanceFromLatLonInKm(
    Number(userLocation.latitude),
    Number(userLocation.longitude),
    51.17531,
    71.39698,
  );

  async function handleSubmit(carrierProviderId: any) {
    const body = {
      carrierProviderId,
      phone: user.phone,
      userRequestId: userID.id,
      address: {
        ...dataForm,
        lat: Number(userLocation.latitude),
        lng: Number(userLocation.longitude),
      },
      ...(!orderForMyself ? {
        trustedUser: {
          iin: trustedPerson.iin,
          phone: trustedPersonPhone.phone,
        },
      } : {}),
    };

    try {
      const response = await requestOrderDelivery(body);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Container>
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" textAlign="center">
          Оформление доставки
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
              {orderForMyself ? user?.iin : trustedPerson?.iin}
            </Typography>
            <Typography>
              Полное имя:
              {orderForMyself
                ? `${user?.firstName} ${user?.lastName}`
                : `${trustedPerson?.firstName} ${trustedPerson?.lastName}`}
            </Typography>
            <Typography>
              Номер телефона:
              {orderForMyself ? user?.phone : trustedPersonPhone?.phone}
            </Typography>
            <Typography variant="h5">Данные доставки</Typography>
            <Typography>
              Адрес:
              {' '}
              {userLocation.dataForm.houseNumber}
              {' '}
              {userLocation.dataForm.street}
              {', '}
              {userLocation.dataForm.city}
              {`, ${userLocation.dataForm.region}.`}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }} textAlign="center">
          Стоимость доставки
        </Typography>
        {data.map((provider: any) => (
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">{provider.name}</Typography>
            <Typography>
              Расстояние между двумя точками:
              {' '}
              {d}
              {' '}
              km
            </Typography>
            <Typography>Ожидаемая цена:</Typography>
            <Button
              variant="contained"
              color="success"
              sx={{
                color: 'white',
                padding: 1,
                mt: 2,
              }}
              onClick={() => handleSubmit(provider.id)}
            >
              Заказать курьера
            </Button>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
