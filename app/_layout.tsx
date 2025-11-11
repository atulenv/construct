import React from 'react';
import { Tabs } from 'expo-router';
import { StateProvider } from '../src/components/State';

export default function TabLayout() {
  return (
    <StateProvider>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="screens/RiskZoneMap"
          options={{
            title: 'Risk Zone Map',
          }}
        />
        <Tabs.Screen
          name="screens/SOSScreen"
          options={{
            title: 'SOS',
          }}
        />
        <Tabs.Screen
          name="screens/UserProfile"
          options={{
            title: 'Profile',
          }}
        />
        <Tabs.Screen
          name="screens/Settings"
          options={{
            title: 'Settings',
          }}
        />
      </Tabs>
    </StateProvider>
  );
}