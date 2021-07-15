import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import LibraryScreen from "./src/screens/LibraryScreen";

import { BottomTabIcons } from "./src/icons/BottomTabIcons";
import { Colors } from "./src/classes/Colors";

const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//edit the default theme to customize the background color and header color
const Theme = {
  dark: false,
  colors: {
    //change the color of the back button
    primary: Colors.textColor,
    //change the color of the background
    background: Colors.backgroundColor,
    //change the color of the text
    card: Colors.textColor,
    //change the color of the header text
    text: Colors.primaryColor,
  },
};

//style the bottom tab bar
const customTabBarStyle = {
  activeTintColor: Colors.primaryColor,
  inactiveTintColor: Colors.tabInactiveColor,
  labelPosition: "below-icon",
  style: {
    position: "absolute",
    backgroundColor: Colors.tabBackgroundColor,
    height: 90,
    elevation: 0,
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabStyle: {
    marginTop: 15,
  },
  showLabel: false,
};

//style the header
const customHeaderStyle = {
  headerStyle: {
    height: 120,
    backgroundColor: Colors.backgroundColor,
    shadowColor: "transparent",
  },
  headerTitleAlign: "left",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10,
  },
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ ...customHeaderStyle, title: "Course Activity" }}
      />
    </HomeStack.Navigator>
  );
};

const CalendarStackScreen = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ ...customHeaderStyle, title: "Assignments" }}
      />
    </CalendarStack.Navigator>
  );
};

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ ...customHeaderStyle, title: "Sorted Notes" }}
      />
    </LibraryStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator tabBarOptions={customTabBarStyle}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => BottomTabIcons.findIcon("Home", size, color),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarStackScreen}
          options={{
            tabBarIcon: ({ color, size }) =>
              BottomTabIcons.findIcon("Planner", size, color),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStackScreen}
          options={{
            tabBarIcon: ({ color, size }) =>
              BottomTabIcons.findIcon("Folders", size, color),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
