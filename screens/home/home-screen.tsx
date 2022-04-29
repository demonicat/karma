import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { onValue, ref } from "firebase/database";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Spacings, View } from "react-native-ui-lib";

import { Header, NewBill, Screen, Typography } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../store";
import { database } from "../../utils/firebase";

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ route }) => {
    const {
      userStore: { signedIn, name, uid },
    } = useStores();
    const [billsRetrievalFailed, setBillsRetrievalFailed] = useState(false);
    const [bills, setBills] = useState([]);

    useFocusEffect(() => {
      const reference = ref(database, `users/${uid}/bills`);
      const listener = onValue(
        reference,
        (snapshot) => {
          // Tell the app that it wasn't a failure
          setBillsRetrievalFailed(false);

          if (snapshot.val()) {
            // Map Bills fetched from Firebase to Array
            const newBills = Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
              id: key,
              ...value,
            }));

            setBills(newBills);
          }
        },
        (error) => {
          console.log(error);
          setBillsRetrievalFailed(true);
        }
      );

      return () => listener();
    });

    return (
      <Screen>
        <Header title={route.name} />
        {signedIn ? (
          <View>
            <Typography
              isTitle
              style={{
                marginVertical: Spacings["s2"],
              }}
              tx="screen-home.welcome"
              txOptions={{ username: name }}
            />
            <NewBill />
            {bills.map((bill) => (
              <Typography key={bill.id} text={bill.billName} />
            ))}
          </View>
        ) : (
          <Typography
            isTitle
            style={{
              marginVertical: Spacings["s2"],
            }}
            tx="screen-home.signed-out"
          />
        )}
      </Screen>
    );
  }
);
