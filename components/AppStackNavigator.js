import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import ExchangeScreen from '../screens/ExchangeScreen'
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen'
import MyBarterScreen from '../screens/MyBarterScreen'

export const AppStackNavigator =  createStackNavigator({
    ExchangeScreen:{screen:ExchangeScreen,navigationOptions:{headerShown:false}},
    ReceiverDetails:{screen:ReceiverDetailsScreen,navigationOptions:{headerShown:false}},
},
{initialRouteName:'ExchnageScreen'}
)