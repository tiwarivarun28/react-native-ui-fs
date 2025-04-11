import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { PostContext } from "@/context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/postCard";

const Home = () => {
  const [posts, getAllPost] = useContext(PostContext);
  const [refresh, setRefresh] = useState(false);

  //refreshcontrol
  const onRefresh = useCallback(() => {
    setRefresh(true);
    getAllPost;
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});

export default Home;
