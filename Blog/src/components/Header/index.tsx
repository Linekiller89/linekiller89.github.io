import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 1rem;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blog">Blog</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
