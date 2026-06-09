'use client';

import {ReactNode, useRef} from "react";
import {AppStore, makeStore} from "@/shared/store/store";
import {Provider} from "react-redux";

interface Props {
  children?: ReactNode;
}

export function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);

  if(!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}