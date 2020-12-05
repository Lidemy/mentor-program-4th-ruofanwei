/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, setPost, deletePost } from '../../redux/reducers/postReducer';

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto 10px auto;
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
const PostUser = styled.div`
  font-size: ${props => props.theme.fonts.SM};
  color: ${props => props.theme.colors.darkBlue};
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
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
  height: 350px;
  overflow: scroll; 
  white-space:pre-line;
  word-break: break-all;

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
  letter-spacing: 7px;
  font-weight: bold;
  margin: auto;
`;
const EditContainer = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: bold;
  color: #333;
`;
const CreateInfo = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: bold;
  color: #333;
`;
const Button = styled.button`
  outline: none;
  font-size: ${props => props.theme.fonts.MD};
  color: ${props => props.theme.colors.brown};
  font-family: "Neucha";
  letter-spacing: 4px;
  margin-right: 30px;
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
const BackButton = styled.button`
  outline: none;
  font-size: ${props => props.theme.fonts.MD};
  color: ${props => props.theme.colors.brown};
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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

export default function SinglePostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(store => store.posts.isLoadingPost);
  const post = useSelector(store => store.posts.post);
  const author = useSelector(store => store.posts.author);
  const user = useSelector(store => store.user.userData);
  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(setPost(null));
  }, [id, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => history.push('/'));
  };
  const handleBackToPage = () => window.history.go(-1);
  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };
  return (
    <>
      <Root>
        {isLoading ? (<LoadMessage>Loading...</LoadMessage>)
          : (
            <>
              <PostTitle>{post && post.title}</PostTitle>
              <CreateInfo>
                <PostUser>
                   Created from
                  {post && author.nickname}
                </PostUser>
                <PostDate>
                   at
                  {post && new Date(post.createdAt).toLocaleString()}
                </PostDate>
              </CreateInfo>
              <Content>{post && post.body}</Content>
              {user && post && user.id === post.userId && (
                <EditContainer>
                  <Button onClick={() => handleDelete(id)}>Delete</Button>
                  <Button onClick={() => handleEdit(id)}>Edit</Button>
                </EditContainer>
              )}
            </>
          )
           }
      </Root>
      {!isLoading && (<BackButton onClick={handleBackToPage}>Back</BackButton>)}
    </>

  );
}
