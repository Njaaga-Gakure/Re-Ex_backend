import {
  BEGIN_REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  BEGIN_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  LOGOUT_USER,
  CLOSE_NAV_MODAL,
  BEGIN_UPDATE,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  TOGGLE_NAV_MODAL,
} from "../actions";
import { removeUserFromLocalStorage } from "../utils/local-storage";

const reducer = (state, action) => {
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSidebarOpen: true, isNavModalOpen: false };
  }
  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === TOGGLE_NAV_MODAL) {
    return {
      ...state,
      isNavModalOpen: !state.isNavModalOpen,
      isSidebarOpen: false,
    };
  }
  if (action.type === CLOSE_NAV_MODAL) {
    return { ...state, isNavModalOpen: false };
  }

  if (action.type === BEGIN_REGISTER) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_SUCCESS) {
    return { ...state, user: action.payload, isLoading: false };
  }
  if (action.type === REGISTER_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === BEGIN_LOGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_SUCCESS) {
    return { ...state, user: action.payload, isLoading: false };
  }
  if (action.type === LOGIN_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === LOGOUT_USER) {
    removeUserFromLocalStorage();
    return {
      ...state,
      user: null,
      isSidebarOpen: false,
      isNavModalOpen: false,
    };
  }
  if (action.type === BEGIN_UPDATE) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_SUCCESS) {
    return { ...state, user: action.payload, isLoading: false };
  }
  if (action.type === UPDATE_ERROR) {
    return { ...state, isLoading: false };
  }
};

export default reducer;
