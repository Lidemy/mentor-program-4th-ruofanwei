請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

1. obj.inner.hello() 可以看成 obj.inner.hello.call(obj.inner) 

obj.inner.hello.call(obj.inner) 第一個參數是 obj.inner
this的值就是 obj.inner
console.log(this.value) 會印出 2


2. obj2.hello() 可以看成 obj2.hello.call(obj2) 

obj.inner.hello.call(obj.inner) 第一個參數是 obj2
this的值就是 obj2
console.log(this.value) 會印出 2

3. hello() 可以看成 hello.call() 會印出 undefined

hello 因為沒有傳東西進去，所以是預設綁定，在非嚴格模式底下，瀏覽器預設是 window（node.js預設是global)。
在嚴格模式下，會印出 undefined。




