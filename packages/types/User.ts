export type UserInformation = {
  id: string;
  displayName: string;
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
