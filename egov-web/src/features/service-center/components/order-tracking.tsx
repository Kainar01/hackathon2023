import React from 'react';

import { Box } from '@mui/material';
import {
  YMaps, Map,
} from 'react-yandex-maps';

export function OrderTracking() {
  return (
    <Box sx={{ minHeight: 20 }}>
      <YMaps query={{ apikey: 'bf8de00e-33da-4e48-be44-d8ee1dee2acd' }}>
        <Map defaultState={{ center: [51.090720, 71.400093], zoom: 15 }} width={700} height={550} />
      </YMaps>
    </Box>

  );
}
