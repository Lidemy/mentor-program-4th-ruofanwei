## 什麼是 DNS？
DNS是網域名稱系統，將可讀取的網域名稱 (例如，www.amazon.com) 轉換為機器可讀取的 IP 地址 (例如，192.0.2.44)。

## Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
提供 Public DNS 對 Google 最主要的好處是它可以知道哪些網頁最常被造訪、哪些網頁被造訪幾次，也就是可以搜集相關數據。
對一般大眾的好處第一是比較快速且安全，第二則是可以有其他選擇，如果現在用的 DNS 壞了還可以用 Google 的。

[參考資料](https://aws.amazon.com/tw/route53/what-is-dns/)

## 什麼是資料庫的 lock？為什麼我們需要 lock？
>模擬一個在購物網站搶購的情況。如果有很多人一起去搶購，同時執行怎麼辦？

這種情況就叫做 race condition，意思就是有兩個或以上同時在存取資個資料的時候會發生的問題-超賣。

這種時候，需要加上一個 lock，而這個 lock 只有 transaction 可以使用。

* 只需要在指令後面加上 for update 。
  就可以鎖定資料，讓資料後續接收資料之後，才可以繼續接收其他資料。

* 這時候只能接收一筆資料。但這樣做會有效能上面的耗損。

* 假如有指定 where id = 1 就會只把那個 row 給鎖定起來。
  但如果沒有的話，就會把整個 table 被鎖定。

```php
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("SELECT amount from products where id = 1 for update");
$conn->commit();
```


## NoSQL 跟 SQL 的差別在哪裡？
SQL 是一個拿來查詢資料庫的語言，並不是一個資料庫系統，MySQL 才是。

* 任何一種以 SQL 為基礎的資料庫系統，都有差不多的特性

* 例如:
  必須事先定義好 Schema，可以想成是資料庫的規格書。
  就是資料庫裡面要有哪些欄位、每一個欄位的資料型態是什麼。

#### NoSQL特性

1. 沒有 Schema，可以想像成存 JSON 資料進 DB
   (Schema 就是結構，也就是 table 看起來的模樣，有 id 名稱 型態等資訊)
   好處是比較彈性，可是相對的在查詢資料的時候速度也會比較慢一點。
2. 用 key-value 來存
3. 不支援 JOIN
4. 通常用來存一些結構不固定的資料（log 之類的）

>如果把資料存在 NoSQL 的資料庫裡面，可能就會長這樣：

```
{
  id: 1,
  author: 'huli',
  content: '大家好',
  create_time: 12345,
  comments: [
    {
      id: 1,
      content: 'comment 1',
      create_time: ...
    }, {
      id: 2,
      content: 'comment2',
      create_time: ...
  }
  ]
}
```
NoSQL 最適合的一點是 搜集數據。

* 例如說現在很多手機 App 其實會偷偷搜集你的資料傳回去
  做一些數據分析之類的。

* 可能會搜集：手機廠牌、型號、作業系統版本、安裝過的 App 等等的。

SQL 跟 NoSQL 並不是互斥的概念，可以在你的系統裡面用 SQL 類的資料庫系統儲存文章、評論，同時也用 NoSQL 類的資料庫來搜集使用者資訊。

[參考資料](https://ithelp.ithome.com.tw/articles/10187443)


## 資料庫的 ACID 是什麼？

* 在資料庫的交易中，為確保交易(Transaction)是正確可靠的，所以必須具備四個特性

1. Atomicity (原子性）
   * 資料操作不能只有部分完成。
     一次的 transaction 只能有兩種結果：成功或失敗
   
2. Consistency (一致性）
   * transaction 完成前後，資料都必須永遠符合 schema 的規範
     保持資料與資料庫的一致性
     
3. Isolation (隔離性）
   * 資料庫允許多個 transactions 同時對其資料進行操作
     但也同時確保這些 transaction 的交叉執行
     不會導致數據的不一致

4. Durability (持續性）
   * transaction 完成後，對資料的操作就是永久的
     即便系統故障也不會丟失

[參考資料](https://medium.com/@totoroLiu/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8)