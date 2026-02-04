
export interface Assignment {
  id: string;
  eclassId: string;
  displayName: string;
  shortDescription: string;
  type: AssignmentType;
  startAt: number;
  dueAt: number;
  status: AssignmentStatus;
  createdAt: number;
  updatedAt: number;
}
export enum AssignmentType {
  PROGRAMMING = 'PROGRAMMING',
  MULTIPLE_QUESTIONS = 'MULTIPLE_QUESTIONS',
}

export enum AssignmentStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  DRAFT = 'DRAFT',
}
export interface AssignmentActions {
  onEdit: (assignment: Assignment) => void;
  onToggleStatus: (assignment: Assignment) => void;
}