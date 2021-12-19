import {
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_DEPOSIT_FAIL,
  TRANSACTION_DEPOSIT_REQUEST,
  TRANSACTION_DEPOSIT_SUCCESS,
  TRANSACTION_WITHDRAWL_FAIL,
  TRANSACTION_WITHDRAWL_REQUEST,
  TRANSACTION_WITHDRAWL_SUCCESS,
  CLEAR_TRANSACTION_WITHDRAWL_REQUEST,
  CLEAR_TRANSACTION_DEPOSIT_REQUEST,
} from "../constants/transactionConstants";

export const transactionListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_LIST_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const transactionDepositReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DEPOSIT_REQUEST:
      return { loading: true };
    case TRANSACTION_DEPOSIT_SUCCESS:
      return { loading: false, transactionInfo: action.payload };
    case TRANSACTION_DEPOSIT_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_TRANSACTION_DEPOSIT_REQUEST:
      return { loading: false };
    default:
      return state;
  }
};
export const transactionWithdrawlReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_WITHDRAWL_REQUEST:
      return { loading: true };
    case TRANSACTION_WITHDRAWL_SUCCESS:
      return { loading: false, transactionInfo: action.payload };
    case TRANSACTION_WITHDRAWL_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_TRANSACTION_WITHDRAWL_REQUEST:
      return { loading: false };
    default:
      return state;
  }
};
