import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuProvider } from "react-native-popup-menu";

import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ClassesAddScreen from "./src/screens/ClassesAddScreen";
import NotesScreen from "./src/screens/NotesScreen";
import NotesEditScreen from "./src/screens/NotesEditScreen";
import CameraSceen from "./src/screens/CameraScreen";
import ClassesEditScreen from "./src/screens/ClassesEditScreen";
import AssignmentAddScreen from "./src/screens/AssignmentAddScreen";
import AssignmentEditScreen from "./src/screens/AssignmentEditScreen";

import ProfileHeader from "./src/components/ProfileHeader";

import { BottomTabIcons } from "./src/icons/BottomTabIcons";
import { Colors } from "./src/classes/Colors";
import { Provider as ClassesProvider } from "./src/context/ClassesContext";
import { Provider as NotesProvider } from "./src/context/NotesContext";
import { Provider as SelectedNotesProvider } from "./src/context/SelectedNotesContext";
import { Provider as CalendarProvider } from "./src/context/CalendarContext";
import { Provider as AssignmentsProvider } from "./src/context/AssignmentsContext";

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
    elevation: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 0,
    ...Colors.shadow,
  },
  tabStyle: {
    marginTop: 15,
  },
  showLabel: false,
};

//style the header
const invisibleHeaderStyle = {
  headerStyle: {
    height: 110,
    backgroundColor: Colors.headerBackgroundColor,
    shadowColor: "transparent",
  },
  headerTitleAlign: "left",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10,
  },
};

const formHeaderStyle = {
  headerStyle: {
    backgroundColor: "white",
    ...Colors.shadow,
  },
};

const profileHeaderStyle = {
  headerStyle: {
    backgroundColor: "white",
    ...Colors.shadow,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 160,
  },
  headerTitleAlign: "left",
  headerTitle: () => <ProfileHeader textColor={Colors.primaryColor} />,
};

const assignmentsHeaderStyle = {
  headerStyle: {
    backgroundColor: "white",
    ...Colors.shadow,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 210,
  },
  headerTitleAlign: "left",
  headerTitleContainerStyle: {
    left: 0,
    right: 0,
  },
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ ...invisibleHeaderStyle, title: "My Courses" }}
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
        options={{ ...assignmentsHeaderStyle, title: "Assignments" }}
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
        options={profileHeaderStyle}
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
            backgroundColor: "white",
            ...Colors.shadow,
          },
          title: route.params.name,
          headerTitleStyle: {
            color: route.params.primaryColor,
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
                    <RootStack.Screen
                      name="New Class"
                      component={ClassesAddScreen}
                      options={formHeaderStyle}
                    />
                    <RootStack.Screen
                      name="Edit Class"
                      component={ClassesEditScreen}
                      options={formHeaderStyle}
                    />
                    <RootStack.Screen
                      name="New Assignment"
                      component={AssignmentAddScreen}
                      options={formHeaderStyle}
                    />
                    <RootStack.Screen
                      name="Edit Assignment"
                      component={AssignmentEditScreen}
                      options={formHeaderStyle}
                    />
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
