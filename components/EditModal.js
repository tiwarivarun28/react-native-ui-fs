import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// 👇 Move this outside the component to avoid re-creation
let cachedPosts = null;

const EditModal = React.memo(({ modalVisible, setModalVisible, post }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Set post values when modal opens
  useEffect(() => {
    if (modalVisible && post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
    }
  }, [modalVisible, post]);

  const updatePostHandler = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const { data } = await axios.put(`/post/update-post/${id}`, {
          title,
          description,
        });
        alert(data?.message);
        cachedPosts = null; // ❌ invalidate cache

        // ✅ Navigate and close modal safely after delay
        navigation.push("MyPost");
        setTimeout(() => {
          setModalVisible(false);
          setLoading(false);
        }, 300);
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert("Failed to update post");
      }
    },
    [title, description, navigation, setModalVisible]
  );

  const handleCancel = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleCloseRequest = useCallback(() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseRequest}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Your Post</Text>

              <Text>Title</Text>
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={setTitle}
              />

              <Text>Description</Text>
              <TextInput
                style={styles.inputBox}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.btnContainer}>
                <Pressable
                  style={styles.button}
                  onPress={() => updatePostHandler(post?._id)}
                  disabled={loading}
                >
                  <Text style={styles.textStyle}>
                    {loading ? "Please wait..." : "Update"}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleCancel}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 100,
    margin: 10,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditModal;
