import { StyleSheet, Image, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { getUserRoleFromDatabase } from '../services/firebaseDb';
import { getCurrentUser } from '../services/firebaseAuth';
import PlayScreen from '../screens/Play/PlayScreen';
import ProgressScreen from '../screens/ProgressScreen';

const HomeTab = () => {

  const user = getCurrentUser()



  const Tab = createBottomTabNavigator();

  const CustomTabBarIcon = ({ icon, focused }) => (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <Image
        source={icon}
        style={styles.icon}
      />
    </View>
  );

  return (
    <Tab.Navigator 
      style={styles.tabNavigator}
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: styles.tabBar, 
        showLabel: false,
      }}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/Home.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={PlayScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/Play.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              icon={require('../assets/icons/Progress.png')}
              focused={focused}
            />
          ),
        }}
      />
     
     
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#887654',
    borderTopWidth: 0,
    height: 82, 
    width: 350, 
    borderRadius: 20,
    bottom: 20,
    left: 29
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#6B8DFF',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  }
});

export default HomeTab;
