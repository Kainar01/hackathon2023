export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

export enum Role {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  CARRIER = 'carrier',
  PROVIDER_OWNER = 'provider_owner',
}

export interface AuthUser {
  userId: number;
  phone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roles: Array<Role>;
  iin: string;
}
