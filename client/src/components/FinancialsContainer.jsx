import Financial from "./Financial";
import { useFinancialsContext } from "../contexts/FinancialsProvider";
import styled from "styled-components";
import Loading from "./Loading";
import PageButtons from "./PageButtons";

const FinancialsContainer = () => {
  const { isLoading, financials, financialsCount, numberOfPages } =
    useFinancialsContext();
  if (isLoading) {
    return <Loading />;
  }
  if (financials.length < 1) {
    return (
      <Wrapper>
        <h3 className="not-found">no entries found...</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5 className="financials__count">
        {financialsCount > 1
          ? `(${financialsCount}) entries found`
          : `(${financialsCount}) entry found`}
      </h5>
      <div className="financials">
        {financials.map((financial) => {
          return <Financial key={financial._id} {...financial} />;
        })}
      </div>
      {numberOfPages > 1 && <PageButtons />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0 5rem;

  .not-found {
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    text-align: center;
    color: var(--primary-500);
    margin-top: 5rem;
  }
  .financials__count {
    margin-bottom: 2rem;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  .financials {
    display: grid;
    align-items: start;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;
export default FinancialsContainer;
