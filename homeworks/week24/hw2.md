## Redux middleware 是什麼？
Redux Middleware 可以在 Action 被指派後，進到 Reducer 前，去進行額外的處理，例如呼叫 API。
![](https://i.imgur.com/U5ux2n7.png)
透過 Middleware 我們可以延遲、記錄（log）、調整或停止 action。
Redux 中並沒有限制 Middleware 的數量，因此我們可以有很多個 middleware，每個 middleware 會檢查這是不是自己需要處理的 action，如果不是就會傳給下一個 middleware 繼續處理。

>[參考資料](https://pjchender.github.io/2018/09/20/redux-redux-middleware/)

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
* SSR(Server Side Rendering):在伺服器先渲染好「初始」的畫面，再以response形式傳給使用者的畫面做渲染。
* CSR(Client Side Rendering):客戶端渲染，react原生的範例就是CSR。

![](https://i.imgur.com/7j19Ev4.png)
兩者最主要的差別在於第一次瀏覽器跟網站做請求時，SSR會給已經渲染好的html字串作為response丟給瀏覽器，而CSR必須等待請求 JS 檔案，然後再等待 React 把元件 mount 到 DOM上，以及請求 API 還會花費額外的時間。

* 為什麼我們需要 SSR？
網頁的內容都會在伺服器端處理，爬蟲看到的即是包含完整內容的 HTML，便有利於進行 SEO。同時也有助於減少使用者從請求網頁到看見網頁內容時間，提升使用者體驗 (UX)。

>[參考資料](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)

## React 提供了哪些原生的方法讓你實作 SSR？

* SSR : 當使用者進入某個 URL 時，會跟渲染伺服器請求 HTML，渲染伺服器會將 HTML 以字串的形式回傳給使用者，瀏覽器會解析 HTML 字串並顯示內容。

1. 先關注如何將一個 React Component 轉成字串。
![](https://i.imgur.com/lqibshR.png)

### renderToString()
將一個 React element render 至其初始的 HTML。React 將會回傳一個 HTML string。可以使用這個方法在伺服器端產生 HTML，並在初次請求時傳遞 markup，以加快頁面載入速度，並讓搜尋引擎爬取你的頁面以達到 SEO 最佳化的效果。

### renderToStaticMarkup()
適合用在轉譯靜態頁面。

#### SSR 流程
1. 伺服器將 React App 透過 ReactDOM.renderToString() 產生 HTML 樣版。
2. 把產生好的 HTML 樣版丟到使用者的瀏覽器。
3. 瀏覽器轉譯此 HTML 樣版，並下載給 client 使用的 bundle.js 檔。
4. 瀏覽器載入並執行 bundle.js 檔案。
5. 在相同的 div 中，手動再次轉譯 React App。
6. React 會在瀏覽器轉譯 App，並比較新的 HTML 和原本的 HTML 樣版有何差異。
7. React 取代原本的伺服器所轉譯的樣版，綁定相關的事件處理器。

![](https://i.imgur.com/2aXjvq5.png)

>[參考資料](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)

>[參考資料](https://pjchender.github.io/2018/09/21/react-ssr-%E7%AD%86%E8%A8%98/)


## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

### nextJS
Next.js 是 React 的 SSR 框架。
1. 檔案架構即 Routing
Next.js 最大的特色之一，Next.js 會將在 page 這個資料夾下的檔案自動做 routing
2. 支援 SSG 與 SSR
3. Data Fetching
Next.js 提供許多不同種抓資料的方式。

>[參考資料](https://ithelp.ithome.com.tw/articles/10245758)

### Egg + React + SSR boilerplate

>[參考資料](https://github.com/ykfe/egg-react-ssr)





