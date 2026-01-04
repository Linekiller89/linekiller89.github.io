import { Post } from "../types/post";

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const sortPosts = (
  posts: Post[],
  order: "asc" | "desc" = "desc"
): Post[] => {
  return [...posts].sort((a, b) => {
    if (order === "desc") {
      return b.title.localeCompare(a.title);
    }
    return a.title.localeCompare(b.title);
  });
};

export const getExcerpt = (content: string, length: number = 150): string => {
  const text = content.replace(/<[^>]*>/g, "");
  return text.length > length ? `${text.substring(0, length)}...` : text;
};
