import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const BlogPostPreview = styled(Link)`
  display: block;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: var(--background-color);
  border: 1px solid var(--gray-200);
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: var(--gray-600);
  }
`;
