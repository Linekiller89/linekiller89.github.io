import { fetchPostsList, fetchPostContent } from "./github";
import { parseMarkdown } from "../utils/github/markdown";
import { Post } from "../types/post";

export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fetchPostsList();
    const posts = await Promise.all(
      files
        .filter((file) => file.name.endsWith(".md"))
        .map(async (file) => {
          const content = await fetchPostContent(file.path);
          const slug = file.name.replace(".md", "");
          return parseMarkdown(content, slug);
        })
    );

    return posts
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const files = await fetchPostsList();
    const file = files.find((f) => f.name === `${slug}.md`);

    if (!file) {
      return null;
    }

    const content = await fetchPostContent(file.path);
    return parseMarkdown(content, slug);
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error);
    return null;
  }
}
