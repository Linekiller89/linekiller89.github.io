import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostContent = styled.article`
  line-height: 1.8;

  h2 {
    font-size: 2rem;
    margin: 3rem 0 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  pre {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: 2rem 0;
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  ul, ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  img {
    max-width: 100%;
    border-radius: var(--radius-md);
    margin: 2rem 0;
  }

  blockquote {
    border-left: 4px solid var(--color-accent);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }
`;

// 임시 데이터
const posts = {
  "1": {
    title: "React와 TypeScript로 블로그 만들기",
    content: `
# React와 TypeScript로 블로그 만들기

React와 TypeScript를 사용하여 모던한 블로그를 만드는 방법을 알아봅니다.

## 프로젝트 설정

먼저 Vite를 사용하여 프로젝트를 생성합니다:

\`\`\`bash
npm create vite@latest my-blog -- --template react-ts
\`\`\`

## 컴포넌트 설계

블로그의 주요 컴포넌트들을 설계해보겠습니다:

\`\`\`typescript
interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </article>
  );
};
\`\`\`

## 상태 관리

React Context를 사용하여 전역 상태를 관리합니다:

\`\`\`typescript
interface BlogContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}

const BlogContext = createContext<BlogContextType | null>(null);
\`\`\`

## 마크다운 지원

마크다운을 HTML로 변환하기 위해 react-markdown을 사용합니다:

\`\`\`typescript
import ReactMarkdown from 'react-markdown';

const PostContent: React.FC<{ content: string }> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};
\`\`\`

이렇게 하면 기본적인 블로그 기능이 구현됩니다. 추가로 필요한 기능이 있다면 말씀해 주세요!
`
  },
  "2": {
    title: "마크다운 에디터 구현하기",
    content: `
# 마크다운 에디터 구현하기

마크다운 에디터를 구현하는 방법을 알아봅니다.

## 에디터 컴포넌트

\`\`\`typescript
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className="editor">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="마크다운으로 작성하세요..."
      />
      <div className="preview">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
};
\`\`\`

## 코드 하이라이팅

\`\`\`typescript
import rehypeHighlight from 'rehype-highlight';

<ReactMarkdown
  rehypePlugins={[rehypeHighlight]}
>
  {content}
</ReactMarkdown>
\`\`\`

## 이미지 업로드

\`\`\`typescript
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const { url } = await response.json();
  return url;
};
\`\`\`
`
  },
  "3": {
    title: "다크모드 구현하기",
    content: `
# 다크모드 구현하기

CSS 변수와 React Context를 사용하여 다크모드를 구현합니다.

## 테마 설정

\`\`\`typescript
const theme = {
  light: {
    '--bg-primary': '#ffffff',
    '--text-primary': '#000000',
    '--accent-color': '#0070f3',
  },
  dark: {
    '--bg-primary': '#1a1a1a',
    '--text-primary': '#ffffff',
    '--accent-color': '#3291ff',
  },
};
\`\`\`

## Context 설정

\`\`\`typescript
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

## 시스템 테마 감지

\`\`\`typescript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  setIsDark(mediaQuery.matches);

  const handler = (e: MediaQueryListEvent) => {
    setIsDark(e.matches);
  };

  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}, []);
\`\`\`
`
  }
};

function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = id ? posts[id] : null;

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <PostContainer>
      <PostContent>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </PostContent>
    </PostContainer>
  );
}

export default BlogPost;
