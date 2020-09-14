## 請簡單解釋什麼是 Single Page Application
特點就是以 Ajax 方法串接 API 取得資料，在交換資料時不需要換頁，所以單一頁面就可以有完整的功能。

與 Single Page Application 相對的通常被稱為 Multi-page Application 也就是比較傳統的網站架構，因為每前交換資料時都要換頁，所以會被稱做「多頁應用程式」。

可以在 SPA 架構下有 MPA 的分頁，也可以在 MPA 的分頁裡 實作 SPA 傳遞資料，或者像是為了解決 SEO 的問題，可以首頁使用 SSR 之後再以 SPA 接手。

## SPA 的優缺點為何
優點：

* 更好的使用者體驗：不用換頁，使用者體驗較佳。
* 前後端分離更明確：對於使用者來說，因為前後端分離更明確，所以就算伺服器當機或是維護中，還是可以進行本地端可以處理的操作，像是開啟離線模式在本地編輯文章並且將草稿先存在 local storage 裡（或直接存成本機檔案），待伺服器上線時再將資料上傳。
* 後端變成了一個單純的 API，可以給不同的前端做調用。

缺點：

* SEO：檢視 SPA 頁面的原始碼，會發現沒有畫面上看到的內容的程式碼，這是因為畫面的渲染是由 JavaScript 動態產生的，這樣會使網站的 SEO 表現很差
* 第一次載入的速度：如果從伺服器抓取的資料比較多的話，第一次載入頁面的速度可能會比較慢。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

透過 PHP 直接輸出內容：

* 運作方式：由 http/https 伺服器接收請求，處理 PHP 程式的部分，取得所需要的資料，最後將它們放入 HTML/CSS/JavaScript 的前端模型裡，所有內容都在伺服器端處理、組裝完成後才將完整的 HTML/CSS/JavaScript 檔案回傳給客戶端。也因為 HTML 檔（包含資料）是在伺服器上組裝完成才回傳給瀏覽器，所以每次載入新資料的時候都需要換頁。


後端提供 API 前端 Ajax 串接：

* 運作方式：前端透過 ajax 去跟後端的 API 互動，後端判斷資料是否正確，並把存到資料庫中，並透過 API 把成功或失敗的 response 回傳給前端，而前端拿到的 response 後，再由 JavaScript 來決定要渲染什麼畫面，所渲染的畫面是透過 JavaScript 操控 DOM 元素而動態產生的

## 參考資料

[前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)
[前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4)

