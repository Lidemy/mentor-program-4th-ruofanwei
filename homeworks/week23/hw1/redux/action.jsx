import {
  ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, CLEAR_COMPLETED_TODO, SET_FILTER,
} from './actionTypes';

export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name,
    },
  };
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}
export function editTodo(id, name) {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      name,
    },
  };
}
export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}
export function clearCompletedTodo() {
  return {
    type: CLEAR_COMPLETED_TODO,
  };
}
export const setFilter = filter => (
  {
    type: SET_FILTER,
    payload: {
      filter,
    },
  }
);
