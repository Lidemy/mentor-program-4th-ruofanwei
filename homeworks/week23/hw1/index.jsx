/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

const TitleWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid #faeee7;
  background-color: #faeee7;
`;
const Top = styled.div`
  color: #ea907a;
  margin: 0 auto;
  font-size: 35px;
  cursor: pointer;
  &:hover {
    color: #2d6187;
`;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TitleWrapper>
        <Top>Todolist</Top>
      </TitleWrapper>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
