import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #007AFF;
    --secondary-color: #5856D6;
    --background-color: #ffffff;
    --text-color: #000000;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
  }

  [data-theme="dark"] {
    --primary-color: #0A84FF;
    --secondary-color: #5E5CE6;
    --background-color: #000000;
    --text-color: #ffffff;
    --gray-100: #1c1c1e;
    --gray-200: #2c2c2e;
    --gray-300: #3a3a3c;
    --gray-400: #48484a;
    --gray-500: #636366;
    --gray-600: #8e8e93;
    --gray-700: #aeaeb2;
    --gray-800: #c7c7cc;
    --gray-900: #d1d1d6;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1.5rem 0 1rem;
    font-weight: 600;
    line-height: 1.25;
  }

  p {
    margin-bottom: 1rem;
  }

  code {
    font-family: 'Fira Code', monospace;
  }

  pre {
    background-color: var(--gray-100);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
`;

export default GlobalStyle;
