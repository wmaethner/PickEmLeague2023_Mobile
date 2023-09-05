import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useUser } from '../../context/user';
import { useGetMisc } from '../../hooks/useGetMisc';
import { BlueGrey } from '../../utils/colors';
import WelcomeScreen from './welcome';

export default function Layout() {
  const [started, setStarted] = useState(false);
  const { UserData } = useUser();

  useEffect(() => {
    async function GetStarted() {
      const misc = await useGetMisc();
      await setStarted(misc.started);
    }
    GetStarted();

    console.log(`Userdata admin ${UserData?.admin}`);
  }, [])

  const tabView = () => (
    <View style={{flex:1}}>
      <Tabs
        screenOptions={{
          unmountOnBlur: true,
          tabBarActiveTintColor: BlueGrey.BlueGrey50,
          tabBarActiveBackgroundColor: BlueGrey.BlueGrey500,
          tabBarInactiveTintColor: BlueGrey.BlueGrey500,
          headerShown: false,
          tabBarStyle: {
            height: 40,
            borderWidth: 1,
            paddingBottom: 0,
            backgroundColor: 'white',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            // marginBottom: 1,s
          },
        }}>
        <Tabs.Screen 
          name='home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen 
          name='picks'
          options={{
            tabBarLabel: 'Picks',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="sort-bool-descending-variant" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen 
          name='season'
          options={{
            tabBarLabel: 'Season',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="podium" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name='welcome'
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
      </Tabs>
    </View>
  );

  return (
    started || UserData.admin ? tabView() : <WelcomeScreen />
  )
}