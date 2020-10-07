## Event Loop - 請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因
```javascript
console.log(1) 
setTimeout(() => {
  console.log(2)
}, 0) 
console.log(3)
setTimeout(() => {
  console.log(4) 
}, 0)  
console.log(5) 
```

1. 執行console.log(1)，印出 1
2. 下面一行的callback function 會在 0ms 之後被放到 callback queue
3. 這時候 call stack 還不是空的，所以 console.log(3) 會先被執行，印出 3
4. 下面一行的callback function 會在 0ms 之後被放到 callback queue
5. 這時候 call stack 還不是空的，所以 console.log(5) 會先被執行，印出 5
6. 執行完之後 call stack 清空，event loop 才把 第一個 callback function 放到 call stack，然後才執行 第一個 callback function 裡面的 console.log(2)，印出 2
7. 執行完之後 call stack 清空，event loop 才把 第二個 callback function 放到 call stack，然後才執行 第二個 callback function 裡面的 console.log(4)，印出 4