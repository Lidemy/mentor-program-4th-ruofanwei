## 請列出 React 內建的所有 hook，並大概講解功能是什麼

#### useState
* 會在每次重新轉譯的時候保留這個 state。
* useState 函式會回傳兩個東西，分別是「當前的 state（current state）」和一個可以「更新此 state 的方法」
* 這個方法所帶入的參數就是「state 的預設值（initial state）」，只有在元件初次轉譯時會使用到它。

#### useEffect
* useEffect 內的 effect 會在每一次 DOM 轉譯後被呼叫
* 如果有回傳 cleanup function 的話，則會在每一次 DOM 轉譯後的最開始先被呼叫，接著才執行該次的 effect
* 實際上在每一次元件轉譯時 useEffect 內的函式都是新的、不同的，並會把舊的給覆蓋

#### useContext
* Component 不再需要經過一層一層的 Props 傳遞，便能直接使用在需要它的 Component。
* 讓父 Component 能好好管理要提供的 Props，也讓子 Component 能更輕易地獲取 Props

#### useReducer
* 需要將定義好的 reducer 和 initialState 帶入
* 使用時機是「當你需要更新一個資料，但這個資料其實是相依於另一個資料狀態時」
* 可以不再需要在 useEffect 內去讀取狀態，只需要在 effect 內去 dispatch 一個 action 來更新 state
* effect 不再需要更新狀態，只需要說明發生了什麼，更新的邏輯則都在 reducer 內統一處理。

#### useCallback
能夠記住 Object 的記憶體位址，就可以避免父元件重新渲染後，Object 被重新分配記憶體位址

#### useMemo
讓 React 記住 function 的回傳值，如果 dependencies array 中的變數都沒有被經過修改，React.useMemo 將會沿用上次的回傳值。

#### useRef
* 建立並回傳一個帶有 current 屬性的物件
* 即使在組建重新渲染後，仍可以去取得同一個物件，並取出內部的值來用。
* 想要定義一些「變數」，但當這些變數改變時，又不需要像 state 一樣會重新導致畫面渲染的話，適合使用 useRef。

[參考資料](https://ithelp.ithome.com.tw/articles/10219658)
[參考資料](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](https://i.imgur.com/gDNOsfg.png)
可以分為三個階段：
* Mounting 當元件被加入到 DOM 中時會觸發
* Updateing 當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發
* Unmounting 當元件要從 DOM 中被移除時會觸發

#### Mounting
##### constructor
初始化並建構物件，可以用來綁定 method

##### render
每次 props 或是 state 被改變時，都會被執行一次。

##### static getDerivedStateFromProps
「每一次」跑 render() 之前被呼叫執行

##### componentWillMount
會在第一次的 render() 執行之前就先被執行

##### componentDidMount
* 元件已經實際存在在畫面中
* 任何需要 DOM 或會 Asynchronous 更新 state 狀態的操作都適合放在 componentDidMount。

#### Updateing

##### componentWillReceiveProps
* 會在每次元件接收到 props 更新時被執行
* 當父元件刷新子元件時也會執行
* 元件第一次 render() 時，React 不會 call componentWillReceiveProps

##### shouldComponentUpdate
想最佳化效能時使用

##### componentWillUpdate
在元件準備更新、執行 render() 之前被執行

##### getSnapshotBeforeUpdate
React 進行修改前，通常是更新 DOM 前被呼叫執行

##### componentDidUpdate
會在元件更新完成、執行完 render() 重繪後被執行

#### Unmounting

##### componentWillUnmount
* component 要被移除的時候會執行此函式，可以做清除綁定 eventlistener，或清除 cookie、local storage等機制
* 在這裏執行 setState 不會觸發 re-render 

#### 當元件第一次 render 時的順序：

1. constructor
2. componentWillMount, getDerivedStateFromProps
3. render
4. componentDidMount

#### 當元件被更新時的順序：

1. componentWillReceiveProps, getDerivedStateFromProps
2. shouldComponentUpdate 
3. componentWillUpdate
4. render
5. getSnapshotBeforeUpdate
6. componentDidUpdate


## 請問 class component 與 function component 的差別是什麼？
* Function component 的每一次 render，都是「重新」呼叫一次 function，會記住當下傳入的值
* class component 可以從 this.props.onChange 拿到最新的屬性

[參考資料](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
差異就在於component state是否由React控制

#### Uncontrolled component
選取到該表單元素後，才從該表單元素取出值
對於檔案上傳用的 <input type="file" /> 只能透過 Uncontrolled Components 的方式處理
透過 JavaScript 可以知道使用者選擇要上傳的檔案為何（取值），但不能去改變使用者要上傳的檔案（改值）

``` JavaScript
// 載入 useRef
import React, { useRef } from 'react';

const WeatherSetting = ({ setCurrentPage }) => {
  // 使用 useRef 建立一個 ref，取名為 inputLocationRef
  const inputLocationRef = useRef(null);

  const handleSave = () => {
    // 透過 inputLocationRef.current 可以指到該 input 元素
    // 透過 inputLocationRef.current.value 即可取得該 input 元素的值
    const locationName = inputLocationRef.current.value;
    console.log(locationName);
    // ...
  };
  return (
    <WeatherSettingWrapper>
       // uncontrolled components 中可以使用 defaultValue 定義預設值 
      <StyledInputList
        ref={inputLocationRef}
        defaultValue="臺南市"
      />
      <ButtonGroup>
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;
```
當 input 欄位內的資料有變動時，並不像 Controlled Component 一樣會促發畫面重新渲染

## controlled component 
表單資料交給 React 來處理
表單欄位的值可從 props 或 state 取得
``` JavaScript
// 載入 useState
import React, { useState } from 'react';

const WeatherSetting = ({ setCurrentPage }) => {
  // 定義 locationName，預設值先帶為空
  const [locationName, setLocationName] = useState('');
  // 定義 handleChange 要做的事
  const handleChange = (e) => {
    console.log(e.target.value);
    // 把使用者輸入的內容更新到 React 內的資料狀態
    setLocationName(e.target.value);
  };
  return (
    <WeatherSettingWrapper>
      // 使用 onChange 事件來監聽使用者輸入資料
      <StyledInputList
        list="location-list"
        id="location"
        name="location"
        onChange={handleChange}
      />
    </WeatherSettingWrapper>
  );
};
export default WeatherSetting;
```
只要使用者輸入的內容有變動，畫面就會重新渲染

[參考資料](https://ithelp.ithome.com.tw/articles/10227866)