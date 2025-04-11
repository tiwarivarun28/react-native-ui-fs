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
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const context = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  // Get posts and function from context safely
  const posts = context?.[0] || [];
  const getAllPost = context?.[2];

  // Refresh handler for pull-to-refresh
  const handleRefresh = useCallback(async () => {
    if (getAllPost) {
      setRefreshing(true);
      await getAllPost();
      setRefreshing(false);
    }
  }, [getAllPost]);

  // Fetch posts on screen focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        if (getAllPost && isActive) {
          await getAllPost();
          console.log("HOME: Posts fetched");
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [getAllPost])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {posts?.length > 0 ? (
          <MemoizedPostCard posts={posts} />
        ) : (
          <Text style={styles.noPosts}>No posts to show</Text>
        )}
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const MemoizedPostCard = React.memo(PostCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
  noPosts: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
