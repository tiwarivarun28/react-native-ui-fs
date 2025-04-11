import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

// Capitalized component name
const PostCard = React.memo(({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  // Memoized delete prompt
  const handleDeletePrompt = useCallback((id) => {
    Alert.alert("Attention", "Are you sure want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel pressed");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  }, []);

  // Memoized delete handler
  const handleDeletePost = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const { data } = await axios.delete(`/post/delete-post/${id}`);
        alert(data?.message);
        navigation.push("MyPost");
      } catch (error) {
        console.log(error);
        alert("Failed to delete post");
      } finally {
        setLoading(false);
      }
    },
    [navigation]
  );

  // Memoized post list rendering
  const renderedPosts = useMemo(
    () =>
      posts?.map((postItem, i) => (
        <View style={styles.card} key={postItem?._id || i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  color={"blue"}
                  size={16}
                  onPress={() => {
                    setPost(postItem);
                    setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  color={"red"}
                  size={16}
                  onPress={() => handleDeletePrompt(postItem?._id)}
                />
              </Text>
            </View>
          )}
          <Text style={styles.title}>Title: {postItem?.title}</Text>
          <Text style={styles.desc}>{postItem?.description}</Text>
          <View style={styles.footer}>
            {postItem?.postedBy?.name && (
              <Text>
                <FontAwesome5 name="user" color={"orange"} />{" "}
                {postItem?.postedBy?.name}
              </Text>
            )}
            <Text>
              <FontAwesome5 name="clock" color={"blue"} />{" "}
              {moment(postItem?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      )),
    [posts, myPostScreen, handleDeletePrompt]
  );

  return (
    <View>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {renderedPosts}
    </View>
  );
});

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "white",
    borderWidth: 0.2,
    borderColor: "grey",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    borderBottomWidth: 0.3,
    paddingBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
