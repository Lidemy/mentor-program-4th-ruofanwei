## 什麼是 DOM？
Dom簡單來說就是 javascript跟html/瀏覽器之間的橋樑，瀏覽器提供了這個橋樑(Dom)，讓我們去改變畫面。
DOM API 定義了讓 JavaScript 可以存取、改變 HTML 架構、樣式和內容的方法，甚至是對節點綁定的事件。
JavaScript 透過 DOM 提供的 API 來 對 HTML 做存取與操作。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件冒泡指的是「從啟動事件的元素節點開始，逐層往上傳遞」，直到整個網頁的根節點，也就是 document。

舉例
```html
<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
</head>
<body>

  <div>CLICK</div>

</body>
</html>
```
「事件冒泡」的機制下，觸發事件的順序會是：
1. <div>CLICK</div>
2. <body>
3. <html>
4. document

![](https://i.imgur.com/3cUoKz9.png)

>[圖片來源](http://www.java2s.com/Book/JavaScript/DOM/Event_Flow_capture_target_and_bubbling.htm) Event Flow: capture, target, and bubbling

「事件冒泡」機制是由下往上來傳遞， 「事件捕獲」(Event Capturing) 機制則正好相反。

#### 舉例
```html
<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
</head>
<body>

  <div>CLICK</div>

</body>
</html>
```
「事件捕獲」的機制下，觸發事件的順序會是：
1. document
2. <html>
3. <body>
4. <div>CLICK</div>

![](https://i.imgur.com/FAE4nda.png)

>[圖片來源](http://www.java2s.com/Book/JavaScript/DOM/Event_Flow_capture_target_and_bubbling.htm) Event Flow: capture, target, and bubbling

### 事件是依賴哪種機制執行的？

兩種都會執行。

![](https://i.imgur.com/AruGovr.png)

>[圖片來源](https://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-phases) Document Object Model Events


## 什麼是 event delegation，為什麼我們需要它？

比較有效率 不用浪費很多function監聽每一個事件，可以處理動態新增。

#### 舉例
```html 
<ul id="myList">
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
</ul>
```
分別為 myList 的 li 綁定 click 事件，就要使用 for 迴圈來一個個綁定：

```javascript
// 取得容器
var myList = document.getElementById('myList');

// 分別為 li 綁定事件
if( myList.hasChildNodes() ) {
  for (var i = 0; i < myList.childNodes.length; i++) {

    // nodeType === 1 代表為實體 HTML 元素
    if( myList.childNodes[i].nodeType === 1 ){
      myList.childNodes[i].addEventListener('click', function(){
       console.log(this.textContent);
      }, false);
    }

  }
}
```
若是再新增元素至 myList：
```javascript
// 取得容器
var myList = document.getElementById('myList');

// 分別為 li 綁定事件
if( myList.hasChildNodes() ) {
  for (var i = 0; i < myList.childNodes.length; i++) {

    // nodeType === 1 代表為實體 HTML 元素
    if( myList.childNodes[i].nodeType === 1 ){
      myList.childNodes[i].addEventListener('click', function(){
       console.log(this.textContent);
      }, false);
    }

  }
}

// 建立新的 <li> 元素
var newList = document.createElement('li');

// 建立 textNode 文字節點
var textNode = document.createTextNode("Hello world!");

// 透過 appendChild 將 textNode 加入至 newList
newList.appendChild(textNode);

// 透過 appendChild 將 newList 加入至 myList
myList.appendChild(newList);
```
後來才新增的 newList 節點並不會有 click 事件。
解決方法
### event delegation 事件代理
```javascript
// 取得容器
var myList = document.getElementById('myList');

// 改讓外層 myList 來監聽 click 事件
myList.addEventListener('click', function(e){

  // 判斷目標元素若是 li 則執行 console.log
  if( e.target.tagName.toLowerCase() === 'li' ){
    console.log(e.target.textContent);
  }

}, false);


// 建立新的 <li> 元素
var newList = document.createElement('li');

// 建立 textNode 文字節點
var textNode = document.createTextNode("Hello world!");

// 透過 appendChild 將 textNode 加入至 newList
newList.appendChild(textNode);

// 透過 appendChild 將 newList 加入至 myList
myList.appendChild(newList);
```


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

e.preventDefault與e.stopPropagation的差別在前者就只是取消預設行為，跟事件傳遞沒有任何關係，後者則是讓事件不再往下傳遞。

### 阻擋預設行為 event.preventDefault()

#### 舉例
```html 
<a id="link" href="https://www.google.com">Google</a>
```
假設今天點擊這個 link 時，希望瀏覽器執行 `console.log('Google!')`

```javascript
var link = document.querySelector('#link');

link.addEventListener('click', function (e) {
  console.log('Google!');
}, false);
```

點擊這個 link 的時候，瀏覽器依然會帶去 google 的網頁。
這時候就可以利用「事件物件」 event 提供的 `event.preventDefault() `方法：
```javascript
var link = document.querySelector('#link');

// 在 evend handler 加上 e.preventDefault();
link.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Google!');
}, false);
```
再試著點擊 link 一次，會發現瀏覽器預設的跳轉頁面的行為不見了， `console.log('Google!')`; 也可順利執行。
`event.preventDefault()` 並不會阻止事件向上傳遞 (事件冒泡)。

### 阻擋事件冒泡傳遞 event.stopPropagation()

#### 舉例

```html 
<label for="xxx">Label2</label>
  <input type="checkbox" name="chkbox" id="xxx">
```
分別為 label 與 checkbox 註冊 click 事件來實驗：
```javascript
// label
var lbl = document.querySelector('.lbl');
// chkbox
var chkbox = document.querySelector('#chkbox');

lbl.addEventListener('click', function (e) {
  console.log('lbl click');
}, false);

chkbox.addEventListener('click', function (e) {
  console.log('chkbox click');
}, false);
```
`console.log('lbl click')`; 執行了兩次
```javascript
"lbl click"
"chkbox click"
"lbl click"
```
因為在 label 標籤包覆 checkbox 的情況下，我們去點擊了 label 觸發 click 事件，
此時瀏覽器會自動把這個 click 事件帶給 checkbox。

checkbox 受到事件冒泡的影響，又會再度把 click 事件傳遞至 label 上，
導致 "lbl click" 出現了兩次。

修正 label 的 click 觸發兩次的錯誤行為時，可以這樣做：

```javascript
// label
var lbl = document.querySelector('.lbl');
// chkbox
var chkbox = document.querySelector('#chkbox');

lbl.addEventListener('click', function (e) {
  console.log('lbl click');
}, false);

// 阻擋 chkbox 的事件冒泡
chkbox.addEventListener('click', function (e) {
  e.stopPropagation();
}, false);
```