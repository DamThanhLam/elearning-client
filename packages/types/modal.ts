
export type ModelNotificationParams = {
    buttons: ("YES" | "NO" | "CANCEL")[];
    title: string;
    content: string;
}
export type ModelNotificationProps = {
    visible: boolean;
    params: ModelNotificationParams;
    onPress: (button: "YES" | "NO" | "CANCEL") => void;
    onClose: () => void;
}
export type ModelNotificationContextType = {
    modalProps: ModelNotificationProps;
    setModalProps: React.Dispatch<React.SetStateAction<ModelNotificationProps>>;
}