import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'
import MyBarterScreen from '../screens/MyBarterScreen'
import NotificationScreen from '../screens/NotificationsScreen'

export const AppDrawNavigator = createDrawerNavigator({
 
  Home : {
        screen : AppTabNavigator
        },
   Notification : {
        screen : NotificationScreen
      },
      MyBarters : {
        screen : MyBarterScreen
      },
    Setting : {
        screen : SettingScreen
      },
    },
{
    contentComponent:CustomSideBarMenu
},{intialRouteName:'Home'})
