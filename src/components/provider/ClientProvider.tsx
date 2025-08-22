"use client";
import React, { FC, ReactNode } from "react";
import { SnackbarProvider } from "notistack";

type ClientProviderProps = {
  children: ReactNode;
};

const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ClientProvider;
