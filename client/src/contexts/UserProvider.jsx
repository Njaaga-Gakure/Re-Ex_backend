import { createContext, useReducer, useContext } from "react";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../utils/local-storage";
import reducer from "./userReducer";
import customRequest from "../utils/axios";
import { toast } from "react-toastify";
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_NAV_MODAL,
  CLOSE_NAV_MODAL,
  BEGIN_LOGIN,
  BEGIN_REGISTER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGOUT_USER,
  BEGIN_UPDATE,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
} from "../actions";

const UserContext = createContext();
const initialState = {
  isSidebarOpen: false,
  isNavModalOpen: false,
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };
  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  const register = async (user) => {
    dispatch({ type: BEGIN_REGISTER });
    try {
      const {
        data: { user: registeredUser },
      } = await customRequest.post("/auth/register", user);
      addUserToLocalStorage(registeredUser);
      toast.success(`welcome ${registeredUser.name}`);
      dispatch({ type: REGISTER_SUCCESS, payload: registeredUser });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: REGISTER_ERROR });
    }
  };
  const login = async (user) => {
    dispatch({ type: BEGIN_LOGIN });
    try {
      const {
        data: { user: loginUser },
      } = await customRequest.post("/auth/login", user);
      addUserToLocalStorage(loginUser);
      toast.success(`welcome back ${loginUser.name}`);
      dispatch({ type: LOGIN_SUCCESS, payload: loginUser });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: LOGIN_ERROR });
    }
  };
  const toggleModal = () => {
    dispatch({ type: TOGGLE_NAV_MODAL });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_NAV_MODAL });
  };
  const logout = () => {
    toast.success("logging out...");
    dispatch({ type: LOGOUT_USER });
  };
  const updateUser = async (user) => {
    dispatch({ type: BEGIN_UPDATE });
    try {
      const { token } = state.user;
      const {
        data: { user: updatedUser },
      } = await customRequest.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      addUserToLocalStorage(updatedUser);
      toast.success("profile updated successfully");
      dispatch({ type: UPDATE_SUCCESS, payload: updatedUser });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: UPDATE_ERROR });
    }
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        toggleModal,
        closeModal,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserProvider;
