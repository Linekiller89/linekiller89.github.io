export interface Post {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
}

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
