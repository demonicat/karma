/* eslint-disable react/display-name */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React from "react";

import { HomeScreen } from "../screens";
import { useStores } from "../store";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { DarkTheme, LightTheme } from "./navigator-theme";

export type NavigatorParamList = {
  home: undefined;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<NavigatorParamList>();

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer((props: NavigationProps): JSX.Element => {
  const { constantStore } = useStores();

  useBackButtonHandler(canExit);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={constantStore.colorMode === "dark" ? DarkTheme : LightTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
});

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["appTabs", "home", "welcome"];
export const canExit = (routeName: string): boolean => exitRoutes.includes(routeName);
