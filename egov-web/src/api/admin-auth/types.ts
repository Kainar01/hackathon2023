export interface SendRequest {
  phoneNumber: string;
}

export interface SendResponse {
  verificationId: number;
}

export interface ConfirmRequest {
  verificationCode: string;
  verificationId: number;
}

export interface ConfirmResponse {
  token: string;
  user: {
    firstName: null;
    iin: null;
    lastName: null;
    middleName: null;
    phone: string;
    roles: string[];
  };
}
