/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPost,
  setPost,
  editPost,
  setErrorMessage,
} from '../../redux/reducers/postReducer';

const Form = styled.form`
  width: 60%;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputTitle = styled.input`
  font-size: ${props => props.theme.fonts.LG};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: "Neucha";
  border-radius: 10px;
  letter-spacing: 4px;
  font-weight: bold;
  width: 100%;
  outline: none;
  border-color: ${props => props.theme.colors.brightYellow};

  &:hover {
    text-decoration: none;
    outline: none;
    color: ${props => props.theme.colors.brown};
    border-color: ${props => props.theme.colors.brightBlue};
  }
`;

const InputContent = styled.textarea`
  font-size: ${props => props.theme.fonts.MD};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  margin: 30px 0;
  border-radius: 10px;
  height: 400px;
  width: 100%;
  overflow: hidden;
  overflow: scroll;
  outline: none;
  border-color: ${props => props.theme.colors.brightYellow};
  &:hover {
    text-decoration: none;
    outline: none;
    color: ${props => props.theme.colors.brown};
    border-color: ${props => props.theme.colors.brightBlue};
  }
`;
const ErrorMessage = styled.div`
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  font-size: ${props => props.theme.fonts.MD};
  color: red;
`;
const Button = styled.button`
  outline: none;
  font-size: ${props => props.theme.fonts.MD};
  color: ${props => props.theme.colors.brown};
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  border-radius: 10px;
  background: ${props => props.theme.colors.brightYellow};
  padding: 10px;
  border-color: ${props => props.theme.colors.brightYellow};
  &:hover {
    outline: none;
    background: ${props => props.theme.colors.brightBlue};
    border-color: ${props => props.theme.colors.brightBlue};
    color: ${props => props.theme.colors.white};
  }
`;
const LoadMessage = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: "Neucha";
  letter-spacing: 7px;
  font-weight: bold;
  margin: auto;
`;

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const errorMessage = useSelector(store => store.posts.errorMessage);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.posts.isLoadingPost);
  const setError = () => dispatch(setErrorMessage(null));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || title.trim() === '' || content.trim() === '') {
      return dispatch(setErrorMessage('there is no title or content'));
    }
    dispatch(editPost(title, content, id)).then((res) => {
      if (res) history.push('/');
    });
  };
  useEffect(() => {
    dispatch(getPost(id)).then((post) => {
      console.log(post);
      setTitle(post.title);
      setContent(post.body);
    });
    return () => dispatch(setPost(null));
  }, [id, dispatch]);
  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {isLoading ? (<LoadMessage>Loading...</LoadMessage>)
        : (
          <>
            <InputTitle
              placeholder="Title ... "
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={setError}
            />
            <InputContent
              placeholder="Content ... "
              value={content}
              onChange={e => setContent(e.target.value)}
              onFocus={setError}
            />
            <Button type="submit">Update</Button>
          </>
        )
        }
    </Form>
  );
}
