export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

export interface PostFile {
  path: string;
  sha: string;
  content: string;
}
