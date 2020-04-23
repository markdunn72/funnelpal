import { combineReducers } from "redux";
import funnels from "./funnels";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  funnels,
  errors,
  messages,
  auth,
});
