import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import PostFilter from "../../components/PostFilter";
import { formatDate } from "../../utils";

const BlogWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PostItem = styled.li`
  position: relative;
  margin-bottom: 2rem;
`;

const PostLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }
`;

const PreviewBox = styled.div<{ visible: boolean; x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  background: var(--background-color);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 1000;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const PreviewExcerpt = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-600);
`;

const Blog = () => {
  const { posts, loading, error, filter, setFilter } = usePosts();
  const [preview, setPreview] = useState<{
    visible: boolean;
    x: number;
    y: number;
    title: string;
    excerpt: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    excerpt: "",
  });

  const handleMouseMove = (
    e: React.MouseEvent,
    post: { title: string; excerpt: string }
  ) => {
    setPreview({
      visible: true,
      x: e.clientX + 20,
      y: e.clientY + 20,
      title: post.title,
      excerpt: post.excerpt,
    });
  };

  const handleMouseLeave = () => {
    setPreview((prev) => ({ ...prev, visible: false }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BlogWrapper>
      <PostFilter onFilterChange={setFilter} currentFilter={filter} />
      <PostList>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            onMouseMove={(e) => handleMouseMove(e, post)}
            onMouseLeave={handleMouseLeave}
          >
            <PostLink to={`/blog/${post.slug}`}>{post.title}</PostLink>
          </PostItem>
        ))}
      </PostList>
      <PreviewBox visible={preview.visible} x={preview.x} y={preview.y}>
        <PreviewTitle>{preview.title}</PreviewTitle>
        <PreviewExcerpt>{preview.excerpt}</PreviewExcerpt>
      </PreviewBox>
    </BlogWrapper>
  );
};

export default Blog;
