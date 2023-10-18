import styled from "styled-components";
import logo from "../assets/logo.png";
import { FormRow, Spinner } from "../components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/UserProvider";
import { FaUserAlt } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { BiSolidLock } from "react-icons/bi";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const LandingPage = () => {
  const [state, setState] = useState(initialState);
  const { isMember, name, email, password } = state;
  const { user, isLoading, login, register } = useUserContext();
  const navigate = useNavigate();

  // toggle between login and register
  const toggleMember = () => {
    setState((preState) => {
      return { ...preState, isMember: !preState.isMember };
    });
  };

  // control the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  // handle registration and login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isMember && !name)) return;

    // check if the user is trying to login or registering as a new user
    if (isMember) {
      login({ email, password });
      return;
    }
    register({ name, email, password });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper>
      <div className="hero">
        <div className="hero__body">
          <img src={logo} alt="" className="logo" />
          <p className="hero__tagline">
            patience <span></span> frugality <span></span> sacrifice
          </p>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h5 className="form__title">{isMember ? "login" : "sign up"}</h5>
        {!isMember && (
          <FormRow
            labelName="name"
            icon={<FaUserAlt />}
            name="name"
            type="text"
            handleChange={handleChange}
            value={name}
          />
        )}
        <FormRow
          labelName="email"
          icon={<SiMinutemailer />}
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
        />
        <FormRow
          labelName="password"
          icon={<BiSolidLock />}
          name="password"
          type="password"
          handleChange={handleChange}
          value={password}
        />
        <button disabled={isLoading} className="btn">
          {isLoading ? <Spinner /> : isMember ? "login" : "sign up"}
        </button>
        <p className="text_small">
          {isMember ? "Not a member yet?" : " Already a member?"}
          <button onClick={toggleMember} type="button" className="member-btn">
            {isMember ? "register" : "login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  .hero {
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.9),
        rgba(0, 0, 0, 0.7)
      ),
      url("/hero-bg.jpg");
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: grid;
    place-items: center;
  }
  .hero__body {
    padding: 2rem 1rem;
  }
  .logo {
    margin: 0 auto 1rem;
    width: 200px;
  }

  .hero__tagline {
    padding: 0.25em 1rem;
    border-radius: 50px;
    background: var(--white);
    letter-spacing: var(--letter-spacing);
    white-space: nowrap;
    text-transform: capitalize;
    color: var(--primary-500);
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: var(--primary-500);
      border-radius: 50%;
    }
  }

  .form {
    padding: 5rem 2rem;
    display: grid;
    gap: 2rem;
  }
  .form__title {
    margin-bottom: 1rem;
    text-align: center;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  .btn {
    display: flex;
    justify-content: center;
  }
  .text_small {
    text-align: center;
    letter-spacing: var(--letter-spacing);
  }
  .member-btn {
    background: transparent;
    border: none;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  @media (min-width: 900px) {
    display: grid;
    gap: 4rem;
    grid-template-columns: 1.5fr 1fr;
    align-items: center;
    .form {
      padding: 4rem;
      padding-left: 0;
    }

    .hero__body {
      text-align: center;
    }
  }
`;
export default LandingPage;
