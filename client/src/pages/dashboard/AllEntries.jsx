import styled from "styled-components";
import { FinancialsContainer, SearchContainer } from "../../components";
import { useFinancialsContext } from "../../contexts/FinancialsProvider";
import { useEffect } from "react";

const AllEntries = () => {
  const { getAllFinancials, filters, page } = useFinancialsContext();
  useEffect(() => {
    getAllFinancials();
  }, [filters, page]);
  return (
    <Wrapper>
      <div className="content--center">
        <SearchContainer />
        <FinancialsContainer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  @media (min-width: 800px) {
    .content--center {
      margin-top: 5rem;
    }
  }
`;
export default AllEntries;
