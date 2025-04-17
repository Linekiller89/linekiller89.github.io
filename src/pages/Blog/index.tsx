import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.div`
  margin-bottom: 4rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  position: relative;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
`;

const PreviewBox = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${props => props.x + 20}px;
  top: ${props => props.y}px;
  width: 300px;
  padding: 1rem;
  background: var(--color-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  pointer-events: none;
`;

// 임시 데이터
const posts = [
  {
    id: "1",
    title: "React와 TypeScript로 블로그 만들기",
    excerpt: "React와 TypeScript를 사용하여 모던한 블로그를 만드는 방법을 알아봅니다. 컴포넌트 설계부터 상태 관리까지 상세히 다룹니다.",
  },
  {
    id: "2",
    title: "마크다운 에디터 구현하기",
    excerpt: "마크다운 에디터를 구현하는 방법을 알아봅니다. 실시간 미리보기, 코드 하이라이팅, 이미지 업로드 등의 기능을 구현합니다.",
  },
  {
    id: "3",
    title: "다크모드 구현하기",
    excerpt: "CSS 변수와 React Context를 사용하여 다크모드를 구현하는 방법을 알아봅니다. 시스템 테마 감지와 테마 전환 애니메이션도 포함합니다.",
  },
];

function Blog() {
  const [preview, setPreview] = useState<{ show: boolean; content: string; x: number; y: number }>({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (preview.show) {
      setPreview(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const handleMouseEnter = (content: string, e: React.MouseEvent) => {
    setPreview({
      show: true,
      content,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setPreview(prev => ({ ...prev, show: false }));
  };

  return (
    <BlogContainer onMouseMove={handleMouseMove}>
      <BlogHeader>
        <h1>Blog</h1>
      </BlogHeader>

      <PostList>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            onMouseEnter={(e) => handleMouseEnter(post.excerpt, e)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {post.title}
            </Link>
          </PostItem>
        ))}
      </PostList>

      {preview.show && (
        <PreviewBox x={preview.x} y={preview.y}>
          {preview.content}
        </PreviewBox>
      )}
    </BlogContainer>
  );
}

export default Blog;
