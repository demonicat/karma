import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  Theme,
} from "@react-navigation/native";
import { Colors } from "react-native-ui-lib";

export const DarkTheme: Theme = {
  colors: {
    ...NavigationDarkTheme.colors,
    background: Colors["gray900"],
    primary: Colors["primary500"],
  },
  dark: true,
};

export const LightTheme: Theme = {
  colors: {
    ...NavigationLightTheme.colors,
    primary: Colors["primary500"],
  },
  dark: false,
};
