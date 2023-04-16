import React from 'react';

import {
  CardContent,
  Typography,
  Card,
  IconButton,
  Container,
  Box,
  Tab,
  Tabs,
  CardActionArea,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import orderApi from '~/api/order/api';
import { Iconify } from '~/components/Iconify';
import { useAppDispatch, useAppSelector } from '~/store';

import { addService, removeService } from '../servicesSlice';

export function ServicesList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const location = useLocation() as any;

  const { data = [] } = orderApi.endpoints.getOrders.useQuery();

  const { response } = location.state;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const selectedServices = useAppSelector((state) => state.service.services);

  const handleAdd = (e: React.SyntheticEvent, order: any) => {
    dispatch(addService({
      id: order.requestCode,
      name: order.serviceName,
      organizationName: order.organizationName,
    }));
    handleChange(e, 1);
  };

  const handleDelete = (e:React.SyntheticEvent, order: any) => {
    e.stopPropagation();
    dispatch(removeService(order.id));
  };

  return (
    <Container>
      <Typography
        sx={{
          fontSize: 24,
          mt: 10,
          mb: 5,
        }}
      >
        Здравствуйте
        {' '}
        {response.user.firstName}
        {' '}
        {response.user.middleName}
        {' '}
        {response.user.lastName}
        !
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{
          mb: 3,
        }}
      >
        Доступные сервисы
      </Typography>
      <Box
        sx={{
          mt: 3,
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: 150,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          orientation="vertical"
          indicatorColor="secondary"
        >
          <Tab label="Сервисы" sx={{ width: 200 }} />
          <Tab label="Мои заявки" sx={{ width: 200 }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {data.map((order: any) => (
            <Card elevation={10}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                <Typography>{order.serviceName}</Typography>
                <IconButton sx={{ height: 40, width: 40 }} color="success">
                  <Iconify
                    icon="material-symbols:add"
                    width={40}
                    height={40}
                    onClick={(e) => handleAdd(e, order)}
                  />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {selectedServices.length > 0 && (
            <>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>Выбранные услуги</Typography>
              {selectedServices.map((service) => (
                <Card elevation={10} sx={{ mt: 2 }}>
                  <CardActionArea
                    onClick={() => navigate(
                      `/client/services/:${service.id}`,
                      { state: { service, ...response } },
                    )}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 2,
                      }}
                    >
                      <Typography>{service.name}</Typography>
                      <IconButton
                        sx={{ height: 40, width: 40 }}
                        color="error"
                        onClick={(e) => handleDelete(e, service)}
                      >
                        <Iconify icon="ic:sharp-clear" width={40} height={40} />
                      </IconButton>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </>
          )}
          {selectedServices.length === 0 && (
            <Typography sx={{ fontSize: 18 }}>Сервисы не выбраны</Typography>
          )}
        </TabPanel>
      </Box>
    </Container>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        marginLeft: 20,
      }}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
