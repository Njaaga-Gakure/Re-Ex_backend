import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="error__body">
        <h2 className="error__title">error: 404</h2>
        <p className="error__desc">
          we can't seem to find the page you're looking for... :(
        </p>
        <Link className="btn error__link" to="/">
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  .error__body {
    display: grid;
    gap: 1rem;
  }
  .error__title {
    letter-spacing: var(--letter-spacing);
    color: var(--primary-500);
    text-transform: capitalize;
  }
  .error__desc {
    letter-spacing: var(--letter-spacing);
    color: var(--primary-400);
    text-transform: capitalize;
  }
  .error__link {
    display: inline-block;
    justify-self: center;
    padding: 0.5rem 1.5rem;
  }
`;
export default ErrorPage;
