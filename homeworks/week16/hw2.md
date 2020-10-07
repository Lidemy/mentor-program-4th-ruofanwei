請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. 當 i=0 時，執行console.log('i: ' + 0)，印出 i: 0
2. 下面一行的callback function 會在 i * 1000s 之後被放到 callback queue，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，在globalEC.VO，最後找到 i，成功獲得這個變數的值，因此會在 0 * 1000ms 之後被放到 callback queue
3. 這時候 call stack 還不是空的，所以會回到第一行 i++，當 i=1 時，執行console.log('i: ' + 1)，印出 i: 1
4. 下面一行的callback function 會在 i * 1000s 之後被放到 callback queue，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，在globalEC.VO，最後找到 i，成功獲得這個變數的值，因此會在 1 * 1000ms 之後被放到 callback queue
5. 這時候 call stack 還不是空的，所以會回到第一行 i++，當 i=2 時，執行console.log('i: ' + 2)，印出 i: 2
6. 下面一行的callback function 會在 i * 1000s 之後被放到 callback queue，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，在globalEC.VO，最後找到 i，成功獲得這個變數的值，因此會在 2 * 1000ms 之後被放到 callback queue
7. 這時候 call stack 還不是空的，所以會回到第一行 i++，當 i=3 時，執行console.log('i: ' + 3)，印出 i: 3
8. 下面一行的callback function 會在 i * 1000s 之後被放到 callback queue，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，在globalEC.VO，最後找到 i，成功獲得這個變數的值，因此會在 3 * 1000ms 之後被放到 callback queue
9. 這時候 call stack 還不是空的，所以會回到第一行 i++，當 i=4 時，執行console.log('i: ' + 4)，印出 i: 4
10. 下面一行的callback function 會在 i * 1000s 之後被放到 callback queue，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，在globalEC.VO，最後找到 i，成功獲得這個變數的值，因此會在 4 * 1000ms 之後被放到 callback queue
11. 執行完之後 call stack 清空，event loop 才把 第一個 callback 放到 call stack，然後才執行 callback 裡面的 console.log('i')，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，還是沒找到所以又往上一層去看 globalEC.VO，最後找到 i，成功獲得這個變數的值，印出 5
12. 執行完之後 call stack 清空，event loop 才把 第二個 callback 放到 call stack，然後才執行 callback 裡面的 console.log('i')，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，還是沒找到所以又往上一層去看 globalEC.VO，最後找到 i，成功獲得這個變數的值，印出 5
13. 執行完之後 call stack 清空，event loop 才把 第三個 callback 放到 call stack，然後才執行 callback 裡面的 console.log('i')，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，還是沒找到所以又往上一層去看 globalEC.VO，最後找到 i，成功獲得這個變數的值，印出 5
14. 執行完之後 call stack 清空，event loop 才把 第四個 callback 放到 call stack，然後才執行 callback 裡面的 console.log('i')，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，還是沒找到所以又往上一層去看 globalEC.VO，最後找到 i，成功獲得這個變數的值，印出 5
15. 執行完之後 call stack 清空，event loop 才把 第五個 callback 放到 call stack，然後才執行 callback 裡面的 console.log('i')，從 scope chain 裡面尋找 i 這個變數，在自己的 AO 裡面找不到所以往上找，還是沒找到所以又往上一層去看 globalEC.VO，最後找到 i，成功獲得這個變數的值，印出 5
