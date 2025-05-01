import matter from "gray-matter";
import { Buffer } from "buffer";
import { Post, PostMetadata } from "../../types/post";

export function parseMarkdown(content: string, slug: string): Post {
  const { data, content: markdownContent } = matter(content);

  const metadata: PostMetadata = {
    title: data.title || "Untitled",
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    draft: data.draft || false,
  };

  return {
    ...metadata,
    slug,
    content: markdownContent,
  };
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
