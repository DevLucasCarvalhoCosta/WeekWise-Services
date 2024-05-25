import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens";
import CreateServiceScreen from "../screens/CreateServiceScreen";
import ListServicesScreen from "../screens/ListServicesScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateService" component={CreateServiceScreen} />
      <Stack.Screen name="ListServices" component={ListServicesScreen} />
    </Stack.Navigator>
  );
};
