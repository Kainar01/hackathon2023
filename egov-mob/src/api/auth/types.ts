import { AuthUser } from '../../features/auth/auth.interface';

export interface SendVerificationRequest {
  phoneNumber: string;
}

export interface SendVerificationResponse {
  verificationId: number;
}

export interface ConfirmVerificaitonResponse {
  token: string;
  user: AuthUser;
}

export interface ConfirmVerificaitonRequest {
  verificationId: number;
  verificationCode: string;
}
