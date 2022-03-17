import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Colors, Spacings, View } from "react-native-ui-lib";

import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../store";
import { Settings } from "../settings/settings";
import { Typography } from "../typography/typography";
import { User } from "../user/user";

type HeaderType = {
  title: keyof NavigatorParamList;
};

export const Header: FC<HeaderType> = observer(({ title }) => {
  const {
    constantStore: { colorMode },
  } = useStores();

  return (
    <View
      style={{
        alignItems: "center",
        borderBottomColor: colorMode === "light" ? Colors["gray300"] : Colors["gray500"],
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Spacings["s1"],
      }}
    >
      <Typography
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        tx={`routes.${title}`}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 100,
        }}
      >
        <User />
        <Settings />
      </View>
    </View>
  );
});
