import {
  GET_FUNNELS,
  GET_FUNNEL,
  DELETE_FUNNEL,
  CREATE_FUNNEL,
} from "../actions/types.js";

const initialState = {
  funnels: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FUNNELS:
      return {
        ...state,
        funnels: action.payload,
      };
    case GET_FUNNEL:
      return {
        ...state,
        funnel: action.payload,
      };
    case DELETE_FUNNEL:
      return {
        ...state,
        funnels: state.funnels.filter((funnel) => funnel.id != action.payload),
      };
    case CREATE_FUNNEL:
      return {
        ...state,
        funnels: [...state.funnels, action.payload],
      };
    default:
      return state;
  }
}
