import { usePosts } from "../../hooks/usePosts";
import { BlogList, BlogPostPreview } from "./styles";

export const Blog = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BlogList>
      {posts.map((post) => (
        <BlogPostPreview key={post.slug} to={`/blog/${post.slug}`}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </BlogPostPreview>
      ))}
    </BlogList>
  );
};
