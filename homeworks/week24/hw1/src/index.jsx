/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import 'bootswatch/dist/minty/bootstrap.min.css';
import { Provider } from 'react-redux';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

const theme = {
  colors: {
    white: '#fff',
    brown: '#ba7967',
    darkBlue: '#407088',
    darkWhite: 'rgba(255, 255, 255, 0.7)',
    darkYellow: '#b58900',
    darkGreen: '#557571',
    darkGrey: '#5a5a5a',
    brightBlue: '#6cc3d5',
    brightYellow: '#ffce67',
    brightGrey: '#f8f9fa',
    brightGreen: '#78c2ad',
    brightPink: '#f3969a',
  },
  fonts: {
    LG: '24px',
    MD: '18px',
    SM: '14px',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
