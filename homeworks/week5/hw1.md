## 前四週心得與解題心得
第一週（06/12 ~ 06/21）：command line 的操作、關於電腦的基礎，還有git
在課程正式開始前已經先預習了第一週的課程，並且調整好自己的作息。剛開始學習第一週時因為覺得自己大致上有概念了，因此很快地進入寫作業與交作業，交作業的方式是要上傳到github這點對我說非常幫助到複習，並且會在寫作業前先謹慎的確認自己在branch上。
但交了作業，看到同學留言才發現自己太大意了，把作業上傳到錯誤的位置，重新上傳後也因為粗心在github產生衝突。從改作業中發現了很多自己不熟悉的指令，也意識到要更細心才對。第一週作業最讓我印象深刻是shell script的學習，因為之前完全沒有接觸過，在自己上網找資料學習的過程花了很多時間，後來是和同學討論後才發現，一開始自己找資料的方向錯誤。後來也重新整理了command line與git的筆記，把自己忽略卻很好用的指令記錄起來。
``` bash
🌝 git push <remote_name> --delete <branch_name> #刪除上傳到遠端的分支
```
這個指令拯救了我先前上傳到錯誤的位置，因此超級印象深刻
``` bash
🌝 git push --force-with-lease origin <branch_name>  ＃強制推到遠端
```
解決衝突時，用了這個指令才把本地的資料推到遠端，覺得好用！
``` bash
🌝 git reflog  #追蹤變更軌跡 
```
按q即可退出
會覺得這個很好用是因為第一週在修正錯誤時試了很多指令，意外發現這個好用
``` bash
🌝 git reset SHA1 --hard  #Reset 回到先前那個 Commit 的 SHA1 狀態
```
![](https://i.imgur.com/bIUIwzY.png)
第二週（06/22 ~ 06/28）：JavaScript 的介紹和一些實作
接下來兩週重心放在學習基礎語法外還有學習程式思維，在報名課程前先在codewar試著自己闖關，但因為那時很多基礎語法都不熟悉，因此需要一直上網找資料，才解得出來。正式進入這週後用老師教的方法，練習一行一行的去說出現在程式在做什麼，遇到卡關時就用debugger來觀察哪裡出了問題。從一開始只能邊放課程影片邊練習跟著老師寫基礎題目，到漸漸能試著自己解基礎的題目，雖然成長的很慢，但回顧一開始寫codewar完全摸不著頭緒的我，著實有了一小步的進步。這週也透過作業學習到回傳和迴圈這兩個語法的重點。
``` 
🌝 一旦函式回傳後就會停止執行。
```
``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])

