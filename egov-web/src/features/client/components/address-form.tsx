import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Checkbox, Container, Stack, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { FormProvider, RHFTextField } from '~/components/hook-form';

const addressSchema = yup.object().shape({
  region: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  houseNumber: yup.string().required(),
  apartment: yup.string().required(),
  entrance: yup.string().required(),
  block: yup.string().required(),
  floor: yup.string().required(),
  comments: yup.string().required(),
  name: yup.string().required(),
});

export function AddressFormClient() {
  const [orderForMyself, setOrderForMyself] = useState(true);

  const location = useLocation() as any;

  const { service, user } = location.state;

  const a = {
    // eslint-disable-next-line max-len
    Ё: 'YO', Й: 'Y', Ц: 'TS', У: 'U', К: 'K', Е: 'E', Н: 'N', Г: 'G', Ш: 'SH', Щ: 'SCH', З: 'Z', Х: 'H', Ъ: "'", ё: 'yo', й: 'y', ц: 'ts', у: 'u', к: 'k', е: 'e', н: 'n', г: 'g', ш: 'sh', щ: 'sch', з: 'z', х: 'h', ъ: "'", Ф: 'F', Ы: 'Y', В: 'V', А: 'A', П: 'P', Р: 'R', О: 'O', Л: 'L', Д: 'D', Ж: 'ZH', Э: 'E', ф: 'f', ы: 'y', в: 'v', а: 'a', п: 'p', р: 'r', о: 'o', л: 'l', д: 'd', ж: 'zh', э: 'e', Я: 'Ya', Ч: 'CH', С: 'S', М: 'M', И: 'I', Т: 'T', Ь: "'", Б: 'B', Ю: 'YU', я: 'ya', ч: 'ch', с: 's', м: 'm', и: 'i', т: 't', ь: "'", б: 'b', ю: 'yu',
  };

  function transliterate(word:any) {
    return word.split('').map((char:string) => a[char as never] || char).join('');
  }

  const defaultValues = {
    region: '',
    city: '',
    street: '',
    houseNumber: '',
    apartment: '',
    entrance: '',
    block: '',
    floor: '',
    comments: '',
    name: '',
  };

  const navigate = useNavigate();

  const [iin, setIIN] = useState('');

  const methods = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, formState: { isValid, isDirty }, watch } = methods;

  function onSubmit(dataForm:any) {
    const address = `${dataForm.houseNumber} ${dataForm.street}, ${dataForm.city},Kazakhstan`;
    const latinizedAddress = transliterate(address);
    console.log(latinizedAddress);
    const url = `https://nominatim.openstreetmap.org/search/
    ${encodeURIComponent(latinizedAddress)}?format=json&addressdetails=1&limit=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data:any) => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          const userLocation = { dataForm, latitude, longitude };
          if (orderForMyself) {
            navigate('/client/services/1/delivery', {
              state: {
                userLocation, service, user, orderForMyself, dataForm,
              },
            });
          } else if (!orderForMyself) {
            navigate('/client/services/1/delivery', {
              state: {
                userLocation, service, orderForMyself, iin, dataForm, user,
              },
            });
          }
        } else {
          console.log('Unable to find location for address.');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <FormProvider methods={methods}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 3,
          alignItems: 'center',
        }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={!orderForMyself}
              color="success"
              onChange={() => setOrderForMyself(!orderForMyself)}
            />
            <Typography>
              Отправить документы моему доверенному лицу
            </Typography>
          </Box>
          {!orderForMyself
        && (
        <TextField
          label="ИИН"
          value={iin}
          onChange={(e) => setIIN(e.target.value)}
          variant="outlined"
          sx={{
            width: 700,
            mb: 1,
          }}
        />
        )}
          <Stack spacing={1}>
            <RHFTextField
              label="Область"
              variant="outlined"
              name="region"
              sx={{
                width: 700,
              }}
            />
            <RHFTextField
              label="Город"
              variant="outlined"
              name="city"
              sx={{
                width: 700,
              }}
            />
            <RHFTextField
              label="Улица"
              variant="outlined"
              name="street"
              sx={{
                width: 700,
              }}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              <RHFTextField
                label="Номер дома"
                variant="outlined"
                name="houseNumber"
              />
              <RHFTextField
                label="Квартира"
                name="apartment"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              <RHFTextField
                label="Подьезд"
                name="entrance"
                variant="outlined"
              />
              <RHFTextField
                label="Этаж"
                variant="outlined"
                name="floor"
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              <RHFTextField
                label="Корпус"
                name="block"
                variant="outlined"
              />
              <RHFTextField
                label="Наименования ЖК"
                name="name"
                variant="outlined"
              />
            </Box>
            <RHFTextField
              label="Дополнительная информация"
              variant="outlined"
              sx={{
                width: 700,
              }}
              name="comments"
            />
          </Stack>
          <Button
            color="success"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              paddingX: 8,
              paddingY: 1,
              mt: 2,
              color: 'white',
            }}

          >
            Рассчитать стоимость доставки
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
}
