'use client';
import ModalNotification from "@/components/ModalNotification";
import { ModelNotificationContextType, ModelNotificationProps } from "packages/types/modal";
import React, { createContext, useState } from "react";

const initialModalProps: ModelNotificationProps = {
    visible: false,
    params: {  
        buttons: [],
        title: "",
        content: "",
        type: "info"
    }
};
const ModelNotificationContext = createContext<ModelNotificationContextType | undefined>(undefined);

export const ModalNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalProps, setModalProps] = useState<ModelNotificationProps>(initialModalProps);
    const handleClose = () => {
        setModalProps(initialModalProps);
    }
    const buttonClose = {
        type: "CLOSE" as const,
        onPress: handleClose
    }
    return (
        <ModelNotificationContext.Provider value={{modalProps, setModalProps, buttonClose}}>
            {children}
            <ModalNotification {...modalProps}/>
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