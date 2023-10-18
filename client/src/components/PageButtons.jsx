import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { useFinancialsContext } from "../contexts/FinancialsProvider";
import styled from "styled-components";

const PageButtons = () => {
  const { numberOfPages, setPage, setPrevPage, setNextPage, page } =
    useFinancialsContext();
  const pageBtnList = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <Wrapper>
      <div className="page__buttons">
        <button onClick={setPrevPage} className="btn--prev">
          <BiChevronsLeft /> prev
        </button>
        {pageBtnList.map((pageNumber) => {
          return (
            <button
              onClick={() => setPage(pageNumber)}
              className="page__btn"
              style={{
                backgroundColor:
                  page === pageNumber ? "#083B72" : "var(--primary-500)",
              }}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          );
        })}
        <button onClick={setNextPage} className="btn--next">
          next <BiChevronsRight />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  .page__buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--primary-100);
    border-radius: 5px;
    padding: 0.75rem 1rem;
  }
  .page__btn {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: var(--primary-500);
    box-shadow: var(--shadow-3);
    border: none;
    color: var(--white);
  }
  .btn--prev,
  .btn--next {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: capitalize;
    color: var(--primary-500);
  }
`;
export default PageButtons;
