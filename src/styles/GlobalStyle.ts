import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #0070f3;
    --background-color: #ffffff;
    --text-color: #000000;
    --gray-100: #f5f5f5;
    --gray-200: #e5e5e5;
    --gray-600: #666666;
  }

  [data-theme="dark"] {
    --primary-color: #3291ff;
    --background-color: #000000;
    --text-color: #ffffff;
    --gray-100: #1a1a1a;
    --gray-200: #333333;
    --gray-600: #999999;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.5;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  code {
    font-family: "Fira Code", monospace;
  }
`;

export default GlobalStyle;
