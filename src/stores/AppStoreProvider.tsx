'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { type AppStore, createAppStore } from './app-store';

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

export const AppStoreProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const storeRef = useRef<StoreApi<AppStore>>(createAppStore());

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('useAppStore must be used within the AppStoreProvider.');
  }

  return useStore(store, selector);
};
