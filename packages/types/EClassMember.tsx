
export enum EClassMemberStatus {
  ACTIVATED = 'ACTIVATED',
}

export interface EClassMember {
  id: string;
  classId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  status: EClassMemberStatus;
  joinedAt: number;
  createdAt: number;
  updatedAt: number;
}

export interface StudentAssignmentStats {
  total: number;
  completed: number;
  pending: number;
}
