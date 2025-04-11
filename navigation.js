import React from "react";
import { AuthProvider } from "./context/authContext";
import { PostProvider } from "./context/postContext";
import ScreenMenu from "./components/Menus/ScreenMenu";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
