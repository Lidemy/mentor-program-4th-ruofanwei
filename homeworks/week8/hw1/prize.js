/* eslint-disable no-use-before-define */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const request = new XMLHttpRequest();

// 拿到api資料
request.open('GET', apiUrl, true);
// eslint-disable-next-line func-names
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const json = JSON.parse(response);

    // 選取按鈕
    document.querySelector('.surprise').addEventListener('click', (e) => clickBtn(e, json));

    // eslint-disable-next-line no-inner-declarations
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line no-inner-declarations
    // eslint-disable-next-line no-shadow
    // eslint-disable-next-line no-inner-declarations
    function clickBtn(e, json) {
      const prizes = {
        FIRST: {
          className: 'first-prize',
          title: '恭喜你中頭獎了！日本東京來回雙人遊！',
        },
        SECOND: {
          className: 'second-prize',
          title: '二獎！90 吋電視一台！',
        },
        THIRD: {
          className: 'third-prize',
          title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
        },
        NONE: {
          className: 'none-prize',
          title: '🌚 銘 謝 惠 顧 🌝',
        },
      };
      if (!json.prize) {
        // eslint-disable-next-line no-alert
        alert('系統不穩定，請再試一次');
        window.location.reload();
      }
      const {
        className,
        title,
      } = prizes[json.prize];
      document.querySelector('section').classList.add(className);
      document.querySelector('.prize-title').innerText = title;
      document.querySelector('.content').classList.add('hide');
      document.querySelector('.prize-result').classList.remove('hide');
    }
  } else {
    // eslint-disable-next-line no-alert
    alert('系統不穩定，請再試一次');
    window.location.reload();
  }
};
// eslint-disable-next-line func-names
request.onerror = function () {
  // eslint-disable-next-line no-alert
  alert('系統不穩定，請再試一次');
  window.location.reload();
};

request.send();
