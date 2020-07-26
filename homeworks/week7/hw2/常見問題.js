/* eslint-disable prefer-arrow-callback */
document
  .querySelector('.faq')
  // eslint-disable-next-line func-names
  .addEventListener('click', function (e) {
    const element = e.target.closest('.dropDown');
    if (element) {
      element.classList.toggle('dropDown-hide');
    }
  });
