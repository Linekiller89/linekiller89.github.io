import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { PostContent } from "./styles";

export const BlogPost = () => {
  const { slug } = useParams();
  const { post, isLoading } = usePost(slug || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PostContent>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </PostContent>
  );
};