```
用一行一行解釋程式在做什麼的方式來說明
從下方資訊可以得知在最後才有回傳的這個動作，並且回傳後就停止執行了。
``` 
🌝 上面的程式為例，會在第一個for迴圈跑完之後才接續跑下面一個for迴圈
```
引用助教教我的譬喻來解說
第一個for迴圈就一台空淨清淨器，而第二台for迴圈是另外一台空淨清淨器，空氣會先全部通過第一台空淨清淨器過濾，接著才會到第二台空氣清淨器進行第二次的過濾。
```markdown
1. 執行第 1 行，設定變數 i 是 0，檢查 i 是否 <= arr.length，是，繼續執行，開始進入第一圈迴圈
2. 執行第 2 行，判斷 arr[0](也就是3) 是否<= 0，不是
3. 跑回第 1 行，i++，i 變成 1，檢查 i 是否 <= arr.length，是，繼續執行
4. 執行第 2 行，判斷 arr[1](也就是5) 是否<= 0，不是
5. 跑回第 1 行，i++，i 變成 2，檢查 i 是否 <= arr.length，是，繼續執行
6. 執行第 2 行，判斷 arr[2](也就是8) 是否<= 0，不是
7. 跑回第 1 行，i++，i 變成 3，檢查 i 是否 <= arr.length，是，繼續執行
8. 執行第 2 行，判斷 arr[3](也就是13) 是否<= 0，不是
9. 跑回第 1 行，i++，i 變成 4，檢查 i 是否 <= arr.length，是，繼續執行
10. 執行第 2 行，判斷 arr[4](也就是22) 是否<= 0，不是
11. 跑回第 1 行，i++，i 變成 5，檢查 i 是否 <= arr.length，是，繼續執行
12. 執行第 2 行，判斷 arr[5](也就是35) 是否<= 0，不是
13. 第一圈迴圈結束，執行第 4 行，設定變數 i 是 2，檢查 i 是否 <= arr.length，是，繼續執行，開始進入第二圈迴圈
14. 執行第 5 行，判斷 arr[2](也就是8) 是否不等於 arr[1]+arr[0](也就是5+3)，不是
15. 跑回第 4 行，i++，i 變成 3，檢查 i 是否 <= arr.length，是，繼續執行
16. 執行第 5 行，判斷 arr[3](也就是13) 是否不等於 arr[2]+arr[1](也就是8+5)，不是
17. 跑回第 4 行，i++，i 變成 4，檢查 i 是否 <= arr.length，是，繼續執行
18. 執行第 5 行，判斷 arr[4](也就是22) 是否不等於 arr[3]+arr[2](也就是13+8)，是，回傳 'invalid'
19. 第二圈迴圈結束
20. 執行完畢
```
第三週（06/29 ~ 07/05）：繼續加強JavaScript 程式基礎
這週繼續加強程式思維，題目難度比上一週多了一些，可能是我潛意識中對於冗長的題目就會下意識地覺得複雜，因此重複看了很多遍課程影片，學習老師一步一步的解析題目拆解成一個一個小問題。同時這週也開始學習模組化的概念、ES6語法與單元測試，ES6語法在實際練習過幾次後發現很好用！這週在寫作業時學習到的語法有:
``` js
🌝 Math.floor( )  //取小於輸入值的最大整數
```
``` js
🌝 a**b 也可寫成 Math.pow(a,b)   //a的b次方
```
以下面的程式作為範例
``` js
//水仙花數
//回傳數字幾位數
//透過一直除以10來看
function digistCount(n){
    if(n===0)return 1
    let ans = 0
    while(n!=0){
        n=Math.floor(n/10)
        ans ++
    }
    return ans
}

//取出各個數字
//透過一直對10取餘數再除以10
function isflower(n){
    //幾位數
    let digists = digistCount(n)
    let sum =0
    let m=n
    while(m!=0){
        let num =m%10
        sum+=num**digists  //num的digists次方(2的6次方)
        m=Math.floor(m/10)
    }
    return sum===n

    }
```
``` js
🌝 BigInt()  //當題目輸入的值可能是很大的數時可以使用
```
以下面的程式作為範例
``` js
// 聯誼順序比大小
function solve(input) {
    for (let i = 1; i < input.length; i += 1) {
        let [a, b, k] = input[i].split(' ');
        // A 與 B 可能是很大的正整數
        if (BigInt(a) === BigInt(b)) {
            console.log('DRAW');
        } else if ((BigInt(a) > BigInt(b) && k == 1) || (BigInt(a) < BigInt(b) && k == -1)) {
            console.log('A');
        } else {
            console.log('B');
        }
    }
}
```
``` js
🌝 Math.sqrt(p)   //開根號
```
以下面的程式作為範例
``` js
//完全平方和
function solve(lines){
    let n = Number(lines[0])
    let sum = 0
    for(let i=1;i<=n;i++){
        if(isSquare(i)){
            sum+=i //完全平方數的加總
        }
    }
    console.log(sum)
}
//完全平方數
function isSquare(n){
    let r = Math.floor(Math.sqrt(n))//Math.sqrt(n)是開根號
    return r*r === n
}
```
第四週（07/06 ~ 07/12）：網路概念與 API
這週學習了很多網路的基礎概念，最讓我印象深刻的莫過於老師用傳紙條故事比喻基本網路概念還有拉麵店的販賣機比喻API的概念！認識完基本概念後接著學習實作串接API，寫這週作業時沒有直覺聯想到要看文件，因此有點摸不著頭緒。後來找同學討論時，同學問我：文件你看不懂嗎？這時才突破我的盲點，趕緊學習看文件，並且複習老師的課程影片。複習時才發現老師在影片中也是一邊帶著我們看文件實作串接！感謝能夠有同學互相討論，也認真紀錄了學習串接API的筆記。作業的實作練習也複習到了前三週上課的內容，其中也學習到了新的語法：
``` js
🌝 try…catch  //在程式執行可能拋出錯誤的地方使用，避免整個程式因為發生錯誤而停止執行。
```
``` js
🌝 JSON.parse()  //將 JSON 字串 解析成 JavaScript 物件
```
``` js
🌝 process.argv   //讀取使用者下的參數
```
``` js
🌝 for...of  //可以把陣列的值一個個取出
```
以下面的程式作為範例
```js
// 輸入國家的英文名字，就能夠查詢符合的國家的資訊
// 引入了request的library
const request = require('request');
//讀取使用者下的參數
const args = process.argv;
const apiUrl = 'https://restcountries.eu/rest/v2';

