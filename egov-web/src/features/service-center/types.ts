export interface OperatorRequest {
    userRequest: {
      request: {
        id: number;
        requestCode: string;
        serviceName: string;
        serviceCode: string;
        organizationName: string;
        organizationLat: number;
        organizationLng: number;
        createdAt: Date;
        updatedAt: Date;
      };
      id: number;
      requesterUserId: number;
      requestId: number;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
    requesterUser: {
      id: number;
      iin: string | null;
      password: string | null;
      firstName: string | null;
      middleName: string | null;
      lastName: string | null;
      phone: string | null;
      deletedAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
    };
    trustedUser?: {
      id: number;
      iin: string | null;
      password: string | null;
      firstName: string | null;
      middleName: string | null;
      lastName: string | null;
      phone: string | null;
      deletedAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }
