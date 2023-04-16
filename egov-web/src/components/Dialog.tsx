import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogProps,
  IconButton,
  Typography,
  styled,
  Box,
} from '@mui/material';

import { Iconify } from './Iconify';

type Props = DialogProps & {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  hasCloser: boolean;
};

export function DialogForm({
  open, onClose, children, title, onOpen, hasCloser, ...drawerProps
}: Props) {
  return (
    <DialogStyle {...drawerProps} open={open} onClose={onClose} fullWidth>
      <DialogTitleStyle>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {hasCloser && (
          <IconButton onClick={() => onClose()}>
            <Iconify icon="material-symbols:close" sx={{ width: 24, height: 24 }} />
          </IconButton>
        )}
      </DialogTitleStyle>
      <DialogContent>{children}</DialogContent>
    </DialogStyle>
  );
}

const DialogStyle = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DialogTitleStyle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const DialogContent = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  flex: 1,
}));
