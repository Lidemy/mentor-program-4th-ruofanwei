## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個可以幫我們 「模組化」及「打包」的工具，透過模組化方式，方便組織與管理，再透過 Webpack 解析，把這些小模組組合起來，打包成單一檔案。

webpack 好用的地方在於，它把模組的概念從 JavaScript 向外延伸，不論是 CSS、SASS、圖片都可以被視為一個資源模組，可以透過不同的 loader 把各種資源載入到 Webpack 打包成一個 JavaScript 檔案。

適合用在大型的專案。因為大型的專案需要管理眾多不同類型的檔案，使用起來相對有感。

![](https://i.imgur.com/Q7Yt0Y0.png)

用 webpack 的時候必須提供一個 webpack.config.js 的檔案，裡面寫好他的配置。

## gulp 跟 webpack 有什麼不一樣？
Gulp 是一套 task manager，重點是任務和流程管理，它的 task 可以有很多種，例如：轉換scss、壓縮css、js

webpack 是打包工具，目的是為了要讓瀏覽器能夠支援 module，把那些互相依賴的模組串接再一起，最後打包合併為一個瀏覽器可識別的 JavaScript 文件。


## CSS Selector 權重的計算方式為何？

1. !important
2. inline style (html 文件中定義的 style)
3. ID選擇器
4. class和偽類選擇器(:hover,:focus)
5. 元素和偽元素(:before 與 :after)
6. 標籤