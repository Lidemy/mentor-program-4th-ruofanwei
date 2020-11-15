/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import TodoItem from './components/TodoItem';
import reportWebVitals from './reportWebVitals';
import './index.css';

const TitleWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-comtent: space-between;
  padding: 8px 16px;
  border: 1px solid ${props => props.theme.colors.green};
  background-color: ${props => props.theme.colors.green};
`;
const Top = styled.div`
  color: ${props => props.theme.colors.yellow};
  margin: 0 auto;
  font-size: 35px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.blue};
`;

const theme = {
  colors: {
    yellow: '#fcbf1e',
    green: '#68b0ab',
    pink: '#ffeadb',
    orange: '#ff9a76',
    blue: '#2d6187',
  },
  fonts: {
    LG: '24px',
    MD: '18px',
    SM: '14px',
  },
};
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TitleWrapper>
        <Top>Todolist</Top>
      </TitleWrapper>
      <TodoItem />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
