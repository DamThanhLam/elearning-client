import { Media } from "./MediaType";

export interface EClass {
  id: string;
  displayName: string;
  shortDescription: string;
  avatar: Media
  status: EClassStatus;
  students: number;
  assignments: number;
  createdAt: number;
  updatedAt: number;
}

export enum EClassStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}
export interface EClassCardActions {
  onViewDetail: (eclass: EClass) => void;
  onEdit: (eclass: EClass) => void;
  onToggleStatus: (eclass: EClass) => void;
}