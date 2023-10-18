import styled from "styled-components";

const FormRowSelect = ({ labelName, name, value, handleChange, options }) => {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor="category">
        {labelName}
      </label>
      <select
        className="form__select"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
