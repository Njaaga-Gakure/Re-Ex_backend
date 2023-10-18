import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <div className="spinner"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .spinner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--primary-300);
    border-top: 2px solid var(--primary-500);
    animation: spin 0.3s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Spinner;
