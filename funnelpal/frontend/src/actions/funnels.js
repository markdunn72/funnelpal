import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_FUNNELS,
  GET_FUNNEL,
  DELETE_FUNNEL,
  CREATE_FUNNEL,
  UPDATE_FUNNEL,
} from "./types";

export const getFunnels = () => (dispatch, getState) => {
  axios
    .get("/api/funnels/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FUNNELS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getFunnel = (id) => (dispatch, getState) => {
  axios
    .get(`/api/funnels/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FUNNEL,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFunnel = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/funnels/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteFunnel: "Funnel Deleted" }));
      dispatch({
        type: DELETE_FUNNEL,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const createFunnel = (funnel) => (dispatch, getState) => {
  axios
    .post("/api/funnels/", funnel, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ createFunnel: "Funnel Created" }));
      dispatch({
        type: CREATE_FUNNEL,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// TODO: make this partial update
export const updateFunnel = (funnel, id) => (dispatch, getState) => {
  axios
    .patch(`/api/funnels/${id}/`, funnel, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateFunnel: "Funnel Updated" }));
      dispatch({
        type: UPDATE_FUNNEL,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
