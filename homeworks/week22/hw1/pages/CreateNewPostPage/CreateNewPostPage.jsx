/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { releaseNewPost } from '../../WebAPI';

const ErrorMessage = styled.div`
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  font-size: ${props => props.theme.fonts.MD};
  color: red;
`;

const Form = styled.form`
  width: 60%;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 800px;
  outline: none;
  margin-top: 30px;
  border-radius: 10px;
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  padding: 10px;
  border-color: ${props => props.theme.colors.brightYellow};
  margin-left: 20px;
  font-size: ${props => props.theme.fonts.MD};
  color:  ${props => props.theme.colors.brown};

  &:hover{
    border-color: ${props => props.theme.colors.brightBlue};
  }
`;
const Content = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  outline: none;
  font-size: ${props => props.theme.fonts.MD};
  width: 800px;
  color:  ${props => props.theme.colors.brown};
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  margin-left: 20px;
  border-color: ${props => props.theme.colors.brightYellow};
  &:hover{
    border-color: ${props => props.theme.colors.brightBlue};
  }
  height: 400px;
`;

const Button = styled.button`
  outline: none;
  font-size: ${props => props.theme.fonts.MD};
  color:  ${props => props.theme.colors.brown};
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  border-radius: 10px;
  background: ${props => props.theme.colors.brightYellow};
  padding: 10px;
  border-color: ${props => props.theme.colors.brightYellow};
  &:hover{
    outline: none;
    background: ${props => props.theme.colors.brightBlue};
    border-color: ${props => props.theme.colors.brightBlue};
    color:  ${props => props.theme.colors.white};
  }
`;

export default function CreateNewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  // no errorMessage while isTyping
  const handleFocus = () => {
    setErrorMessage(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    releaseNewPost(title, content).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      history.push('/');
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Title value={title} onChange={e => setTitle(e.target.value)}>
        <Input onFocus={handleFocus} />
      </Title>
      <Content value={content} onChange={e => setContent(e.target.value)}>
        <Textarea onFocus={handleFocus} />
      </Content>
      <Button>Post</Button>
    </Form>
  );
}
