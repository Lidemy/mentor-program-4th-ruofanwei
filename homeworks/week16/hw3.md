請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
````

1. 編譯階段的時候會處理宣告的部分

```javascript
global EC
global VO {
  fn: function,
  a: undefined
}

fn EC
fn VO{
  fn2: function,
  a: undefined
}
```


2. 進入到執行階段 Line 1 : var a = 1

JS 引擎：global scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功找到 a 並且賦值

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}
```

3. 執行階段 Line 16 : fn()

JS 引擎：global scope，我這裡有個對 fn 的 RHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功返回 fn 的值並且呼叫 function

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: undefined
}
```

4. 執行階段 Line 3 : console.log(a)

JS 引擎：fn scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 undefined


5. 執行階段 Line 4 : var a = 5

JS 引擎：fn scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功找到 a 並且賦值

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 5
}
```

6. 執行階段 Line 5 : console.log(a)

JS 引擎：fn scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 5

7. 執行階段 Line 6 : a++

JS 引擎：fn scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功找到 a 加上 1 後賦值

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 6
}
```

8. 執行階段 Line 7 : var a

已經宣告過 a 了，值不會變

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 6
}
```

9. 執行階段 Line 8 : fn2()

JS 引擎：global scope，我這裡有個對 fn2 的 RHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功返回 fn2 的值並且呼叫 function

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 6
}

fn2 EC
fn2 VO{
  
}
```

10. 執行階段 Line 11 : console.log(a)

JS 引擎：fn2 scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：fn2 scope 說沒有，所以去問上一層的 fn scope
JS 引擎：fn scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 6

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 6
}

fn2 EC
fn2 VO{
  
}
```
11. 執行階段 Line 12 : a = 20

JS 引擎：fn2 scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：fn2 scope 說沒有，所以去問上一層的 fn scope
JS 引擎：fn scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功找到 a 後賦值

```javascript
global EC
global VO {
  fn: function,
  a: 1
  
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```

12. 執行階段 Line 13 : b = 100

JS 引擎：fn2 scope，我這裡有個對 b 的 LHS 引用，你有看過它嗎？
執行結果：fn2 scope 說沒有，所以去問上一層的 fn scope
JS 引擎：fn scope，我這裡有個對 b 的 LHS 引用，你有看過它嗎？
執行結果：fn scope 說沒有，所以去問上一層的 global scope
JS 引擎：global scope，我這裡有個對 b 的 LHS 引用，你有看過它嗎？
執行結果：沒有。

在嚴格模式底下（use strict），會返回 ReferenceError: b is not defined 錯誤。

如果不是在嚴格模式，那 global scope 就會把 b 加上去並且設定成 100。
這邊先假設我們不是在嚴格模式。

```javascript
global EC
global VO {
  fn: function,
  a: 1,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```
13. 執行階段 Line 9 : console.log(a)

JS 引擎：fn scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：fn scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 20


```javascript
global EC
global VO {
  fn: function,
  a: 1,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```

14. 執行階段 Line 17 : console.log(a)

JS 引擎：global scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 1
```javascript
global EC
global VO {
  fn: function,
  a: 1,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```
15. 執行階段 Line 18 : a = 10

JS 引擎：global scope，我這裡有個對 a 的 LHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功找到 a 後賦值
```javascript
global EC
global VO {
  fn: function,
  a: 10,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```
16. 執行階段 Line 19 : console.log(a)

JS 引擎：global scope，我這裡有個對 a 的 RHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功返回 a 的值並且呼叫 console.log，印出 10
```javascript
global EC
global VO {
  fn: function,
  a: 10,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```
17. 執行階段 Line 20 : console.log(b)

JS 引擎：global scope，我這裡有個對 b 的 RHS 引用，你有看過它嗎？
執行結果：scope 說有，所以成功返回 b 的值並且呼叫 console.log，印出 100
```javascript
global EC
global VO {
  fn: function,
  a: 10,
  b: 100
}

fn EC
fn VO{
  fn2: function,
  a: 20
}

fn2 EC
fn2 VO{
  
}
```