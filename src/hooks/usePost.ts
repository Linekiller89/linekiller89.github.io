import { useState, useEffect } from "react";
import { Post } from "../types";

export const usePost = (slug: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`);
        const content = await response.text();
        setPost({
          slug,
          title: slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          content,
          excerpt: content.split("\n")[0],
        });
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
