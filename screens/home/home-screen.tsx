import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { GridView, Spacings, View } from "react-native-ui-lib";

import { Header, Icon, Screen, Typography } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../store";

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ route }) => {
    const {
      constantStore: { colorMode },
    } = useStores();

    return (
      <Screen>
        <Header title={route.name} />
        <Typography
          isTitle
          style={{
            marginVertical: Spacings["s2"],
          }}
          tx="screen-home.welcome"
        />
        <Typography
          style={{ marginBottom: Spacings["s2"], textAlign: "center" }}
          tx="screen-home.what-is-karma"
        />
        <GridView
          items={[
            { title: "React Native UI Lib" },
            { title: "Expo Auth Session with Google example" },
            { title: "MobX State Tree" },
            { title: "Internationalization" },
            { title: "Apisauce (HTTP Client)" },
            { title: "Semantic Release already configured" },
            { title: "Reactotron ready" },
            { title: ".env files loaded properly" },
          ]}
          renderCustomItem={({ title }) => (
            <View
              key={title as string}
              style={{ alignItems: "center", flexDirection: "row", width: "100%" }}
            >
              <Icon
                color={colorMode === "light" ? "textNormalLight" : "textNormalDark"}
                name="arrow-right"
                size={22}
              />
              <Typography text={title as string} />
            </View>
          )}
          viewWidth={Dimensions.get("screen").width}
        />
        <Typography
          style={{ marginTop: Spacings["s6"], textAlign: "center" }}
          tx="screen-home.end"
        />
      </Screen>
    );
  }
);
