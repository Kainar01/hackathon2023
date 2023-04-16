import React from 'react';

import adminAuthApi from '~/api/admin-auth/api';

import { OperatorCard } from './operator-card';

export function Cards() {
  const { data = [] } = adminAuthApi.endpoints.getAllOperators.useQuery(null);
  return (
    <>
      {data.map((operator: any) => <OperatorCard operator={operator} key={operator.firstName} />)}
    </>
  );
}
