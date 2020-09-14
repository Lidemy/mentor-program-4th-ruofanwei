/* eslint-disable camelcase */
/* eslint-disable prefer-template */
// eslint-disable-next-line import/no-unresolved
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDOM } from './utils';
// eslint-disable-next-line import/extensions
import { cssTemplate, getLoadMoreButton, getForm } from './templates.js';


// 初始化
// eslint-disable-next-line import/prefer-default-export
export function init(options) {
  let site_key = '';
  let apiUrl = '';
  let containerElement = null;
  let commentDOM = null;

  let lastId = null;
  let isEnd = false;
  let loadMoreClassName;
  let commentsClassName;
  let formClassName;
  let formSelector;

  // eslint-disable-next-line prefer-destructuring
  site_key = options.site_key;
  // eslint-disable-next-line prefer-destructuring
  apiUrl = options.apiUrl;
  // eslint-disable-next-line prefer-const
  loadMoreClassName = `${site_key}-loadMore`;
  // eslint-disable-next-line prefer-const
  commentsClassName = `${site_key}-comments`;
  // eslint-disable-next-line prefer-const
  formClassName = `${site_key}-add-comment-form`;
  // eslint-disable-next-line prefer-const
  formSelector = '.' + formClassName;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName));
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);

  function getNewComments() {
    const commentsDOM = $('.' + commentsClassName);
    $('.' + loadMoreClassName).hide();
    if (isEnd) {
      return;
    }
    getComments(apiUrl, site_key, lastId, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      // eslint-disable-next-line no-restricted-syntax
      for (const comment of comments) {
        appendCommentToDOM(commentsDOM, comment);
      }
      const { length } = comments;
      if (length === 0) {
        isEnd = true;
        $('.' + loadMoreClassName).hide();
      } else {
        lastId = comments[length - 1].id;
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName);
        $('.' + commentsClassName).append(loadMoreButtonHTML);
      }
    });
  }
  // eslint-disable-next-line no-multiple-empty-lines



  commentDOM = $('.' + commentsClassName);
  getNewComments();
  $('.' + commentsClassName).on('click', '.' + loadMoreClassName, () => {
    getNewComments();
  });
  $('.' + formClassName).submit((e) => {
    e.preventDefault();
    const nickNameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key,
      nickname: nickNameDOM.val(),
      content: contentDOM.val(),

    };

    addComments(apiUrl, site_key, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nickNameDOM.val('');
      contentDOM.val('');
      appendCommentToDOM(commentDOM, newCommentData, true);
    });
  });
}
