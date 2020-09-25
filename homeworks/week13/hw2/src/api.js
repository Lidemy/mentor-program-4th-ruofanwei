// eslint-disable-next-line import/no-unresolved
import $ from 'jquery';

// eslint-disable-next-line camelcase
export function getComments(apiUrl, site_key, before, cb) {
  // eslint-disable-next-line camelcase
  let url = `${apiUrl}/api_comments.php?site_key=${site_key}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

// eslint-disable-next-line camelcase
export function addComments(apiUrl, site_key, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,

  // eslint-disable-next-line no-shadow
  }).done((data) => {
    cb(data);
  });
}
