import { eclassApi } from "@api";
import { EClass, EClassStatus } from "packages/types/EClass";

export const onViewDetail = (eclass: EClass) => {
    window.location.href = `eclass/${eclass.id}`;
};
export const onEdit = (eclass: EClass) => {
    window.location.href = `eclass/${eclass.id}/update`;
};
export const onToggleStatus = async (eclass: EClass) => {
    await eclassApi.updateEClassStatus(eclass.id, eclass.status === EClassStatus.OPEN ? EClassStatus.CLOSED : EClassStatus.OPEN);
}