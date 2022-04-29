import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, View } from "react-native-ui-lib";

import { useStores } from "../../store";

type ScreenProps = {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
};

const isIos = Platform.OS === "ios";

export const Screen: FC<ScreenProps> = observer((props) => {
  const {
    constantStore: { colorMode },
  } = useStores();
  const insets = useSafeAreaInsets();
  const style = props.style || {};

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor:
          colorMode === "light" ? Colors["backgroundLight"] : Colors["backgroundDark"],
        flex: 1,
        height: "100%",
      }}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      <View
        style={{
          backgroundColor:
            colorMode === "light" ? Colors["backgroundLight"] : Colors["backgroundDark"],
          flex: 1,
          height: "100%",
          paddingTop: props.unsafe ? 0 : insets.top,
        }}
      >
        <ScrollView
          style={{
            backgroundColor:
              colorMode === "light" ? Colors["backgroundLight"] : Colors["backgroundDark"],
            flex: 1,
            height: "100%",
          }}
          contentContainerStyle={[
            {
              justifyContent: "flex-start",
              alignItems: "stretch",
              paddingHorizontal: 12,
              paddingBottom: 10,
            },
            style,
          ]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        >
          <>{props.children}</>
        </ScrollView>
      </View>
      {isIos && <StatusBar style={colorMode === "light" ? "dark" : "light"} />}
    </KeyboardAvoidingView>
  );
});
