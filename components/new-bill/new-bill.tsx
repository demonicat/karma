import { push, ref } from "firebase/database";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Colors, Dialog, Incubator, Spacings, View } from "react-native-ui-lib";

import { translate } from "../../internationalization";
import { useStores } from "../../store";
import { database } from "../../utils/firebase";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";

export const NewBill: FC = observer(() => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    constantStore: { colorMode, language },
    userStore: { uid },
  } = useStores();

  return (
    <>
      <Button onPress={() => setIsVisible(true)} icon="plus" tx="modal-new-bill.title" />

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
        <Typography isTitle tx="modal-new-bill.title" />

        <Formik
          initialValues={{
            billName: "",
          }}
          onSubmit={(values, r) => {
            const reference = ref(database, `users/${uid}/bills`);
            push(reference, values);

            r.resetForm();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Incubator.TextField
                placeholder={translate("modal-new-bill.fields.placeholder.bill-name", {
                  locale: language,
                })}
                onChangeText={handleChange("billName")}
                onBlur={handleBlur("billName")}
                value={values.billName}
                floatingPlaceholder
                color={colorMode === "light" ? Colors["textNormalLight"] : Colors["textNormalDark"]}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  icon="plus"
                  onPress={handleSubmit}
                  style={{
                    width: "45%",
                  }}
                  tx="modal-new-bill.buttons.add"
                />
                <Button
                  backgroundColor="gray500"
                  onPress={() => setIsVisible(false)}
                  style={{
                    width: "45%",
                  }}
                  tx="modal-new-bill.buttons.cancel"
                />
              </View>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
});
