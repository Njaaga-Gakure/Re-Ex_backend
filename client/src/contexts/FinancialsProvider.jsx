import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "./financialsReducer";
import { useUserContext } from "./UserProvider";
import {
  ADD_ENTRY_ERROR,
  ADD_ENTRY_SUCCESS,
  BEGIN_ADD_ENTRY,
  BEGIN_FINANCIALS_FETCH,
  BEGIN_FINANCIAL_EDIT,
  CLEAR_ENTRY_VALUES,
  CLEAR_FILTERS,
  FINANCIALS_FETCH_SUCCESS,
  FINANCIAL_EDIT_ERROR,
  FINANCIAL_EDIT_SUCCESS,
  HANDLE_ENTRY_CHANGE,
  HANDLE_FILTERS_CHANGE,
  SET_EDIT_FINANCIAL,
  SET_NEXT_PAGE,
  SET_PAGE,
  SET_PREV_PAGE,
} from "../actions";
import customRequest from "../utils/axios";
import { toast } from "react-toastify";

const initialEntryState = {
  name: "",
  category: "food",
  categoryOptions: [
    "food",
    "housing",
    "clothing",
    "recreation",
    "transport",
    "investment",
    "insurance",
    "wage",
    "education",
  ],
  description: "",
  amount: "",
  type: "revenue",
  typeOptions: ["revenue", "expense"],
  isEditing: false,
  editFinancialId: "",
};
const initialState = {
  isLoading: false,
  ...initialEntryState,
  financials: [],
  financialsCount: "",
  numberOfPages: 1,
  page: 1,
  filters: {
    search: "",
    searchCategory: "all",
    searchType: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],
  },
};
const FinancialsContext = createContext();

export const FinancialsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user } = useUserContext();

  const handleEntryChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_ENTRY_CHANGE, payload: { name, value } });
  };

  const clearEntryValues = () => {
    dispatch({ type: CLEAR_ENTRY_VALUES, payload: initialEntryState });
  };

  const addFinancial = async (financial) => {
    const { token } = user;
    dispatch({ type: BEGIN_ADD_ENTRY });
    try {
      await customRequest.post("/financials", financial, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("entry added successfully");
      dispatch({ type: ADD_ENTRY_SUCCESS });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: ADD_ENTRY_ERROR });
    }
  };
  const getAllFinancials = async () => {
    try {
      const { token } = user;
      dispatch({ type: BEGIN_FINANCIALS_FETCH });
      const { sort, search, searchCategory, searchType } = state.filters;
      let url = `/financials?sort=${sort}&category=${searchCategory}&type=${searchType}&page=${state.page}`;
      if (search) {
        url += `&search=${search}`;
      }
      const { data } = await customRequest.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FINANCIALS_FETCH_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: FINANCIALS_FETCH_SUCCESS, payload: "" });
    }
  };
  const deleteFinancial = async (id) => {
    try {
      const { token } = user;
      await customRequest.delete(`/financials/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      await getAllFinancials();
      toast.success("entry deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const setEditFinancial = (financial) => {
    dispatch({ type: SET_EDIT_FINANCIAL, payload: financial });
  };

  const editFinancial = async ({ financialId, financial }) => {
    dispatch({ type: BEGIN_FINANCIAL_EDIT });
    try {
      const { token } = user;
      await customRequest.patch(`/financials/${financialId}`, financial, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FINANCIAL_EDIT_SUCCESS });

      toast.success("entry modified successfully");
      clearEntryValues();
    } catch (error) {
      dispatch({ type: FINANCIAL_EDIT_ERROR });
      toast.error(error.response.data.msg);
    }
  };
  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_FILTERS_CHANGE, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS, payload: initialState.filters });
  };
  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
  const setPrevPage = () => {
    dispatch({ type: SET_PREV_PAGE });
  };
  const setNextPage = () => {
    dispatch({ type: SET_NEXT_PAGE });
  };
  return (
    <FinancialsContext.Provider
      value={{
        ...state,
        addFinancial,
        getAllFinancials,
        deleteFinancial,
        handleEntryChange,
        clearEntryValues,
        setEditFinancial,
        editFinancial,
        handleFiltersChange,
        clearFilters,
        setPage,
        setPrevPage,
        setNextPage,
      }}
    >
      {children}
    </FinancialsContext.Provider>
  );
};

export const useFinancialsContext = () => {
  return useContext(FinancialsContext);
};
export default FinancialsProvider;
