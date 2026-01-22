
export type ModelNotificationParams = {
    buttons: Button[];
    title: string;
    content: string;
    type: "success" | "error" | "info" | "warning";
}
export type ModelNotificationProps = {
    visible: boolean;
    params: ModelNotificationParams;
}
export type Button = {
    type: "YES" | "NO" | "CANCEL" | "CLOSE";
    onPress: () => void;
}
export type ModelNotificationContextType = {
    modalProps: ModelNotificationProps;
    setModalProps: React.Dispatch<React.SetStateAction<ModelNotificationProps>>;
    buttonClose: Button;
}