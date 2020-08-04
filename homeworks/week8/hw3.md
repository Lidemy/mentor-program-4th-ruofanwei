## 什麼是 Ajax？
AJAX 全名 Asynchronous JavaScript And XML
是任何非同步跟伺服器交換資料的javascript的統稱

## 用 Ajax 與我們用表單送出資料的差別在哪？
透過表單傳資料這個方法，server在回傳reponse時，瀏覽器會直接rander出結果。
ajax的這個方法，server在回傳reponse給瀏覽器後，瀏覽器會再回傳給我們。

## JSONP 是什麼？
跨來源請求除了 CORS 以外的另外一種方法，全名叫做：JSON with Padding。
利用<script>裡面放資料，透過指定好的 function 把資料給帶回去。
範例：
```javascript
<script src="https://api.twitch.tv/kraken/games/top?client_id=xxx&callback=receiveData&limit=1"></script>
<script>
  function receiveData (response) {
    console.log(response);
  }
</script>
```
JSONP 的缺點就是要帶的那些參數永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST。

[參考資料](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/) 輕鬆理解 Ajax 與跨來源請求

## 要如何存取跨網域的 API？
讓server端加上access-control-allow-origin到header。
access-control-allow-origin: *
*代表所有的origin都可以存取

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是使用node.js透過作業系統發request到server，可以直接拿到server的reponse。
這一週使用瀏覽器上的js透過瀏覽器，瀏覽器再透過作業系統發request到server，server會透過瀏覽器回傳reponse。
用 node.js 呼叫 API 與在網頁上呼叫的根本差異在於用node.js沒有人限制你，而且沒有加的東西就不會傳到server; 透過瀏覽器的話會被瀏覽器限制，而且瀏覽器可能會幫你加一些東西，像是瀏覽器的版本還有額外資訊，server端收到的request就會有額外資訊。
