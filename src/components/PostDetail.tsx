import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  color: #f8f8f2;
  line-height: 1.8;
  font-size: 1.1rem;

  /* Front Matter */
  .front-matter {
    padding: 1rem 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid #333;

    .key {
      color: #ffb86c;
    }

    .value {
      color: #50fa7b;
    }
  }

  /* Headings */
  h1 {
    color: #50fa7b;
    margin: 2rem 0 1rem;
    font-size: 2rem;
  }

  h2 {
    color: #8be9fd;
    margin: 2rem 0 1rem;
    font-size: 1.75rem;
  }

  h3 {
    color: #8be9fd;
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
  }

  /* Text */
  p {
    margin: 1rem 0;
    color: #f8f8f2;
  }

  /* Lists */
  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
    color: #f8f8f2;
  }

  li {
    margin: 0.5rem 0;
  }

  /* Code */
  code {
    background: #282a36;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: #50fa7b;
    font-family: "Fira Code", monospace;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    background: #282a36;
    border-radius: 4px;
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
      color: #f8f8f2;
    }
  }

  /* Other elements */
  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-left: 4px solid #50fa7b;
    background: #282a36;
    color: #f8f8f2;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    background: #282a36;
  }

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #44475a;
    color: #f8f8f2;
  }

  th {
    background: #282a36;
    color: #ffb86c;
  }

  hr {
    border: none;
    border-top: 1px solid #44475a;
    margin: 2rem 0;
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

export const MarkdownContent = ({ content }: { content: string }) => {
  // Front Matter 처리
  const processedContent = content.replace(
    /^---\n([\s\S]*?)\n---\n/,
    (_, frontMatter) => {
      const processed = frontMatter
        .split("\n")
        .map((line: string) => {
          const [key, ...values] = line.split(":");
          if (key && values.length) {
            return `<div class="front-matter"><span class="key">${key}:</span><span class="value">${values
              .join(":")
              .trim()}</span></div>`;
          }
          return line;
        })
        .join("\n");
      return processed + "\n";
    }
  );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;
          return isInline ? (
            <code className={className}>{children}</code>
          ) : (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
        input({ type, checked }) {
          if (type === "checkbox") {
            return <input type="checkbox" checked={checked} readOnly />;
          }
          return null;
        },
        li({ children, ...props }: any) {
          const checked = (props as any).checked;
          if (checked !== undefined) {
            return (
              <li>
                <input type="checkbox" checked={checked} readOnly />
                <span>{children}</span>
              </li>
            );
          }
          return <li>{children}</li>;
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    loadPost();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => {}} />;
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
        <MarkdownContent content={post.content} />
      </PostContent>
    </PostContainer>
  );
}
