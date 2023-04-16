import React from 'react';

import { Box, BoxProps, styled } from '@mui/material';

type ImageProps={
    url?: string,
    alt?: string,
}

type CombinedProps=ImageProps & BoxProps

export function Image({ url, alt, ...other }:CombinedProps) {
  return (
    <ImageStyle
      component="img"
      loading="lazy"
      src={url}
      alt={alt}
      {...other}
    />
  );
}
const ImageStyle = styled(Box)({
  borderRadius: 8,
  width: '100%',
}) as typeof Box;
