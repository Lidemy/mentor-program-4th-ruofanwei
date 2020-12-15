/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/reducers/postReducer';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const PostWrapper = styled.div`
  margin-top: 40px;
`;
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 90%;
  transform: translate(-50%);
`;
const PageList = styled.li`
  list-style-type: none;
  cursor: pointer;
`;
const PageLink = styled.a`
  font-family: "Neucha";
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.brightYellow};
    border-color: ${props => props.theme.colors.brightYellow};
  }
`;
const PageUl = styled.ul`
  display: flex;
  cursor: pointer;
`;
const List = styled.ul`
  border: 1px dash ${props => props.theme.colors.darkGrey};
  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: ${props => props.theme.colors.darkWhite};
  margin-bottom: 30px;
  box-shadow: 0 0 4px ${props => props.theme.colors.darkGrey};
  cursor: pointer;
`;
const PostTitle = styled(Link)`
  font-size: ${props => props.theme.fonts.LG};
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  font-family: "Neucha";
  letter-spacing: 4px;
  font-weight: bold;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.brown};
  }
`;
const PostDate = styled.div`
  color: ${props => props.theme.colors.darkBlue};
  font-family: "Neucha";
  letter-spacing: 2px;
  font-weight: bold;
  width: 20%;
  font-size: ${props => props.theme.fonts.SM};
`;
const LoadMessage = styled.h1`
  border: 1px dash ${props => props.theme.colors.darkGrey};
  border-radius: 10px;
  font-family: "Neucha";
  font-size: 30px;
  margin-top: 40px;
  color: ${props => props.theme.colors.darkBlue};
  letter-spacing: 7px;
  font-weight: bold;
  padding: 16px;
  text-align: center;
  background: ${props => props.theme.colors.darkWhite};
  margin-bottom: 30px;
  box-shadow: 0 0 4px ${props => props.theme.colors.darkGrey};
  
`;

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.posts.isLoadingPost);
  const posts = useSelector(store => store.posts.posts);
  const paginate = useSelector(store => store.posts.paginate);
  useEffect(() => dispatch(getPosts(1)), [dispatch]);
  const handlePaginate = page => dispatch(getPosts(page));
  return (
    <Root>
      {isLoading ? (<LoadMessage>loading...</LoadMessage>)
        : (
          <PostWrapper>
            {posts && posts.map(post => (
              <List key={post.id}>
                <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
                <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
              </List>
            ))}
          </PostWrapper>
        )
       }
      <Wrapper>
        <PageUl>
          {posts && paginate.map(page => (
            <PageList key={page} className="page-item">
              <PageLink onClick={() => handlePaginate(page)} className="page-link">
                {page}
              </PageLink>
            </PageList>
          ))}
        </PageUl>
      </Wrapper>
    </Root>
  );
}
