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

## 執行流程
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