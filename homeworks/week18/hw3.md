## 什麼是反向代理（Reverse proxy）？

Client 端發送請求到 Reverse proxy server ，然後 Reverse proxy server 根據請求或是流量配置，將請求導向想對應的 Server。

好處是可以分配不同服務到不同 port，用戶不需要輸入各種 port 來取得不同服務，也可以把內部使用的 port 資訊隱藏起來。


## 什麼是 ORM？
操作資料庫的一種方式，全名為 Object Relational Mapping。
不需要手動寫入 SQL 語法，例如說：node.js 有 Sequelize。
好處是我們比較不須擔心自己撰寫的 SQL 語法存在安全性漏洞，可以放心交給 ORM 處理，像是 Sequelize 會自動使用 prepare statement 功能來操作資料庫，能夠避免 SQL 注入的風險。

## 什麼是 N+1 problem？

是一個可能存在於 ORM 的效能問題。

當查詢的條件，像是 where 或是一對多的關聯這種查詢時，返回的條件可能是多個結果，可以預期接收的到型態是 Array 或是 Collect，當我們再對得到的 Collect 做遍歷，取得關連資料時，ORM 會對應每次的關連查詢下一次條件，也就是說當使用者有十筆訂單，查出使用者的十筆訂單後，想接著取得訂單商品的資訊，若我們直接遍歷查詢訂單商品，就會產生十筆查詢訂單商品的 Query。

呼叫SQL很花時間成本，改進的方法就是減少呼叫SQL

includes可以解決N+1 query的問題


[參考資料](https://ithelp.ithome.com.tw/articles/10224842?sc=rss.iron)