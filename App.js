
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalendarScreen from './src/screens/calendar';
import AddItemScreen from './src/screens/add-item';
import MenuScreen from './src/screens/menu';
import { StackNavigator } from 'react-navigation';


const RootStack = StackNavigator(
    {
      Menu: {
        screen: MenuScreen,
      },
      Calendar: {
        screen: CalendarScreen
      },
      Add: {
        screen: AddItemScreen
      }
    },
    {
        initialRouteName: 'Menu',

        navigationOptions: {
            headerStyle: {
                backgroundColor: 'rgb(89, 150, 205)'
            },
            headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    });

export default class App extends Component<Props> {
  render() {
    return (
      <RootStack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
