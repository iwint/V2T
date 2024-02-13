import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import OnboardingScreen from "../screens/Auth/Onboarding";
import React from "react";

const AuthStack = createStackNavigator()

export default function AuthNavigation() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
    </AuthStack.Navigator>
  )
}  