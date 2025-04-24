import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { usePosts } from "../../hooks/usePosts";
import PostNav from "../../components/PostNav";

const PostWrapper = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const PostContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color);

  & > * {
    margin-bottom: 1.5rem;
  }

  & h2 {
    font-size: 1.75rem;
    margin-top: 3rem;
  }

  & h3 {
    font-size: 1.5rem;
    margin-top: 2.5rem;
  }

  & p {
    margin-bottom: 1.5rem;
  }

  & code {
    background-color: var(--gray-100);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: "Fira Code", monospace;
  }

  & pre {
    background-color: var(--gray-100);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  & blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1rem;
    margin-left: 0;
    color: var(--gray-600);
  }

  & a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = usePosts();

  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;

  return (
    <PostWrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </PostContent>
      <PostNav previousPost={previousPost} nextPost={nextPost} />
    </PostWrapper>
  );
};

export default BlogPost;
