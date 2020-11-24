import { SET_FILTER } from '../actionTypes';

const initialState = {
  filter: 'all',
};

export default function filterReducer(state = initialState, action) {
  if (action.type === SET_FILTER) {
    return {
      ...state,
      filter: action.payload.filter,
    };
  }
  return state;
}
