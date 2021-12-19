import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  accountDetailsReducer,
  accountRegisterReducer,
  accountsDetailsReducer,
  accountUpdateRequestReducer,
  accountPINUpdateRequestReducer,
} from "./reducers/accountReducer";
import {
  transactionDepositReducer,
  transactionListReducer,
  transactionWithdrawlReducer,
} from "./reducers/transactionReducer";

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  accountDetails: accountDetailsReducer,
  accountRegister: accountRegisterReducer,
  accountsDetails: accountsDetailsReducer,
  accountUpdateDetails: accountUpdateRequestReducer,
  accountPINUpdateDetails: accountPINUpdateRequestReducer,

  transactionList: transactionListReducer,
  transactionDepositInfo: transactionDepositReducer,
  transactionWithdrawlInfo: transactionWithdrawlReducer,
});

//mapping logged userinfo from localstorage

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
