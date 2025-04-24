import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const HeaderWrapper = styled.header`
  background-color: var(--background-color);
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 0;
  transition: background-color 0.3s, border-color 0.3s;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
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
            {theme === "light" ? "🌙" : "☀️"}
          </ThemeToggle>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
