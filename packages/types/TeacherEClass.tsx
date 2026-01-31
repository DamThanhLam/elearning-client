import { EClassBase } from "./EClassBase";

export interface TeacherEClass extends EClassBase {
    pin: boolean;
    students: number;
    assignments: number;
    createdAt: number;
    updatedAt: number;
}