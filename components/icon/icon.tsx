import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Colors } from "react-native-ui-lib";

type IconType = {
  color?: keyof typeof Colors;
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size?: number;
  style?: StyleProp<TextStyle>;
};

export function Icon({ color, name, size, style }: IconType): JSX.Element {
  return (
    <MaterialCommunityIcons color={Colors[color]} name={name} size={size ?? 32} style={style} />
  );
}
