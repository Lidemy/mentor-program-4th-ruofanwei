/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
import { createSlice } from '@reduxjs/toolkit';
import {
  getSinglePost,
  releaseNewPost,
  getPaginatePosts,
  editPost as editPostAPI,
  deletePost as deletePostAPI,
} from '../../WebAPI';
import { createPaginate } from '../../utils';

export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    post: null,
    author: null,
    errorMessage: null,
    newPostResponse: null,
    posts: [],
    paginate: [],
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setPaginate: (state, action) => {
      state.paginate = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setPost,
  setNewPostResponse,
  setErrorMessage,
  setPosts,
  setAuthor,
  setPaginate,
} = postReducer.actions;


export const getPost = id => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return getSinglePost(id).then((post) => {
    dispatch(setPost(post[0]));
    dispatch(setAuthor(post[0].user));
    dispatch(setIsLoadingPost(false));
    return post[0];
  });
};

export const newPost = (title, content) => dispatch => releaseNewPost(title, content).then((res) => {
  if (res.ok === 0) {
    dispatch(setErrorMessage(res.message));
    return;
  }
  return res;
});

export const getPosts = page => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPaginatePosts(page)
    .then((res) => {
      const cloneResponse = res.clone();
      const totalPages = Math.ceil(
        cloneResponse.headers.get('x-total-count') / 5,
      );
      dispatch(setPaginate(createPaginate(totalPages)));
      return res.json();
    })
    .then((posts) => {
      dispatch(setPosts(posts));
      dispatch(setIsLoadingPost(false));
    });
};

export const deletePost = id => dispatch => deletePostAPI(id).then(res => res);

export const editPost = (title, content, id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  return editPostAPI(title, content, id).then((res) => {
    if (res.ok === 0) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setIsLoadingPost(false));
    return res;
  });
};
export default postReducer.reducer;
