import React from "react";
import styled from "styled-components";

const FormRow = ({ name, type, value, handleChange, labelName, icon }) => {
  return (
    <Wrapper className="form__row">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form__input"
        required
      />
      <label className="form__label" htmlFor={name}>
        {icon}
        {labelName}
      </label>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;

  .form__label {
    position: absolute;
    bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
    transition: 0.6s;
    span {
      font-size: 0.8rem;
    }
  }
  .form__input {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--primary-500);
    outline: none;
    letter-spacing: 1px;
  }

  .form__input:focus ~ .form__label {
    bottom: 1.75rem;
    font-size: 0.9rem;
    span {
      display: none;
    }
  }
  .form__input:valid ~ .form__label {
    bottom: 1.75rem;
    span {
      display: none;
    }
  }
`;

export default FormRow;
