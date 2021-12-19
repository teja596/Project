import axios from "axios";

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

export const getTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_LIST_REQUEST,
    });
    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/transaction`, config);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transactionDeposit =
  (amount, PIN) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_DEPOSIT_REQUEST,
      });
      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/transaction/deposit",
        { amount, PIN },
        config
      );
      console.log(data);
      dispatch({
        type: TRANSACTION_DEPOSIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_DEPOSIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const transactionWithdrawl =
  (amount, PIN) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_WITHDRAWL_REQUEST,
      });
      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/transaction/withdrawl",
        { amount, PIN },
        config
      );

      dispatch({
        type: TRANSACTION_WITHDRAWL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_WITHDRAWL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const clearTransactionWithdrawl = () => async (dispatch) => {
  dispatch({ type: CLEAR_TRANSACTION_WITHDRAWL_REQUEST });
};
export const clearTransactionDeposit = () => async (dispatch) => {
  dispatch({ type: CLEAR_TRANSACTION_DEPOSIT_REQUEST });
};
