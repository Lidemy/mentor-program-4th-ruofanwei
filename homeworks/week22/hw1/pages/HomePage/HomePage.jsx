/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPosts } from '../../WebAPI';

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
`;
const PageLink = styled.a`
  font-family: 'Neucha';
  font-weight:bold;
   &:hover{
     background: ${props => props.theme.colors.brightYellow};
     border-color: ${props => props.theme.colors.brightYellow};
   }
`;
const PageUl = styled.ul`
  display: flex;
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
`;
const PostTitle = styled(Link)`
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
  color: ${props => props.theme.colors.darkBlue};
  font-family: 'Neucha';
  letter-spacing: 2px;
  font-weight: bold;
  font-size: ${props => props.theme.fonts.SM};
`;
const LoadMessage = styled.h1`
  border: 1px dash ${props => props.theme.colors.darkGrey};
  border-radius: 10px;
  font-family: 'Neucha';
  font-size: 30px;
  margin-top: 40px;
  color: ${props => props.theme.colors.darkBlue};
  letter-spacing: 2px;
  font-weight: bold;
  padding: 16px;
  text-align:center;
  background: ${props => props.theme.colors.darkWhite};
  margin-bottom: 30px;
  box-shadow: 0 0 4px ${props => props.theme.colors.darkGrey};
`;
function Post({ posts }) {
  return (
    <PostWrapper>
      {posts.map(post => (
        <List key={post.id}>
          <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </List>
      ))}
    </PostWrapper>
  );
}
function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Wrapper>
      <PageUl>
        {pageNumbers.map(number => (
          <PageList key={number} className="page-item">
            <PageLink onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </PageLink>
          </PageList>
        ))}
      </PageUl>
    </Wrapper>
  );
}
Post.propTypes = {
  post: PropTypes.object,
};
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    setLoading(true);
    getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);
  return (
    <Root>
      {loading ? (<LoadMessage>loading...</LoadMessage>)
        : <Post posts={currentPosts} loading={loading} />
       }
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Root>
  );
}
