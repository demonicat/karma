import * as Google from "expo-auth-session/providers/google";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Avatar, Colors, Dialog, Spacings, View } from "react-native-ui-lib";

import { useStores } from "../../store";
import { auth } from "../../utils/firebase";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";

// Verify if Auth is ready
maybeCompleteAuthSession();

export const User: FC = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.FIREBASE_WEB_CLIENT_ID,
  });
  const {
    constantStore: { colorMode },
    userStore: { email, name, picture, signedIn, setUser },
  } = useStores();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);

      const listener = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser({
            signedIn: !!user,
            email: user.email,
            id: user.uid,
            name: user.displayName,
            picture: user.photoURL,
          });
        } else {
          setUser({
            signedIn: !!user,
          });
        }
      });

      return () => listener();
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
        label="Fi"
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
          padding: Spacings["s3"],
        }}
        visible={isVisible}
      >
        <Typography isTitle tx="modal-user.title" />
        {signedIn ? (
          <>
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
              <Button icon="logout" onPress={() => auth.signOut()} tx="modal-user.logout" />
            </View>
          </>
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
