import * as Google from "expo-auth-session/providers/google";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Avatar, Colors, Dialog, Spacings, View } from "react-native-ui-lib";

import { useStores } from "../../store";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";

// Verify if Auth is ready
maybeCompleteAuthSession();

export const User: FC = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
  });
  const {
    constantStore: { colorMode },
    userStore: { getUser, uid, email, name, picture, setUser },
  } = useStores();

  useEffect(() => {
    if (response?.type === "success") {
      getUser(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <>
      <Avatar
        onPress={() => setIsVisible(true)}
        source={{
          uri: picture,
        }}
        containerStyle={{
          backgroundColor: colorMode === "light" ? Colors["blackAlpha50"] : Colors["whiteAlpha50"],
          height: 48,
          width: 48,
        }}
        imageStyle={{
          height: 48,
          width: 48,
        }}
        label="K"
      />
      <Dialog
        panDirection="up"
        onDismiss={() => setIsVisible(false)}
        containerStyle={{
          backgroundColor:
            colorMode === "light"
              ? Colors["backgroundLightDarker"]
              : Colors["backgroundDarkLighter"],
          borderRadius: Spacings["s2"],
          // height: Dimensions.get("screen").height / 1.25,
          padding: Spacings["s3"],
        }}
        visible={isVisible}
      >
        <Typography isTitle tx="modal-user.title" />
        {uid ? (
          <View style={{ marginTop: Spacings["s4"] }}>
            <Avatar
              containerStyle={{
                alignSelf: "center",
                backgroundColor:
                  colorMode === "light" ? Colors["blackAlpha50"] : Colors["whiteAlpha50"],
                height: 64,
                width: 64,
              }}
              imageStyle={{
                height: 64,
                width: 64,
              }}
              label={name}
              onPress={() => setIsVisible(true)}
              source={{
                uri: picture,
              }}
            />
            <Typography
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: Spacings["s2"],
                textAlign: "center",
                textTransform: "uppercase",
              }}
              tx="modal-user.welcome-username"
              txOptions={{ username: name }}
            />
            <Typography
              style={{
                color: Colors["gray400"],
                fontSize: 12,
                marginBottom: Spacings["s4"],
                marginTop: -Spacings["s1"],
                textAlign: "center",
              }}
              text={email}
            />
            <Button icon="logout" onPress={() => setUser({})} tx="modal-user.logout" />
          </View>
        ) : (
          <Button
            disabled={!request}
            icon="google"
            onPress={() => {
              promptAsync({
                showTitle: true,
              });
            }}
            style={{
              marginTop: Spacings["s4"],
            }}
            tx="modal-user.login-with-google"
          />
        )}
      </Dialog>
    </>
  );
});
