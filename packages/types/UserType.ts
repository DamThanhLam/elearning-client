export type User = {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  roles: UserRole[];
  password?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserPayload = {
  displayName: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}
