import styled from "styled-components";

const ErrorContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #c53030;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  color: #2d3748;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background-color: #c53030;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #9b2c2c;
  }
`;

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = "오류가 발생했습니다",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && <RetryButton onClick={onRetry}>다시 시도</RetryButton>}
    </ErrorContainer>
  );
}
