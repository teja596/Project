import {
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_PENDING_SUCCESS,
  ACCOUNT_DETAILS_PENDING_FAIL,
  ACCOUNT_DETAILS_PENDING_REQUEST,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_PIN_UPDATE_FAIL,
  ACCOUNT_PIN_UPDATE_REQUEST,
  ACCOUNT_PIN_UPDATE_SUCCESS,
  ACCOUNT_PIN_UPDATE_CLEAR,
} from "../constants/accountConstants";

export const accountDetailsReducer = (state = { accountInfo: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_DETAILS_SUCCESS:
      return { loading: false, accountInfo: action.payload };
    case ACCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const accountRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_REGISTER_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_REGISTER_SUCCESS:
      return { loading: false, accountInfo: action.payload };
    case ACCOUNT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const accountsDetailsReducer = (
  state = { accountDetails: [] },
  action
) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_PENDING_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_DETAILS_PENDING_SUCCESS:
      return { loading: false, accountDetails: action.payload };
    case ACCOUNT_DETAILS_PENDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const accountUpdateRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, accountDetails: action.payload };
    case ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accountPINUpdateRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_PIN_UPDATE_REQUEST:
      return { loading: true };
    case ACCOUNT_PIN_UPDATE_SUCCESS:
      return { loading: false, accountPINDetails: action.payload };
    case ACCOUNT_PIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_PIN_UPDATE_CLEAR:
      return { loading: false };
    default:
      return state;
  }
};
