import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostNavProps } from "../../types";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
`;

const NavLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const PostNav: React.FC<PostNavProps> = ({ previousPost, nextPost }) => {
  return (
    <NavWrapper>
      <div>
        {previousPost && (
          <NavLink to={`/blog/${previousPost.slug}`}>
            ← {previousPost.title}
          </NavLink>
        )}
      </div>
      <div>
        {nextPost && (
          <NavLink to={`/blog/${nextPost.slug}`}>{nextPost.title} →</NavLink>
        )}
      </div>
    </NavWrapper>
  );
};

export default PostNav;
