import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: var(--background-color);
  border-bottom: 1px solid var(--gray-200);
  height: 48px;
  min-height: 48px;
  transition: background-color 0.3s, border-color 0.3s;
`;

const HeaderContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 5vw;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    max-width: 100%;
    padding: 0 4vw;
  }

  @media (max-width: 500px) {
    padding: 0 2vw;
  }
`;

const Logo = styled(Link)`
  font-size: 1.18rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;
  line-height: 1;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  height: 100%;
`;

const NavLink = styled(Link)`
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--gray-100);
  }
`;

const ThemeIcon = ({ mode }: { mode: "light" | "dark" }) =>
  mode === "light" ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="#fff"
        stroke="#222"
        strokeWidth="1.5"
      />
      <path
        d="M14 10a4 4 0 0 1-4-4c0-1.1.45-2.1 1.17-2.83A6 6 0 1 0 16 16.83 4 4 0 0 1 14 10z"
        fill="#222"
      />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="6"
        fill="#fff"
        stroke="#222"
        strokeWidth="1.5"
      />
      <g stroke="#fff" strokeWidth="1.2">
        <line x1="10" y1="2" x2="10" y2="5" />
        <line x1="10" y1="15" x2="10" y2="18" />
        <line x1="2" y1="10" x2="5" y2="10" />
        <line x1="15" y1="10" x2="18" y2="10" />
        <line x1="4.2" y1="4.2" x2="6.2" y2="6.2" />
        <line x1="13.8" y1="13.8" x2="15.8" y2="15.8" />
        <line x1="4.2" y1="15.8" x2="6.2" y2="13.8" />
        <line x1="13.8" y1="6.2" x2="15.8" y2="4.2" />
      </g>
    </svg>
  );

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo to="/">Moon Blog</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            <ThemeIcon mode={theme} />
          </ThemeToggle>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
