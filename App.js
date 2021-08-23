import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MenuProvider } from "react-native-popup-menu";

import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import NotesScreen from "./src/screens/NotesScreen";
import NotesEditScreen from "./src/screens/NotesEditScreen";
import CameraSceen from "./src/screens/CameraScreen";
import AttachNotesScreen from "./src/screens/AttachNotesScreen";

import { BottomTabIcons } from "./src/icons/BottomTabIcons";
import { Colors } from "./src/classes/Colors";
import { Provider as ClassesProvider } from "./src/context/ClassesContext";
import { Provider as NotesProvider } from "./src/context/NotesContext";
import { Provider as SelectedNotesProvider } from "./src/context/SelectedNotesContext";
import { Provider as CalendarProvider } from "./src/context/CalendarContext";
import { Provider as AssignmentsProvider } from "./src/context/AssignmentsContext";
import HeaderStyle from "./src/classes/HeaderStyle";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const SettingsStack = createStackNavigator();
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
    borderTopWidth: 0,
  },
  tabStyle: {
    marginTop: 15,
  },
  showLabel: false,
};

const bigHeaderStyle = (headerHeight) => {
  return {
    headerStyle: {
      backgroundColor: Colors.headerBackgroundColor,
      shadowColor: "transparent",
      height: headerHeight,
    },
    headerTitleAlign: "left",
    headerTitleContainerStyle: {
      left: 0,
      right: 0,
    },
  };
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={bigHeaderStyle(HeaderStyle.classesHeaderHeight)}
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
        options={bigHeaderStyle(HeaderStyle.assignmentsHeaderHeight)}
      />
    </CalendarStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Library"
        component={SettingsScreen}
        options={bigHeaderStyle(HeaderStyle.profileHeaderHeight)}
      />
    </SettingsStack.Navigator>
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
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) =>
            BottomTabIcons.findIcon("Settings", size, color),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Notes"
        component={NotesScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: route.params.primaryColor,
            shadowColor: "transparent",
          },
          title: route.params.name,
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          },
        })}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  return (
    <SelectedNotesProvider>
      <NotesProvider>
        <ClassesProvider>
          <AssignmentsProvider>
            <CalendarProvider>
              <MenuProvider>
                <NavigationContainer theme={Theme}>
                  <RootStack.Navigator mode="modal">
                    <RootStack.Screen
                      name="Main"
                      component={MainStackScreen}
                      options={{ headerShown: false }}
                    />
                    <RootStack.Screen name="Attach Notes" component={AttachNotesScreen} />
                    <RootStack.Screen
                      name="Camera"
                      component={CameraSceen}
                      options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                      name="Edit Note"
                      component={NotesEditScreen}
                      options={{ headerShown: false }}
                    />
                  </RootStack.Navigator>
                </NavigationContainer>
              </MenuProvider>
            </CalendarProvider>
          </AssignmentsProvider>
        </ClassesProvider>
      </NotesProvider>
    </SelectedNotesProvider>
  );
}
