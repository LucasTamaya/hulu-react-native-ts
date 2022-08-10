import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Legal from "../screens/Legal";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { UserLogged } from "../screens/UserLogged/UserLogged";

// toutes les routes disponibles dans mon appli
export type RouteParams = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  UserLogged: undefined;
  Legal: undefined;
};

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Connexion",
            headerBackTitle: "Accueil",
            headerStyle: { backgroundColor: "#151516" },
            headerTintColor: "#FFF",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Créer mon compte",
            headerBackTitle: "Accueil",
            headerStyle: { backgroundColor: "#151516" },
            headerTintColor: "#FFF",
          }}
        />
        <Stack.Screen
          name="UserLogged"
          component={UserLogged}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Legal"
          component={Legal}
          options={{
            title: "Mentions légales",
            headerBackTitle: "Paramètres",
            headerStyle: { backgroundColor: "#151516" },
            headerTintColor: "#FFF",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
