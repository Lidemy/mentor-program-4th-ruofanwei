/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { selectTodos } from '../redux/selectors';
import { addTodo, setFilter, clearCompletedTodo } from '../redux/action';
import TodoContent from './TodoContent';
import { selectFilter } from '../redux/selectors';

const TodoList = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 50px;
  box-shadow: inset 0 -2px 2px 0 rgba(0, 0, 0, 0.2),
    inset 2px 0 2px 0 rgba(0, 0, 0, 0.2), inset -2px 0 2px 0 rgba(0, 0, 0, 0.2),
    inset 0 -2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0px #272a27;
`;
const CoverImg = styled.div`
  background: url("https://i.imgur.com/YcPaK24.jpg");
  height: 190px;
  background-size: cover;
  background-position: 10% 20%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
`;
const Content = styled.div`
  padding: 10px 20px;
`;
const Add = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 0 10px 0 5px;
  border-bottom: 1px solid #d9e4dd;

  & > * {
    background: transparent;
    border: none;
    height: 35px;
  }
`;
const Input = styled.input`
  font-weight: 700;
  font-size: 20px;
  color: #5ebec1;
  outline: none;
  width: 100%;
  font-family: 'Nunito';
  letter-spacing: 1px;
  font-weight: bold;
  opacity: 0.6;
`;
const Todos = styled.ul`
  margin-left: 0;
  padding: 0;
  list-style: none;
  height: 220px;
  overflow: auto;
`;
const Card = styled.li`
  user-select: none;
  margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 4px 8px;
  color: #07689f;
  font-weight: bold;
  background-color: #ffc93c;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-family: "Nunito";
  margin-top: 10px;
  font-size: 20px;

  &:hover {
    color:#aa3a3a;
    background-color:#ffc93c;
  }
`;
function App() {
  const [value, setValue] = useState('');
  const filter = useSelector(selectFilter);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const handleFilter = filter => () => {
    dispatch(setFilter(filter));
  };
  return (
    <TodoList>
      <CoverImg />
      <Content>
        <Add>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Add something todo..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              color: '#cdc9c3',
              cursor: 'pointer',
              fontSize: '21px',
            }}
            onClick={(e) => {
              e.preventDefault();
              if (!value.trim()) return;
              dispatch(addTodo(value));
              setValue('');
            }}
          />
        </Add>
        <Todos>
          <Card>
            {todos
              .filter((todo) => {
                switch (filter) {
                  case 'all':
                    return true;
                  case 'Completed':
                    return todo.completed;
                  case 'active':
                    return !todo.completed;
                  default:
                    return true;
                }
              })
              .map(todo => (
                <TodoContent
                  key={todo.id}
                  todo={todo}
                />
              ))}
          </Card>
        </Todos>
      </Content>
      <ButtonWrapper>
        <Button onClick={handleFilter('all')}>All</Button>
        <Button onClick={handleFilter('active')}>Active</Button>
        <Button onClick={handleFilter('Completed')}>Completed</Button>
        <Button onClick={() => dispatch(clearCompletedTodo())}>Clear</Button>
      </ButtonWrapper>
    </TodoList>
  );
}

export default App;
