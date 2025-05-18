import { useState } from "react";
import {
  PageWrapper,
  BlogList,
  BlogPostRow,
  PostDate,
  PostTitle,
  SearchInput,
} from "./styles";
import { usePosts } from "../../hooks/usePosts";
import { format } from "date-fns";

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export const Blog = () => {
  const { posts, isLoading } = usePosts();
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 검색어가 포함된 포스트만 필터링 (타이틀, 본문, 태그)
  const filteredPosts = posts.filter((post) => {
    const keyword = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword) ||
      (Array.isArray(post.tags) &&
        post.tags.some((tag) => tag.toLowerCase().includes(keyword)))
    );
  });

  return (
    <PageWrapper>
      <div style={{ marginBottom: "1.2rem" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.7rem", margin: 0 }}>Blog</h1>
        <p style={{ color: "#888", fontSize: "1rem", margin: "0.5rem 0 0 0" }}>
          개발 공부와 일상, 다양한 생각을 기록하는 블로그입니다.
        </p>
      </div>
      <SearchInput
        placeholder="포스트 제목, 태그, 내용을 검색해보세요!"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BlogList>
        {filteredPosts.length === 0 ? (
          <div style={{ color: "#888", marginTop: "2rem" }}>No posts found</div>
        ) : (
          filteredPosts.map((post) => (
            <BlogPostRow key={post.slug}>
              <PostDate>
                {post.date ? format(new Date(post.date), "yyyy-MM-dd") : "-"}
              </PostDate>
              <PostTitle
                to={`/blog/${post.slug}`}
                onMouseEnter={(e) => {
                  setTooltip({
                    visible: true,
                    content:
                      post.content.slice(0, 200) +
                      (post.content.length > 200 ? "..." : ""),
                    x: e.clientX,
                    y: e.clientY,
                  });
                }}
                onMouseMove={(e) => {
                  setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
                }}
                onMouseLeave={() =>
                  setTooltip({ visible: false, content: "", x: 0, y: 0 })
                }
              >
                {post.title}
              </PostTitle>
            </BlogPostRow>
          ))
        )}
      </BlogList>
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 16,
            top: tooltip.y + 16,
            background: "rgba(30,30,30,0.97)",
            color: "#fff",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            zIndex: 9999,
            maxWidth: 320,
            fontSize: "0.98rem",
            pointerEvents: "none",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </PageWrapper>
  );
};
