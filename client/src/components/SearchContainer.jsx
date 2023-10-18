import React from "react";
import styled from "styled-components";
import FormRowAlt from "./FormRowAlt";
import FormRowSelect from "./FormRowSelect";
import { useFinancialsContext } from "../contexts/FinancialsProvider";

const SearchContainer = () => {
  const {
    isLoading,
    categoryOptions,
    typeOptions,
    filters,
    handleFiltersChange,
    clearFilters,
  } = useFinancialsContext();
  const { search, searchCategory, searchType, sort, sortOptions } = filters;
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h5 className="form__title">search</h5>
        <div className="form__rows">
          <FormRowAlt
            labelName="search"
            name="search"
            type="text"
            value={search}
            handleChange={handleFiltersChange}
          />
          <FormRowSelect
            labelName="sort"
            name="sort"
            value={sort}
            handleChange={handleFiltersChange}
            options={sortOptions}
          />
          <FormRowSelect
            labelName="category"
            name="searchCategory"
            value={searchCategory}
            handleChange={handleFiltersChange}
            options={["all", ...categoryOptions]}
          />
          <FormRowSelect
            labelName="type"
            name="searchType"
            value={searchType}
            handleChange={handleFiltersChange}
            options={["all", ...typeOptions]}
          />

          <button className="btn" disabled={isLoading}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--white);
  margin-bottom: 4rem;
  .form {
    box-shadow: var(--shadow-2);
    padding: 2rem;
    border-radius: 10px;
    margin-top: 5rem;
  }

  .form__title,
  .form__label {
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }

  .form__select {
    margin-top: 0.5rem;
    display: block;
    width: 100%;
    background: transparent;
    padding: 0.75rem 1rem;
    border: 1px solid var(--primary-500);
    border-radius: 5px;
    outline: none;
    letter-spacing: 2px;
    text-transform: capitalize;
  }
  .form__rows {
    margin-top: 2rem;
    display: grid;
    align-items: end;
    gap: 1rem;
  }

  @media (min-width: 800px) {
    .form {
      margin-top: 0;
    }
    .form__rows {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
export default SearchContainer;
