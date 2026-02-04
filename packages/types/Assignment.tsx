
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

export enum AssignmentCreateType {
  PROGRAMMING = 'PROGRAMMING',
  MULTIPLE_QUESTIONS = 'MULTIPLE_QUESTIONS',
}

export enum ProgrammingLanguage {
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  JAVASCRIPT = 'JAVASCRIPT',
  TYPESCRIPT = 'TYPESCRIPT',
}

export interface BaseAssignmentFormData {
  displayName: string;
  shortDescription: string;
  description: string;
  type: AssignmentCreateType;
  startAt: number;
  dueAt: number;
  status: AssignmentStatus;
}

export interface MultipleQuestionAssignmentFormData
  extends BaseAssignmentFormData {
  type: AssignmentCreateType.MULTIPLE_QUESTIONS;
  questionCount: number;
}

export interface ProgrammingAssignmentFormData
  extends BaseAssignmentFormData {
  type: AssignmentCreateType.PROGRAMMING;
  language: ProgrammingLanguage;
  languageVersion: string;
}

export type AssignmentFormData =
  | MultipleQuestionAssignmentFormData
  | ProgrammingAssignmentFormData;

export type SaveAssignmentRequest = AssignmentFormData;
