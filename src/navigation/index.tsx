import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthNavigation from "./AuthStack";
import MainNavigation from "./MainStack";

const Stack = createStackNavigator()

export function Navigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
          />
          <Stack.Screen
            name="Main"
            component={MainNavigation}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}


