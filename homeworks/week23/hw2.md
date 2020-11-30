## 為什麼我們需要 Redux？
* 可以清楚的知道狀態為何被更新而且如何被更新
* 更有效地[管理/更新]全域 state 的狀態

>[參考資料](https://ithelp.ithome.com.tw/articles/10187498)
---
## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
![](https://i.imgur.com/lVmrYz7.gif)

* 使用一個 store 將整個應用程式的狀態 (state) 用物件樹 (object tree) 的方式儲存起來
* 改變 state 的方法就是發送 action
* 實際因應 action 裡的內容對 state 做變化的函式叫做 reducer

### Store
用來儲存 state 狀態的物件
### Reducers
用來接收當前的 state 與 action，並在需要的時候可以更新 state 的狀態
* 新的 state 狀態只能是透過 當前的 state 與 action 物件來取得
* 需要透過額外複製一份當前 state 的狀態，並從那份狀態來進行更新。
* 不可以在此設計非同步邏輯、隨機值或者其他會造成 side effect 的行為。
### Dispatch
唯一一種用來將 action 物件傳入，並且更新 store 中 state 狀態的方式。
store.dispatch 可以視為是觸發一個事件，透過這個方式讓 store 知道我們想要觸發哪一個事件(藉由傳入 action 物件得知)
### Actions
在 React 應用程式中用來描述某件事件可以被執行的事件
* 有 type 與 payload 欄位
* type 欄位用來描述這個可以被執行的事件
* payload 欄位用來提供額外的資訊可以被操作
### Action Creators
用來回傳一個 action 物件，並且可以額外提供參數傳入。

>[參考資料](https://ithelp.ithome.com.tw/articles/10250232)

### Redux 同步資料流
![](https://i.imgur.com/pzOFgKF.png)
View -> Action -> (Middleware) -> Reducer
* 當使用者和 View 互動時會觸發事件發出 Action
* 若有使用 Middleware 的話會在進入 Reducer 進行一些處理
* 當 Action 進到 Reducer 時，Reducer 會根據，action type 去 mapping 對應處理的動作，然後回傳回新的 state
* View 則因為偵測到 state 更新而重繪頁面

>[參考資料](https://github.com/kdchang/reactjs101/blob/master/Ch07/react-redux-introduction.md)

### Redux 非同步資料流
![](https://i.imgur.com/i2zwyBz.png)
>使用者與 View 互動 => dispatch 出 Action => Reducers 依據 action type 分配到對應處理方式，回傳新的 state => 透過 React Redux 傳送給 React，React 重新繪製 View

>[參考資料](https://github.com/kdchang/reactjs101/blob/master/Ch07/react-redux-real-world-example.md)

---
## 該怎麼把 React 跟 Redux 串起來？
![](https://i.imgur.com/ZBCdQq4.jpg)
* react-redux 是 React 和 Redux 間的橋樑，使用 Provider、connect 去連結 store 和 React View。

![](https://i.imgur.com/IYZn2Dv.png)
### 將 redux store 傳入到 Provider，讓所有的組件都可以使用 useSelector() 或是 useDispatch() 管理狀態
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
### 定義 Actions
``` javascript
import {ADD_TODO} from './actionTypes'

export function addTodo(name){
    return {
        type: ADD_TODO,
        payload: {
          name
        }
    }
}
```
### actionTypes
``` javascript
export const ADD_TODO = "add_todo";
```
### Reducers
``` javascript
import { ADD_TODO } from "../actionTypes"

let todoId = 0

const initialState = {
    todos: [],
}

export default function todosReducer(state = initialState, action){
    switch(action.type){
      case ADD_TODO: {
        return{
          ...state,
          todos:[...state.todos, {
              id:todoId++,
              name:action.payload.name,
              completed: false
          }]
        }
      }
      case DELETE_TODO: {
        return{
          ...state,
          todos:state.todos
            .filter(todo => todo.id !== action.payload.id)
        }
      }
```
### combineReducers 可以讓我們切割我們 state 方便維護和管理
``` javascript
import {combineReducers} from "redux";
import todos from "./todos";

export default combineReducers({
  todoState: todos
})
```
### createStore 可以產生 store
``` javascript
import {createStore} from "redux";
import rootReducer from "./reducers";

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```
### useSelector 從 Store 中，將 Component 需要的 State 取出
``` javascript
export const selectTodos = (store) => store.todoState.todos;
```
### useDispatch 回傳一個 dispatch 方法，可以直接透過它觸發 Reducer
``` javascript 
import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteTodo, toggleTodo} from '../redux/action'

function TodoContent({todo}) {
  const dispatch = useDispatch()
  return (
    <CardList>
      <CardBody>
        <Todo1
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <Check>{todo.completed ? "✔" : ""}</Check>
          <TodoText completed={todo.completed}>{todo.name}</TodoText>
        </Todo1>
      </CardBody>
    </CardList>
  );
}
export default TodoContent;
```
[參考資料](https://medium.com/enjoy-life-enjoy-coding/react-redux-%E5%B0%8F%E5%AD%A9%E5%AD%90%E6%89%8D%E5%81%9A%E9%81%B8%E6%93%87-hooks-%E5%92%8C-redux-%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81-1fdd226f5d99)