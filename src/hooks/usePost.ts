import { useState, useEffect } from "react";
import { Post } from "../types/post";
import { getPost } from "../api/posts";

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(slug);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, isLoading };
};
