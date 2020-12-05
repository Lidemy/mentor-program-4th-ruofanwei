/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
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
import EditPostPage from '../../pages/EditPostPage';
import CreateNewPostPage from '../../pages/CreateNewPostPage';
import Header from '../Header';
import { getUser } from '../../redux/reducers/userReducer';
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
  const user = useSelector(store => store.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
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
          <Route path="/edit/:id">
            {user && <EditPostPage />}
          </Route>
          <Route path="/posts/:id">
            <SinglePostPage />
          </Route>
          <Route path="/new-post">
            {user && <CreateNewPostPage />}
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
