import React, { useState } from 'react';

import { Box } from '@mui/material';

import { ConfirmVerificationForm } from './confirm-verificaiton-form';
import { SendVerificationForm } from './send-verificaiton-form';

export function Login() {
  const [verificationId, setVerificationId] = useState<null|number>(null);
  return (
    <Box>
      {
            verificationId ? <ConfirmVerificationForm verificationId={verificationId} />
              : <SendVerificationForm setVerification={setVerificationId} />

        }
    </Box>
  );
}
