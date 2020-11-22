/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-unresolved
import React from 'react';

const CardBody = styled.div``;
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
  font-family: "Nunito";

  ${props => props.isDone
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

// eslint-disable-next-line react/prop-types
function TodoContent({ todo, handleDeleteTodo, handleToggleClick }) {
  return (
    <CardList>
      <CardBody>
        <Todo1
          onClick={() => {
            handleToggleClick(todo.id);
          }}
        >
          <Check>{todo.isDone ? '✔' : ''}</Check>
          <TodoText isDone={todo.isDone}>{todo.content}</TodoText>
        </Todo1>
      </CardBody>
      <EditTodo>
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
          style={{
            color: '#cdc9c3',
            cursor: 'pointer',
            fontSize: '21px',
            margin: 'auto 0',
          }}
        />
      </EditTodo>
    </CardList>
  );
}

export default TodoContent;
