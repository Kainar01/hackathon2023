import React from 'react';

import { Typography, Box } from '@mui/material';

type Props ={
    operator: any
}

export function OperatorCard({ operator }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 4 }}>
      <Typography>
        {operator.firstName}
      </Typography>
      <Typography>
        {operator.lastName}
      </Typography>
      <Typography>
        {operator.phone}
      </Typography>
    </Box>
  );
}
