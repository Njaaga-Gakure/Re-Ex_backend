import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import styled from "styled-components";

const SharedLayout = () => {
  return (
    <Wrapper className="dashboard">
      <Sidebar />
      <Navbar />
      <Outlet />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  /* .dashboard__pages {
    border: 1px solid black;
  } */
  /* @media (min-width: 800px) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0;
  }
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 3fr;
  } */
`;
export default SharedLayout;
