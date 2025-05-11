import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogList = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BlogPostRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const PostDate = styled.span`
  color: #b0b0b0;
  font-size: 1rem;
  min-width: 120px;
  font-family: "Menlo", "Monaco", "Consolas", monospace;
`;

export const PostTitle = styled(Link)`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #00e887;
    text-decoration: underline;
  }
`;
