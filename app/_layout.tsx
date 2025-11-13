import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { Theme } from '../constants/theme';
import { StateProvider } from '../src/components/State';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return (
    <StateProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/Permissions" options={{ title: 'Permissions', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/SOSScreen" options={{ title: 'Emergency', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/UserProfile" options={{ title: 'Profile', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/Settings" options={{ title: 'Settings', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/emergency" options={{ title: 'Emergency Services', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/help" options={{ title: 'Help', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="screens/map" options={{ title: 'Map', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
  <Stack.Screen name="screens/TravelRoutes" options={{ title: 'Travel Routes', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
  <Stack.Screen name="screens/Reports" options={{ title: 'Reports', headerStyle: { backgroundColor: Theme.colors.lightGray }, headerTitleStyle: { fontFamily: Theme.font.family.sansBold } }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </StateProvider>
  );
}