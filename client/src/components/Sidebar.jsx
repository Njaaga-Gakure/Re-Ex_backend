import styled from "styled-components";
import logo from "../assets/sidebar-logo.png";
import { LiaTimesSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { navLinks } from "../utils/data";
import { useUserContext } from "../contexts/UserProvider";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, logout, closeModal } = useUserContext();
  return (
    <Wrapper>
      <div className={isSidebarOpen ? "sidebar sidebar--open" : "sidebar "}>
        <div className="content">
          <div className="sidebar__header">
            <div className="logo__container">
              <img src={logo} alt="Re.Ex" className="sidebar__logo" />
              {/* <p className="logo__desc">patience frugality sacrifice</p> */}
            </div>
            <button onClick={closeSidebar} className="close__btn">
              <LiaTimesSolid />
            </button>
          </div>
          <ul className="sidebar__links">
            {navLinks.map(({ id, path, icon, text }) => {
              return (
                <li
                  key={id}
                  onClick={() => {
                    closeSidebar();
                    closeModal();
                  }}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "sidebar__link link--active" : "sidebar__link"
                    }
                    to={path}
                  >
                    {icon}
                    <span>{text}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <button onClick={logout} className="logout__btn">
            <FiLogOut /> <span>logout</span>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.aside`
  .sidebar {
    position: fixed;
    min-height: 100vh;
    width: 50%;
    background-color: var(--white);
    box-shadow: var(--shadow-1);
    padding: 1rem;
    padding-top: 1.75rem;
    padding-left: 0;
    transform: translateX(-100%);
    transition: var(--transition);
    z-index: 10000;
  }
  .sidebar--open {
    transform: translateX(0);
  }
  .sidebar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    margin-bottom: 3.5rem;
  }
  .sidebar__logo {
    width: 75px;
  }
  .close__btn {
    background: transparent;
    border: none;
    svg {
      font-size: 1.5rem;
      color: var(--primary-500);
    }
  }
  .sidebar__links {
    margin-bottom: 2rem;
  }
  .sidebar__link {
    padding: 0.5rem;
    padding-left: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
    transition: 0.1s;
    svg {
      font-size: 1.5rem;
    }
  }
  .link--active {
    background-color: var(--primary-200);
    border-left: 5px solid var(--primary-500);
    color: var(--white);
  }
  .logout__btn {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;
    padding: 0.5rem;
    padding-left: 0.75rem;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    color: var(--primary-500);
  }
  @media (min-width: 800px) {
    display: none;
  }
`;
export default Sidebar;
