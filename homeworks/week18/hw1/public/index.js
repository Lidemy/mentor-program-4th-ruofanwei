/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  function error(err) {
    alert('系統不穩定，請再試一次');
    console.log(err);
    window.location.reload(true);
  }

function hide() {
    document.querySelector('.content').classList.add('hide');
    
    document.querySelector('.again').classList.remove('hide');
  }

   function render(prize) {
    const background = document.querySelector('body');
    const prizeName = document.querySelector('.getName');
    const prizeContent = document.querySelector('.getContent');
    background.style.background = `url(${prize.img}) center / cover no-repeat`;
    hide();

    prizeName.innerText = prize.name;
    prizeContent.innerText = prize.content;
  }

  function getAPI() {
    return fetch('/getPrize', {
      method: 'GET',

    })
      .then(res => res.json())
      .then(data => render(data))
      .catch(err => error(err));
  }

  function reload() {
    window.location.reload(true);
  }
  document.querySelector('.surprise').addEventListener('click', getAPI);
  document.querySelector('.reload').addEventListener('click', reload);
}