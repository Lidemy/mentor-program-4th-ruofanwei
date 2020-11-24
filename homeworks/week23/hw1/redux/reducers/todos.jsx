/* eslint-disable no-plusplus */
import {
  ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_COMPLETED_TODO,
} from '../actionTypes';

let todoId = 0;

const initialState = {
  todos: [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, {
          id: todoId++,
          name: action.payload.name,
          completed: false,
        }],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos
          .filter(todo => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos
          .map((todo) => {
            if (todo.id !== action.payload.id) return todo;
            return {
              ...todo,
              completed: !todo.completed,
            };
          }),
      };
    }
    case CLEAR_COMPLETED_TODO: {
      return {
        ...state,
        todos: state.todos
          .filter(todo => !todo.completed),
      };
    }
    default: {
      return state;
    }
  }
}
