import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Post } from "../types/post";
import { getPost } from "../api/posts";
import { formatDate } from "../utils/github/markdown";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  color: ${(props) => props.theme.secondaryText};
  font-size: 0.9rem;
`;

const PostContent = styled.div`
  color: ${(props) => props.theme.textColor};
  line-height: 1.8;
  font-size: 1.1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem 0 1rem;
    color: ${(props) => props.theme.headingColor};
  }

  p {
    margin: 1rem 0;
  }

  code {
    background: ${(props) => props.theme.codeBackground};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    background: ${(props) => props.theme.codeBackground};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }
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

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = async () => {
    if (!slug) return;

    try {
      const fetchedPost = await getPost(slug);
      if (fetchedPost) {
        setPost(fetchedPost);
        setError(null);
      } else {
        setError("포스트를 찾을 수 없습니다.");
      }
    } catch (err) {
      setError("포스트를 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={loadPost} />;
  if (!post)
    return <ErrorMessage title="404" message="포스트를 찾을 수 없습니다." />;

  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>{formatDate(post.date)}</PostMeta>
        <TagList>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      </PostHeader>
      <PostContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </PostContent>
    </PostContainer>
  );
}
