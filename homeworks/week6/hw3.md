## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <canvas> 透過 JavaScript 實現繪圖功能，甚至是動畫、遊戲
2. <figcaption> 圖片說明文字
3. <blockquote> 表示引用自其他內容

>[參考資料](https://www.happycoding.today/posts/27) HTML語法整理! 3分鐘快速弄懂常用語法！

## 請問什麼是盒模型（box modal）
Box Model描述了 padding、margin、border 與 content 的空間定位。

![](https://i.imgur.com/WUp73Gn.png)

>[圖片來源](https://www.internetingishard.com/html-and-css/css-box-model/) css box model

>[參考資料](https://jaceju.net/css-box-model/) CSS 排版觀念：Box Model

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
#### inline
* 不能更改元素的height，width的值，大小由內容撐開
* 可以使用padding上下左右都有效，margin只有left和right產生邊距效果，但是top和bottom就不行

#### block
* 預設寬度為容器的 100%
* 可以透過 width 與 height 屬性調整寬高
* 強迫換行，呈現垂直排列
* 可以設置padding，margin的各個屬性值，top，left，bottom，right都能夠產生邊距效果

![](https://i.imgur.com/HwScwCW.png)

#### inline-block
* inline-block 把inline的優點還有block的優點集合
* 可以透過 width 與 height 屬性調整寬高
* 呈現水平排列
* 在無設定 width 與 height 時，寬高由內容決定

>[圖片來源](https://www.internetingishard.com/html-and-css/css-box-model/) css box model

>[參考資料](https://ithelp.ithome.com.tw/articles/10219161) CSS : display屬性-區塊和行內元素差異

>[參考資料](https://www.twblogs.net/a/5d140ea1bd9eee1e5c8258bc) display:inline-block不獨佔一行的塊級元素

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
position 的屬性值有 static、relative、absolute、fixed 與 sticky。
能定位、控制物件在畫面當中依據誰來做對齊、排列
* stactic 網頁預設的定位方式
* relative 相對定位，不會影響到其他元素，定位原點是元素本身所在位置 
* absolute 定位點是往上找第一個 position 不是 static 的元素
* fixed 固定定位
* sticky為相對定位(relative)和固定定位(fixed)的混合體

![](https://i.imgur.com/N8FKhqx.png)
![](https://i.imgur.com/HWan0KK.png)


>[圖片來源](https://www.internetingishard.com/html-and-css/css-box-model/) hello, css

>[參考資料](https://www.internetingishard.com/html-and-css/hello-css/) hello, css

