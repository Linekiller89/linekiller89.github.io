import { useState, useEffect } from "react";
import { Post } from "../types";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 임시 데이터
        setPosts([
          {
            slug: "first-post",
            title: "첫 번째 포스트",
            content: "# 첫 번째 포스트\n\n이것은 첫 번째 포스트입니다.",
            excerpt: "이것은 첫 번째 포스트입니다.",
          },
          {
            slug: "second-post",
            title: "두 번째 포스트",
            content: "# 두 번째 포스트\n\n이것은 두 번째 포스트입니다.",
            excerpt: "이것은 두 번째 포스트입니다.",
          },
        ]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading };
};
