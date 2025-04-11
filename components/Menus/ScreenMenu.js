import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/screens/Home";
import Register from "@/screens/auth/Register";
import Login from "@/screens/auth/Login";
import HeaderMenu from "../Menus/HeaderMenu";
import { AuthContext } from "@/context/authContext";
import Post from "../../screens/Post";
import MyPost from "../../screens/MyPost";
import Account from "../../screens/Account";
const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition
  const authenticatedUser = state?.user && state?.token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="MyPost"
            component={MyPost}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
