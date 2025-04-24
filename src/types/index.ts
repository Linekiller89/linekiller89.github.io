export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
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
