import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--secondary-color);
    text-decoration: none;
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Title>Welcome to Moon Blog</Title>
      <Subtitle>
        A place to share thoughts, ideas, and experiences about software
        development
      </Subtitle>
      <CTAButton to="/blog">Read Blog Posts</CTAButton>
    </HomeWrapper>
  );
};

export default Home;
