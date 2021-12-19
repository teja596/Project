import axios from "axios";
import {
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_PENDING_FAIL,
  ACCOUNT_DETAILS_PENDING_REQUEST,
  ACCOUNT_DETAILS_PENDING_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_PIN_UPDATE_SUCCESS,
  ACCOUNT_PIN_UPDATE_REQUEST,
  ACCOUNT_PIN_UPDATE_FAIL,
  ACCOUNT_PIN_UPDATE_CLEAR,
} from "../constants/accountConstants";
export const accountRegisterRequest =
  (name, email, aadharNumber, PIN) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNT_REGISTER_REQUEST,
      });
      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/account",
        { name, email, aadharNumber, PIN },
        config
      );

      dispatch({
        type: ACCOUNT_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAccountDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_DETAILS_REQUEST,
    });
    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/account/${userId}`, config);

    dispatch({
      type: ACCOUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAccounts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_DETAILS_PENDING_REQUEST,
    });
    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/account`, config);

    dispatch({
      type: ACCOUNT_DETAILS_PENDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAILS_PENDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const accountUpdateRequest =
  (id, userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNT_UPDATE_REQUEST,
      });
      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/account/${id}`,
        { userId },
        config
      );

      dispatch({
        type: ACCOUNT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const accountPINUpdateRequest =
  (PIN, newPIN, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNT_PIN_UPDATE_REQUEST,
      });
      const { token } = getState().userLogin.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/account/update-pin/${id}`,
        { PIN, newPIN },
        config
      );

      dispatch({
        type: ACCOUNT_PIN_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_PIN_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const accoutPINDetailsClear = () => async (dispatch) => {
  dispatch({ type: ACCOUNT_PIN_UPDATE_CLEAR });
};
