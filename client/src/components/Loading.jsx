import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .dot {
    width: 10px;
    height: 10px;
    background-color: var(--primary-500);
    border-radius: 50%;
    margin: 0 4px;
    opacity: 0;
    animation: loading 1.2s linear infinite;
  }
  .dot1 {
    animation-delay: 0s;
  }

  .dot2 {
    animation-delay: 0.5s;
  }

  .dot3 {
    animation-delay: 1s;
  }

  @keyframes loading {
    0% {
      opacity: 0.1;
      transform: scale(1);
    }
    20% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 0.1;
      transform: scale(1);
    }
  }
`;
export default Loading;
