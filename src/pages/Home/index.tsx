import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  margin: 4rem 0 6rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  p {
    font-size: 3rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProjectCard = styled.article`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
  }

  time {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BlogLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Hero>
        <h1>Your Name</h1>
        <p>I design & build interfaces</p>
      </Hero>

      <Section>
        <h2>Selected projects</h2>
        <ProjectGrid>
          <ProjectCard>
            <time>2023 - 2024</time>
            <h3>Project Name</h3>
            <p>
              Project description goes here. Explain what you did and what
              technologies you used.
            </p>
          </ProjectCard>
          <ProjectCard>
            <time>2022 - 2023</time>
            <h3>Another Project</h3>
            <p>Another project description. Keep it concise but informative.</p>
          </ProjectCard>
        </ProjectGrid>
      </Section>

      <Section>
        <h2>Selected posts</h2>
        <BlogList>
          <BlogLink to="/blog/1">
            <h3>Blog Post Title</h3>
            <time>Mar 20, 2024</time>
          </BlogLink>
          <BlogLink to="/blog/2">
            <h3>Another Blog Post</h3>
            <time>Mar 15, 2024</time>
          </BlogLink>
        </BlogList>
      </Section>
    </HomeContainer>
  );
}

export default Home;
