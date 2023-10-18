import styled from "styled-components";
import { useFinancialsContext } from "../../contexts/FinancialsProvider";
import { FormRowAlt, FormRowSelect, Spinner } from "../../components";
import { toast } from "react-toastify";

const AddEntry = () => {
  const {
    isLoading,
    categoryOptions,
    typeOptions,
    name,
    amount,
    description,
    category,
    type,
    isEditing,
    addFinancial,
    handleEntryChange,
    clearEntryValues,
    editFinancial,
    editFinancialId,
  } = useFinancialsContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !amount) {
      toast.error("Please fill in all the fields");
      return;
    }
    if (isEditing) {
      editFinancial({
        financialId: editFinancialId,
        financial: { name, description, category, type, amount },
      });
      return;
    }
    addFinancial({ name, description, category, type, amount });
    clearEntryValues();
  };
  return (
    <Wrapper>
      <div className="content--center">
        <form onSubmit={handleSubmit} className="form">
          <h5 className="form__title">
            {isEditing ? "edit entry" : "add entry"}
          </h5>
          <div className="form__rows">
            <FormRowAlt
              labelName="name"
              name="name"
              type="text"
              value={name}
              handleChange={handleEntryChange}
            />
            <FormRowSelect
              labelName="category"
              name="category"
              value={category}
              handleChange={handleEntryChange}
              options={categoryOptions}
            />
            <FormRowSelect
              labelName="type"
              name="type"
              value={type}
              handleChange={handleEntryChange}
              options={typeOptions}
            />
            <FormRowAlt
              labelName="amount"
              name="amount"
              type="text"
              value={amount}
              handleChange={handleEntryChange}
            />
            <div className="form__row">
              <label className="form__label" htmlFor="description">
                description
              </label>
              <textarea
                className="form__textarea"
                id="description"
                name="description"
                value={description}
                onChange={handleEntryChange}
              />
            </div>
            <div className="btn__container">
              <button onClick={clearEntryValues} type="button" className="btn">
                clear values
              </button>
              <button className="btn btn--success" disabled={isLoading}>
                {isLoading ? <Spinner /> : "save entry"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 1rem;
  min-height: 100vh;

  .form {
    box-shadow: var(--shadow-2);
    padding: 3rem;
    border-radius: 10px;
    margin-top: 5rem;
  }

  .form__title,
  .form__label {
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  .form__textarea,
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
  .btn__container {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  .btn--success {
    background-color: #4bb543;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 800px) {
    .content--center {
      margin-top: 5rem;
    }
    .form {
      margin-top: 0;
    }
    .form__rows {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
export default AddEntry;
