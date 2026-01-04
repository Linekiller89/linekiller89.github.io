const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "Linekiller89";
const REPO_NAME = "linekiller89.github.io";
const POSTS_PATH = "src/content/posts";

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

export async function fetchPostsList(): Promise<GitHubContent[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${POSTS_PATH}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts list");
  }

  return response.json();
}

export async function fetchPostContent(path: string): Promise<string> {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch post content: ${path}`);
  }

  const data: GitHubContent = await response.json();

  if (data.content && data.encoding === "base64") {
    return window.Buffer.from(data.content.replace(/\n/g, ""), "base64").toString(
      "utf-8"
    );
  }

  throw new Error("Invalid content format");
}
