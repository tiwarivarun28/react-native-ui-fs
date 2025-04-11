import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  //getall post
  const getAllPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPost(data?.post);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <PostContext.Provider value={[post, setPost, getAllPost]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
