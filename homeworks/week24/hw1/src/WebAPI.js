import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPaginatePosts = page => fetch(`${BASE_URL}/posts?_page=${page}&_limit=5&_sort=id&_order=desc`).then(res => res);

export const getPosts = () => fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then(res => res.json());
export const getSinglePost = id => fetch(`${BASE_URL}/posts?id=${id}`).then(res => res.json());
export const releaseNewPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then(res => res.json());
};
export const login = (username, password) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
})
  .then(res => res.json());

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json());
};

export const register = (nickname, username, password) => fetch(`${BASE_URL}/register`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    nickname,
    username,
    password,
  }),
})
  .then(res => res.json());
export const deletePost = id => fetch(`${BASE_URL}/posts/${id}`, {
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
}).then(res => res.json());

export const editPost = (title, body, id) => fetch(`${BASE_URL}/posts/${id}`, {
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    title,
    body,
    id,
  }),
}).then(res => res.json());
