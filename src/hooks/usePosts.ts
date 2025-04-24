import { useState, useEffect } from "react";
import { Post } from "../types";
import { sortPosts } from "../utils";

export const usePosts = (initialFilter: string = "all") => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // TODO: 실제 API 호출로 대체
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "첫 번째 포스트",
            slug: "first-post",
            date: "2024-04-24",
            excerpt: "첫 번째 포스트의 요약입니다.",
            content: "첫 번째 포스트의 내용입니다.",
            tags: ["react", "typescript"],
          },
          {
            id: "2",
            title: "두 번째 포스트",
            slug: "second-post",
            date: "2024-04-23",
            excerpt: "두 번째 포스트의 요약입니다.",
            content: "두 번째 포스트의 내용입니다.",
            tags: ["javascript", "web"],
          },
        ];
        setPosts(mockPosts);
      } catch (err) {
        setError("포스트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = sortPosts(posts, filter);

  return {
    posts: filteredPosts,
    loading,
    error,
    filter,
    setFilter,
  };
};
