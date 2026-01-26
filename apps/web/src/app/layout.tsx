'use client';
import "@/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@store";
import { ModalNotificationProvider } from "@hooks";
import AppShell from "./AppShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
        <ModalNotificationProvider>
          <AppShell>
            {children}
          </AppShell>
        </ModalNotificationProvider>
    </Provider>
  );
}
