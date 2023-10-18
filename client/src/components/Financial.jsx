import styled from "styled-components";
import { BiSolidEditAlt, BiCategory } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCashCoin, BsCalendarMinus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFinancialsContext } from "../contexts/FinancialsProvider";
import moment from "moment/moment";

const Financial = ({
  _id,
  name,
  description,
  type,
  category,
  amount,
  createdAt,
}) => {
  const { deleteFinancial, setEditFinancial } = useFinancialsContext();
  return (
    <Wrapper>
      <div className="financial__header">
        <h5 className="financial__name">{name}</h5>
        <p className="financial__date">
          <span>
            <BsCalendarMinus />
          </span>
          {moment(createdAt).format("MMM, Do, YYYY")}
        </p>
      </div>
      <hr />
      <div className="financial__body">
        <p className="financial__desc">{description}</p>
        <div>
          <p className="financial__category">
            <span>
              <BiCategory />
            </span>
            {category}
          </p>
          <p className="financial__amount">
            <span>
              <BsCashCoin />
            </span>
            {`ksh: ${amount}`}
          </p>
        </div>
        <span
          style={{
            backgroundColor: type === "revenue" ? "#4bb543" : "#EA8C85",
          }}
          className="financial__type"
        >
          {type}
        </span>
      </div>
      <div className="financial__footer">
        <Link
          to="/add-entry"
          onClick={() => {
            setEditFinancial({
              editFinancialId: _id,
              name,
              description,
              type,
              category,
              amount,
            });
          }}
          className="financial__btn btn--edit"
        >
          <BiSolidEditAlt /> edit
        </Link>
        <button
          onClick={() => deleteFinancial(_id)}
          className="financial__btn btn--delete"
        >
          <AiOutlineDelete /> delete
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: var(--white);
  box-shadow: var(--shadow-2);
  padding: 2rem;
  border-radius: 10px;
  .financial__header {
    margin-bottom: 0.5rem;
  }
  .financial__name {
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    color: var(--primary-500);
  }
  hr {
    margin-bottom: 1rem;
    background-color: transparent;
    border: none;
    border-top: 1px solid var(--primary-200);
  }
  .financial__desc {
    letter-spacing: var(--letter-spacing);
    color: var(--primary-400);
  }
  .financial__desc::first-letter {
    text-transform: capitalize;
  }
  .financial__category,
  .financial__amount,
  .financial__date {
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    span {
      font-size: 1.5rem;
    }
  }
  .financial__category {
    color: #52414c;
  }
  .financial__amount {
    color: #118c4f;
  }
  .financial__date {
    color: #2d5d7b;
  }
  .financial__body div {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 5rem;
  }
  .financial__type {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--primary-500);
    color: var(--white);
    padding: 0.25rem 1rem;
    border-radius: 0 10px 0 10px;
  }

  .financial__footer {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* align-items: center; */
    gap: 1rem;
  }
  .financial__btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: var(--transition);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;

    svg {
      font-size: 1.25rem;
    }
  }
  .btn--edit {
    border: 1px solid #4bb543;
    color: #4bb543;
  }
  .btn--edit:hover {
    background-color: #4bb543;
    color: var(--white);
  }
  .btn--delete {
    border: 1px solid #f32013;
    color: #f32013;
  }
  .btn--delete:hover {
    background-color: #f32013;
    color: var(--white);
  }
`;
export default Financial;
