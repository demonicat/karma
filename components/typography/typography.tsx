import i18n from "i18n-js";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { Colors } from "react-native-ui-lib";

import { translate, TxKeyPath } from "../../internationalization";
import { useStores } from "../../store";

type TypographyType = {
  isTitle?: boolean;
  tx?: TxKeyPath;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  style?: StyleProp<TextStyle>;
};

export const Typography: FC<TypographyType> = observer((props) => {
  const {
    constantStore: { colorMode, language },
  } = useStores();
  const content = props.tx
    ? translate(props.tx, { locale: language, ...props.txOptions })
    : props.text;

  return (
    <Text
      style={[
        {
          color: colorMode === "light" ? Colors["textNormalLight"] : Colors["textNormalDark"],
        },
        props.isTitle
          ? { fontSize: 24, fontWeight: "bold", textAlign: "center", textTransform: "uppercase" }
          : {},
        props.style,
      ]}
    >
      {content}
    </Text>
  );
});
