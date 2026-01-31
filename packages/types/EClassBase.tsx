import { Media } from "./MediaType";

export interface EClassBase {
  id: string;
  displayName: string;
  avatar: Media
  updatedAt: number;
  status: EClassStatus;
}

export enum EClassStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}