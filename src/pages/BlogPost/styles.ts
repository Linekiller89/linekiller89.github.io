import styled from "styled-components";

export const PostContent = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }

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
    line-height: 1.8;
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
