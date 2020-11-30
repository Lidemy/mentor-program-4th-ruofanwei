/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteTodo, toggleTodo } from '../redux/action';

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  margin-bottom: 10px;
  width: 100%;
`;
const Todo1 = styled.label`
  color: #6c717b;
  font-size: 15px;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  display: inline-block;
  padding: 5px 5px 5px 30px;
  font-weight: bold;

  &:hover {
    background-color: #f4f7fa;
    color: #5ebec1;
  }
  &:active {
    color: #5ebec1;
  }
`;
const CardBody = styled.div``;
const Check = styled.span`
  left: 4px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  display: block;
  background: white;
  border-radius: 3px;
  border: 2px solid #99d8d0;
  box-shadow: 0 2px 3px #f0f4f8;
`;

const TodoText = styled.p`
  font-family: 'Nunito';
  letter-spacing: 1px;
  font-weight: bold;

  ${props => props.completed
    && `
      text-decoration: line-through;
      color: #8db596;
      opacity: 0.6;
    `}
`;
const EditTodo = styled.div`
  width: 55px;
  display: flex;
  justify-content: flex-end;
`;
function TodoContent({ todo }) {
  const dispatch = useDispatch();
  return (
    <CardList>
      <CardBody>
        <Todo1
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <Check>{todo.completed ? '✔' : ''}</Check>
          <TodoText completed={todo.completed}>{todo.name}</TodoText>
        </Todo1>
      </CardBody>
      <EditTodo>
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{
            color: '#cdc9c3',
            cursor: 'pointer',
            fontSize: '21px',
            margin: 'auto 0',
          }}
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </EditTodo>
    </CardList>
  );
}

export default TodoContent;
