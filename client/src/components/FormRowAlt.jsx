import styled from "styled-components";

const FormRowAlt = ({ name, type, value, handleChange, labelName }) => {
  return (
    <Wrapper className="form__row">
      <label className="form__label" htmlFor={name}>
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form__input"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form__label {
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  .form__input {
    margin-top: 0.5rem;
    display: block;
    width: 100%;
    background: transparent;
    padding: 0.75rem 1rem;
    border: 1px solid var(--primary-500);
    border-radius: 5px;
    outline: none;
    letter-spacing: 1px;
  }
`;

export default FormRowAlt;
