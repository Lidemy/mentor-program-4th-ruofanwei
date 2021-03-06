/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
const url = 'https://api.twitch.tv/kraken';


const html = `<div class="box">
        <div class="picture">
        <img src="$preview">
        </div>

        <div class="bottom">
          <div class="gamer">
          <img src="$logo">
          </div>
          <div class="name">
            <h3>$title</h3>
            <p>$channel</p>
          </div>
        </div>
      </div>
      `;
// 取得遊戲資訊
function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${url}/games/top?limit=5`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'br15dzlr0ukquy97xhv00y3i9r9g4x');

  // eslint-disable-next-line func-names
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  request.send();
}
// 取得實況頻道資訊
function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${url}/streams?game=${encodeURIComponent(name)}&limit=20`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'br15dzlr0ukquy97xhv00y3i9r9g4x');

  // eslint-disable-next-line func-names
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  request.send();
}
// 抓取前五名的遊戲名稱
getGames((games) => {
  // 取得遊戲名稱資料
  const topGames = games.top.map(game => game.game.name);
  // 把值一個個取出
  for (const game of topGames) {
    const element = document.querySelector('.submenu-item');
    // innerHTML 覆蓋原本的內容
    element.innerHTML = game;
    // 透過appendChild將element加入至submenu
    document.querySelector('.submenu').appendChild(element);
  }
  // 取得實況資料
  getStreams(topGames[0], (data) => {
    appendStreams(data.streams);
    addPlaceholder();
  });
});
// 選單操作 - 切換頻道
document.querySelector('.drop-down').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'a') {
    // 取得點擊時標籤內的字
    const text = e.target.innerText;
    // 使用innerHTML 讓text覆蓋原本的內容
    document.querySelector('.game-title').innerText = text;
    // 讓實況列表資料清空
    document.querySelector('.content').innerHTML = '';
    // 取得點擊到的遊戲的實況資料
    getStreams(text, (data) => {
      appendStreams(data.streams);
    });
  }
});

function addPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.classList.add('stream-empty');
  document.querySelector('.content').appendChild(placeholder);
}

function appendStreams(streams) {
  // 把實況的資料一個個顯示出來
  streams.forEach((stream) => {
    // create a new div element
    // and give it some content
    const element = document.createElement('div');
    const content = html
    // 把實況的資料用replace()替換到 html 內
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$channel', stream.channel.name);
      // 透過 appendChild 將 element 加入至 .content
    document.querySelector('.content').appendChild(element);
    // 用新的 content 取代 原本的內容
    element.outerHTML = content;
  });
}
