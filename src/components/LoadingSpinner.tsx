import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${(props) => props.theme.borderColor};
  border-top: 4px solid ${(props) => props.theme.primaryColor};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
`;

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({
  text = "로딩 중...",
}: LoadingSpinnerProps) {
  return (
    <SpinnerContainer>
      <div>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </div>
    </SpinnerContainer>
  );
}
