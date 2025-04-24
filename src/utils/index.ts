import { Post } from "../types";

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const sortPosts = (posts: Post[], filter: string): Post[] => {
  switch (filter) {
    case "latest":
      return [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "popular":
      // 임시로 최신순으로 정렬
      return [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    default:
      return posts;
  }
};

export const getExcerpt = (content: string, length: number = 150): string => {
  const text = content.replace(/<[^>]*>/g, "");
  return text.length > length ? `${text.substring(0, length)}...` : text;
};
