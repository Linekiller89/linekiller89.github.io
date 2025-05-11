import { usePosts } from "../../hooks/usePosts";
import { BlogList, BlogPostRow, PostDate, PostTitle } from "./styles";
import { format } from "date-fns";

export const Blog = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BlogList>
      {posts.map((post) => (
        <BlogPostRow key={post.slug}>
          <PostDate>{format(new Date(post.date), "MMM dd, yyyy")}</PostDate>
          <PostTitle to={`/blog/${post.slug}`}>{post.title}</PostTitle>
        </BlogPostRow>
      ))}
    </BlogList>
  );
};
