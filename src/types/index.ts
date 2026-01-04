// Post 관련 타입은 post.ts에서 import
export type { Post, PostMetadata, PostFile } from "./post";
import type { Post } from "./post";

export interface PostFilter {
  tag?: string;
  category?: string;
  search?: string;
}

export interface PostFilterProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export interface PostNavProps {
  previousPost?: Post;
  nextPost?: Post;
}
