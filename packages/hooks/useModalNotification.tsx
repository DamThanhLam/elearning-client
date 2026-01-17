'use client';
import { ModelNotificationContextType, ModelNotificationProps } from "packages/types/modal";
import React, { createContext, useState } from "react";

const initialModalProps: ModelNotificationProps = {
    visible: false,
    params: {  
        buttons: [],
        title: "",
        content: ""
    },
    onPress: () => {},
    onClose: () => {}
};
const ModelNotificationContext = createContext<ModelNotificationContextType | undefined>(undefined);

export const ModalNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalProps, setModalProps] = useState<ModelNotificationProps>(initialModalProps);
    return (
        <ModelNotificationContext.Provider value={{modalProps, setModalProps}}>
            {children}
        </ModelNotificationContext.Provider>
    );
}
export const useModalNotification = () => {
    const context = React.useContext(ModelNotificationContext);
    if (!context) {
        throw new Error("useModalNotification must be used within a ModalNotificationProvider");
    }
    return context;
}