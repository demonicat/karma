import "./utils/colors";
import "./utils/ignore-warnings";

import React, { useEffect, useState } from "react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigator, useNavigationPersistence } from "./navigators";
import { ErrorBoundary } from "./screens";
import { RootStore, RootStoreProvider, setupRootStore } from "./store";
import * as storage from "./utils/storage";

export const NAVIGATION_PERSISTENCE_KEY = "ICTIOBIOMETRIA_NAVIGATION_STATE";

export default function App(): JSX.Element {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);

  if (!rootStore || !isNavigationStateRestored) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors="always">
          <AppNavigator
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </ErrorBoundary>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
}
