import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import PostCard from "../components/postCard";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import isEqual from "lodash.isequal"; // install with: npm i lodash.isequal

let cachedPosts = null;

const MyPost = () => {
  const [posts, setPosts] = useState(cachedPosts || []);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (cachedPosts && isActive) {
        setPosts(cachedPosts);
      }

      // run in background
      (async () => {
        try {
          const { data } = await axios.get("/post/get-user-post");
          const fetchedPosts = data?.userPosts || [];

          if (!isEqual(fetchedPosts, cachedPosts) && isActive) {
            cachedPosts = fetchedPosts;
            setPosts(fetchedPosts);
          }
        } catch (err) {
          console.error("getUserPosts error:", err);
        }
      })();

      return () => {
        isActive = false;
      };
    }, []) // 👈 NO dependencies
  );

  const renderedPostCard = useMemo(() => {
    return <PostCard posts={posts} myPostScreen />;
  }, [posts]);

  return (
    <View style={styles.container}>
      <ScrollView>{renderedPostCard}</ScrollView>
      <FooterMenu />
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

export default React.memo(MyPost);
