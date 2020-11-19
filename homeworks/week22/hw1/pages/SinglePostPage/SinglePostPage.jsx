/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../../WebAPI';

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto;
  padding: 0 20px;
  border: 1px dash ${props => props.theme.colors.darkGrey};
  border-radius: 10px;
  padding: 16px;
  background: ${props => props.theme.colors.darkWhite};
  box-shadow: 0 0 4px ${props => props.theme.colors.darkGrey};
`;
const PostTitle = styled.h2`
  font-size: ${props => props.theme.fonts.LG};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;

  &:hover{
    text-decoration: none;
    color: ${props => props.theme.colors.brown};
  }
`;
const PostDate = styled.div`
  font-size: ${props => props.theme.fonts.SM};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;

  &:hover{
    text-decoration: none;
    color: ${props => props.theme.colors.brown};
  }
`;
const Content = styled.p`
  font-size: ${props => props.theme.fonts.MD};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  margin-top: 30px;
  height: 400px;
  overflow: hidden;
  overflow: scroll; 

  &:hover{
    text-decoration: none;
    color: ${props => props.theme.colors.brown};
  }
`;
const LoadMessage = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: 'Neucha';
  letter-spacing: 4px;
  font-weight: bold;
  margin: auto;
`;

export default function SinglePostPage() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getSinglePost(id).then((post) => {
      setPost(post);
    });
  }, [id, post]);
  return (
    <Root>
      {post.id ? (
        <>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          <Content>{post.body}</Content>
        </>
      ) : <LoadMessage>Loading...</LoadMessage> }
    </Root>
  );
}