const name = args[2];

//node hw3.js korea
//args[2] 需要是國家名稱
if (!name) {
  return console.log('請輸入國家名稱');
}

//ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
//使用 ${ apiUrl } 來插入變數
request (`${apiUrl}/name/${name}`, (error,response,body) => {
  if (error) {
    return console.log('讀取資料失敗', error);
  }
  // 用 JSON.parse處理JSON格式的字串
  const data = JSON.parse(body);
  
  //status 請求回應狀態，也就是 HTTP 狀態碼（status code）
  //4xx：客戶端錯誤 表示客戶端提交的請求中有錯誤或者不能被完成
  if (data.status >= 400 && data.status < 500){
    return console.log('找不到國家資訊')
  }
  for (let i = 0; i < data.length; i += 1) {
    console.log('========================')
    
    //ES6 新語法 Template Literals：使用 ${ } 來加入變數或函式
    //使用 ${ data[i].id } 來插入變數
      console.log(`國家: ${data[i].name}`);
      console.log(`首都: ${data[i].capital}`);
      console.log(`貨幣: ${data[i].currencies[0].code}`);
      console.log(`國碼: ${data[i].callingCodes[0]}`);
  }
})
```
總結
複習週時玩了老師製作了Lidemy HTTP Challenge小遊戲，透過練習API闖關真的很有趣！感謝老師用心製作！從公車動態與寄信小程式認識到現在所學的可以實作哪些東西，策勵自己要更努力才行！
這四週的學習，除了學習課程內涵外，也學習自律的規劃每日的學習進度，練習總結自己學習到了什麼與紀錄不熟悉的地方提醒自己要重複複習。有時會看看同學們的進度報告，有種一群人一起努力向前進的感覺，蠻策勵自己的;觀摩同學們的作業時，經常會有很多收穫，像是觀察不同的解題方式，經常讓我覺得同學們都好厲害;觀摩同學們的筆記，也可以獲得不同的收穫，有時會發現自己學習時概念不熟悉的地方，同學們解釋得很好！或是同學們和我分享我的筆記有哪些讓他疑惑的地方等等，真得很感謝有同學們一起學習呢！老師的每週隨意聊都會有很多的鼓勵與學習上的建議，有種每週注入新的能量的感覺ଘ(੭ˊ꒳ ˋ)੭✧
衷心的感謝能夠被錄取，很珍惜這次的學習機會也提醒自己要認真的跟完課程。最後想感謝爸媽願意支持我這個小廢物從澳洲回來後就開始當全職宅宅學著他們看不懂的東西。能夠有機會全心的投入想學的專業並且有老師帶著還有同學們一起努力，真的很幸福！之後也要繼續加油！