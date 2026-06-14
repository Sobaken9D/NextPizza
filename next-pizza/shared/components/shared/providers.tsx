import {Toaster} from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import {StoreProvider} from "@/shared/components/shared/store-provider";
import React from "react";

interface Props {
  children: React.ReactNode;
}

// переносим все провайдеры в один копонент
export const Providers = ({children}: Props) => {
  return (
    <>
      <StoreProvider>
        {children}
        <Toaster />
        <NextTopLoader />
      </StoreProvider>
    </>
  );
}