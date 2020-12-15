const TOKEN_NAME = 'token';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};
export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);
export const createPaginate = (totalPages) => {
  const pages = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};
