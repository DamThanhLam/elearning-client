import { EClassBase } from "./EClassBase";
import { UserInformation } from "./User";

export interface StudentEClass extends EClassBase {
  teacher: UserInformation;
}