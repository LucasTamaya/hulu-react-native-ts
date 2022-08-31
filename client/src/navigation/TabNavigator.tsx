import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";

import Dashboard from "../screens/Dashboard";
import SavedMovies from "../screens/SavedMovies";
import Search from "../screens/Search";
import Settings from "../screens/Settings";

// toutes les routes disponibles dans mon appli
export type RouteParams = {
  Dashboard: undefined;
  SavedMovies: undefined;
  Search: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RouteParams>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Dashboard") {
            return (
              <Entypo
                name="home"
                size={25}
                color={focused ? "#01ED83" : "#fff"}
              />
            );
          }
          if (route.name === "SavedMovies") {
            return (
              <FontAwesome
                name="heart"
                size={25}
                color={focused ? "#01ED83" : "#fff"}
              />
            );
          }
          if (route.name === "Search") {
            return (
              <FontAwesome
                name="search"
                size={25}
                color={focused ? "#01ED83" : "#fff"}
              />
            );
          }
          if (route.name === "Settings") {
            return (
              <Feather
                name="settings"
                size={25}
                color={focused ? "#01ED83" : "#fff"}
              />
            );
          }
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#2e2e30",
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ unmountOnBlur: true }}
      />

      <Tab.Screen
        name="SavedMovies"
        component={SavedMovies}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
