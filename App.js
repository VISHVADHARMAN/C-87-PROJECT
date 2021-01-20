import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import HomeScreen from './screens/HomeScreen'
import ExchangeScreen from './screens/ExchangeScreen'
import SettingScreen from './screens/SettingScreen'
import MyBartersScreen from './screens/MyBarterScreen'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {AppDrawNavigator} from './components/AppDrawNavigatior'
import {AppTabNavigator} from './components/AppTabNavigator'

export default function App() {
  return (
   <AppContainer/>
  );
}
const SwitchNavigator = createSwitchNavigator({
  LoginScreen:{screen:SignupLoginScreen},
  Drawer:{screen:AppDrawNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
