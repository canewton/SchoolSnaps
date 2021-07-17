import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import ClassesAddScreen from "./src/screens/ClassesAddScreen";

import { BottomTabIcons } from "./src/icons/BottomTabIcons";
import { Colors } from "./src/classes/Colors";
import { Provider as ClassesProvider } from "./src/context/ClassesContext";

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//edit the default theme to customize the background color and header color
const Theme = {
  dark: false,
  colors: {
    //change the color of the back button
    primary: Colors.primaryColor,
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
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  tabStyle: {
    marginTop: 15,
  },
  showLabel: false,
};

//style the header
const customHeaderStyle = {
  headerStyle: {
    height: 110,
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
        options={{ ...customHeaderStyle, title: "My Courses" }}
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

const TabNavigator = () => {
  return (
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
  );
};

export default function App() {
  return (
    <ClassesProvider>
      <NavigationContainer theme={Theme}>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen name="New Class" component={ClassesAddScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </ClassesProvider>
  );
}
