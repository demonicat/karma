import React, { ErrorInfo } from "react";
import { ScrollView } from "react-native";
import { Colors, Spacings, View } from "react-native-ui-lib";

import { Button, Icon, Screen, Typography } from "../../components";

export interface ErrorComponentProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export const ErrorComponent = (props: ErrorComponentProps): JSX.Element => {
  return (
    <Screen>
      <Icon
        color="red500"
        name="bug"
        style={{
          alignSelf: "center",
          marginHorizontal: "auto",
          marginVertical: Spacings["s10"],
        }}
        size={56}
      />
      <Typography
        style={{
          color: Colors["red500"],
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
        tx="screen-error.title"
      />
      <View
        style={{
          backgroundColor: Colors["redAlpha400"],
          marginVertical: 10,
          maxHeight: 256,
          padding: Spacings["s2"],
        }}
      >
        <ScrollView>
          <Typography
            style={{
              color: Colors["red500"],
            }}
            text={`${props.error}`}
          />
        </ScrollView>
      </View>
      <Button onPress={props.onReset} tx="screen-error.reset" />
    </Screen>
  );
};
