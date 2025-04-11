import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  // ✅ Memoize getAllPost to prevent infinite re-renders
  const getAllPost = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setPost(data?.post || []);
    } catch (error) {
      console.error("getAllPost error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch posts once on mount
  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return (
    <PostContext.Provider value={[post, setPost, getAllPost]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
