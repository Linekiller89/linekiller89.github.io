import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  color: inherit;
  text-decoration: underline;
  font-weight: 500;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Page not found</Message>
      <HomeLink to="/">Return to Home</HomeLink>
    </NotFoundContainer>
  );
}

export default NotFound;
