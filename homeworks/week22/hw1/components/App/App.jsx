/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import AboutPage from '../../pages/AboutPage';
import SinglePostPage from '../../pages/SinglePostPage';
import HomePage from '../../pages/HomePage';
import CreateNewPostPage from '../../pages/CreateNewPostPage';
import Header from '../Header';
import { getMe } from '../../WebAPI';
import { AuthContext } from '../../context';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding: 64px;
  background: url(https://i.imgur.com/YcPaK24.jpg);
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover;
  height: 710px;
`;
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 有 token才 call api
    if (getAuthToken()) {
      setLoading(true);
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setLoading(false);
        }
        setLoading(false);
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{
      user, setUser, loading, setLoading,
    }}
    >
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/posts/:id">
              <SinglePostPage />
            </Route>
            <Route path="/new-post">
              <CreateNewPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
