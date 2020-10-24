/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
document
  .querySelector('.container')
  // eslint-disable-next-line func-names
  .addEventListener('click', function (e) {
    const element = e.target.closest('.dropDown');
    if (element) {
      element.classList.toggle('dropDown-hide');
    }
  });

