import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 5vw;
  box-sizing: border-box;

  @media (max-width: 800px) {
    max-width: 100%;
    padding: 2rem 4vw;
  }

  @media (max-width: 500px) {
    padding: 1.2rem 2vw;
  }
`;

export const BlogList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const BlogPostRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const PostDate = styled.span`
  color: #b0b0b0;
  font-size: 1rem;
  min-width: 140px;
  font-family: "Menlo", "Monaco", "Consolas", monospace;
  margin-right: 2rem;
`;

export const PostTitle = styled(Link)`
  color: #181818;
  font-size: 1.08rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #00b87c;
    text-decoration: underline;
  }

  [data-theme="dark"] & {
    color: #fff;
    font-weight: 400;
    &:hover {
      color: #00e887;
    }
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 340px;
  padding: 0.7rem 1.2rem;
  margin: 0 0 2rem 0;
  border: none;
  border-radius: 999px;
  background: rgba(120, 120, 120, 0.12);
  color: #222;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);

  &::placeholder {
    color: #888;
    font-size: 1rem;
    opacity: 1;
  }

  [data-theme="dark"] & {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    &::placeholder {
      color: #aaa;
    }
  }
`;

export const HeaderDivider = styled.hr`
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 1.5rem 0 2rem 0;
  width: 100%;
  opacity: 0.8;

  [data-theme="dark"] & {
    border-top: 2px solid #444;
    opacity: 0.6;
  }
`;
