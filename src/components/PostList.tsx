import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../types/post";
import { getPosts } from "../api/posts";
import { formatDate } from "../utils/github/markdown";

const PostListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostItem = styled.article`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const PostMeta = styled.div`
  margin: 0.5rem 0;
  color: ${(props) => props.theme.secondaryText};
  font-size: 0.9rem;
`;

const PostDescription = styled.p`
  color: ${(props) => props.theme.textColor};
  line-height: 1.6;
`;

const TagList = styled.div`
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.tagBackground};
  color: ${(props) => props.theme.tagText};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError("포스트를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PostListContainer>
      {posts.map((post) => (
        <PostItem key={post.slug}>
          <PostTitle to={`/posts/${post.slug}`}>{post.title}</PostTitle>
          <PostMeta>{formatDate(post.date)}</PostMeta>
          <PostDescription>{post.description}</PostDescription>
          <TagList>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        </PostItem>
      ))}
    </PostListContainer>
  );
}
