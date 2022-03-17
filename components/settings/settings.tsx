import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Colors, Dialog, Spacings, View } from "react-native-ui-lib";

import { useStores } from "../../store";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Typography } from "../typography/typography";

export const Settings: FC = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    constantStore: { changeColorMode, colorMode },
  } = useStores();

  return (
    <>
      <Button
        iconSource={() => (
          <Icon
            color={colorMode === "light" ? "textNormalLight" : "textNormalDark"}
            name="cog"
            size={24}
          />
        )}
        onPress={() => setIsVisible(true)}
        style={{
          backgroundColor: colorMode === "light" ? Colors["blackAlpha50"] : Colors["whiteAlpha50"],
          height: 48,
          width: 48,
        }}
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
        <Typography isTitle tx="modal-settings.title" />
        <View style={{ marginTop: Spacings["s4"] }}>
          <Button
            icon={colorMode === "light" ? "moon-waning-crescent" : "weather-sunny"}
            onPress={() => changeColorMode(colorMode === "dark" ? "light" : "dark")}
            tx="modal-settings.change-colormode"
            txOptions={{
              colorMode: colorMode === "dark" ? "light" : "dark",
            }}
          />
        </View>
      </Dialog>
    </>
  );
});
