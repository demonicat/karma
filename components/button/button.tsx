import { MaterialCommunityIcons } from "@expo/vector-icons";
import I18n from "i18n-js";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { Button as UILibButton, ButtonProps, Colors, Spacings } from "react-native-ui-lib";

import { translate, TxKeyPath } from "../../internationalization";
import { useStores } from "../../store";

type ButtonType = ButtonProps & {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  tx?: TxKeyPath;
  txOptions?: I18n.TranslateOptions;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: FC<ButtonType> = observer(
  ({ tx, txOptions, text, icon, backgroundColor, textStyle, ...rest }) => {
    const {
      constantStore: { language },
    } = useStores();

    const content = tx ? translate(tx, { locale: language, ...txOptions }) : text;
    const isBackgroundColorDark = Colors.isDark(Colors[backgroundColor]);

    return (
      <UILibButton backgroundColor={Colors[backgroundColor ?? "primary500"]} {...rest}>
        {icon && (
          <MaterialCommunityIcons
            color={!isBackgroundColorDark ? Colors["textNormalLight"] : Colors["textNormalDark"]}
            name={icon}
            size={14}
            style={{ marginRight: Spacings["s1"] }}
          />
        )}
        <Text
          style={[
            {
              color: !isBackgroundColorDark ? Colors["textNormalLight"] : Colors["textNormalDark"],
            },
            textStyle,
          ]}
        >
          {content}
        </Text>
      </UILibButton>
    );
  }
);
