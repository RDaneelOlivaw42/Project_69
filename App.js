import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ScanScreen from "./Screens/ScanScreen";

export default class App extends React.Component {

  render(){
    return(
      <AppContainer />
    )
  };

}


const TabNavigator = createBottomTabNavigator({
  Scan: { screen: ScanScreen }
});

const AppContainer = createAppContainer(TabNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
