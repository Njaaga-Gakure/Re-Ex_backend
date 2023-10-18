import {
  BEGIN_ADD_ENTRY,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_ERROR,
  BEGIN_FINANCIALS_FETCH,
  FINANCIALS_FETCH_SUCCESS,
  FINANCIALS_FETCH_ERROR,
  HANDLE_ENTRY_CHANGE,
  CLEAR_ENTRY_VALUES,
  SET_EDIT_FINANCIAL,
  BEGIN_FINANCIAL_EDIT,
  FINANCIAL_EDIT_SUCCESS,
  FINANCIAL_EDIT_ERROR,
  HANDLE_FILTERS_CHANGE,
  CLEAR_FILTERS,
  SET_PAGE,
  SET_PREV_PAGE,
  SET_NEXT_PAGE,
} from "../actions";

const reducer = (state, action) => {
  if (action.type === BEGIN_ADD_ENTRY) {
    return { ...state, isLoading: true };
  }
  if (action.type === HANDLE_ENTRY_CHANGE) {
    const { name, value } = action.payload;
    return { ...state, [name]: value };
  }
  if (action.type === CLEAR_ENTRY_VALUES) {
    return { ...state, ...action.payload };
  }
  if (action.type === ADD_ENTRY_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === ADD_ENTRY_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === BEGIN_FINANCIALS_FETCH) {
    return { ...state, isLoading: true };
  }
  if (action.type === FINANCIALS_FETCH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      ...action.payload,
    };
  }
  if (action.type === FINANCIALS_FETCH_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === SET_EDIT_FINANCIAL) {
    return { ...state, isEditing: true, ...action.payload };
  }
  if (action.type === BEGIN_FINANCIAL_EDIT) {
    return { ...state, isLoading: true };
  }
  if (action.type === FINANCIAL_EDIT_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === FINANCIAL_EDIT_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === HANDLE_FILTERS_CHANGE) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value }, page: 1 };
  }
  if (action.type === CLEAR_FILTERS) {
    return { ...state, filters: action.payload };
  }
  if (action.type === SET_PAGE) {
    return { ...state, page: action.payload };
  }
  if (action.type === SET_PREV_PAGE) {
    let page = state.page - 1;
    if (page < 1) {
      page = state.numberOfPages;
    }
    return { ...state, page };
  }
  if (action.type === SET_NEXT_PAGE) {
    let page = state.page + 1;
    if (page > state.numberOfPages) {
      page = 1;
    }
    return { ...state, page };
  }
};

export default reducer;
