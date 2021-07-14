import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen"
import CalendarScreen from "./src/screens/CalendarScreen"
import LibraryScreen from "./src/screens/LibraryScreen"

const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//edit the default theme to customize the background color and header color
const Theme = {
  dark: false,
  colors: {
    //make the back button white
    primary: "white",
    //make the background color an off-white
    background: "rgb(242, 242, 242)",
    //make the header color white
    card: "#ffffff",
    //make the header text black
    //text: "black",
  },
};

const HomeStackScreen = () =>{
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  )
}

const CalendarStackScreen = () =>{
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </CalendarStack.Navigator>
  )
}

const LibraryStackScreen = () =>{
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
      />
    </LibraryStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator>
        <Tab.Screen
          name = "Home"
          component = {HomeStackScreen}
        />
        <Tab.Screen
          name = "Calendar"
          component = {CalendarStackScreen}
        />
        <Tab.Screen
          name = "Library"
          component = {LibraryStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
