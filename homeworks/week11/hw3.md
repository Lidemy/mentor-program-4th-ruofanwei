## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 加密
加密跟編碼有點像，唯一不同之處是加密跟解密必須要有金鑰（Key）才能進行。

#### `用 AES256 加密`

>因為無法保證 key 的安全，所以不建議用加密的方式保存密碼

![](https://i.imgur.com/wQaNTeY.png)

### `雜湊hash`
把各個 欄位/字元 丟進某個公式計算的方式就叫做雜湊（Hash），而這個計算公式就稱為 雜湊函數（Hash function），過程可能會做各種加減乘除，最後算出一個值或字串

經過雜湊函數轉換後的內容，稱作雜湊值(hash sum)，無法從轉換後的樣貌(雜湊值)，去推導出原本的模樣(原密碼)。

#### `用 password_verify() 核對密碼`

```php
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
```
>[參考資料](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)

#### `用 password_verify() 核對密碼`

```php
$username = $_POST['username'];
$password = $_POST['password'];
// 先把密碼select出來
$sql = sprintf(
    "select * from users where username='%s'",
    $username
  );

$result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  
// 如果沒有抓到東西代表username輸入錯誤
if ($result->num_rows === 0) {
    // 先導回去並且，顯示error
    header("Location: login.php?errCode=2");
    // 離開，不會執行下方程式碼
    exit();
  }

// 如果有查到使用者
$row = $result->fetch_assoc();
// 第一個是使用者輸入的password，第二個是資料庫內的password
// function會去比對hash過得跟輸入的是否一樣
  if (password_verify($password, $row['password'])) {
   // 如果一樣就登入成功
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('Location: login.php?errorCode=2');
  }
```
#### `將密碼用 SHA1 雜湊`

>把密碼進行雜湊也不夠安全了，因為大部分人使用的密碼都可以透過查表的方式快速破解

![](https://i.imgur.com/MPp0cMx.png)

#### `加鹽後用 SHA1 雜湊`

>在儲存密碼時至少要加鹽再雜湊，而且隨機產生的 salt 盡量要含有特殊字元，這樣才能保證使用者的密碼安全

![](https://i.imgur.com/E0mSiLm.png)

>[參考資料](https://medium.com/@brad61517/%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8-%E5%AF%86%E7%A2%BC%E5%AD%98%E6%98%8E%E7%A2%BC-%E6%80%8E%E9%BA%BC%E4%B8%8D%E7%9B%B4%E6%8E%A5%E5%8E%BB%E8%A3%B8%E5%A5%94%E7%AE%97%E4%BA%86-%E6%B7%BA%E8%AB%87-hash-%E7%94%A8%E9%9B%9C%E6%B9%8A%E4%BF%9D%E8%AD%B7%E5%AF%86%E7%A2%BC-d561ad2a7d84)

### 加密與雜湊的差別

* 加密可以解密
  明文加密後會有密文與密鑰，透過密文與密鑰，可以逆推回去原本的明文內容，雜湊則不行。

* 雜湊不行還原
  安全性方面，因為雜湊值無法反推回原密碼，所以即便有一天資料庫不小心洩漏出去了，
  駭客還是拿不到使用者的密碼

>[參考資料](https://medium.com/starbugs/how-to-store-password-in-database-sefely-6b20f48def92)

### 為什麼密碼要雜湊過後才存入資料庫

若使用明碼儲存密碼，就意謂著，若是資料庫被駭入，或者是被SQL Injection撈出了使用者資料，那在使用者察覺之前，攻擊者就可以登入系統通行無阻了！

資安領域沒有所謂絕對的安全，只能不斷提高攻擊者的成本!

>[參考資料](https://www.ithome.com.tw/voice/127918)

## `include`、`require`、`include_once`、`require_once` 的差別

### `require V.S. include`

* require與include最大差別在於:
  require遇到錯誤會立即停止，而include遇到錯誤會繼續執行

```php
include 'index.php';
echo 'End!';//會输出
// include生成一個警告（E_WARNING），在錯誤發生後腳本會繼續執行。

============================================================

require 'index.php';
echo 'End!';//不會输出
// require生成一個錯誤（E_COMPILE_ERROR），在錯誤發生後腳本會停止執行。
```

### `include_once V.S. require_once`

include_once 與 require_once都是PHP的函式，主要是要包含其它的檔案進來，而且萬一該檔案被包含過了，則不會重新再包含一次。

* 不同之處在於：
  include_once萬一遇到錯誤，則會持續執行。
  但require_once則會停止執行，並產生Fatal Errors。

```php
require_once('connect3.php');
echo "123";
// 如果沒有找到檔案，會出現 Fatal error 錯誤，頁面下其餘的程式都不會執行

===============================================================

include_once('connect3.php');
echo "123";
// 如果沒有找到檔案，會出現 Warning 警告，仍會執行頁面下其它的程式
```

>[參考資料](http://ps.hsuweni.idv.tw/?p=5003)

>[參考資料](https://www.vvhan.com/phpicdrqr.html)

## 請說明 SQL Injection 的攻擊原理以及防範方法

### `攻擊原理`

寫入不懷好意的 SQL 指令，如果輸入欄位不做一些防禦，這些指令就會一起被組合進去執行。

### `舉例：在密碼欄位輸入 'or '1'='1`

```php
// 原本的語法
select * from users where username = '$name' and password = '$pwd';

===================================================================

// 由於1=1成立，所以攻擊者就能得到 admin 權限
select * from users where username = 'admin' and password = '' or '1'='1'
```
### `如何防止 SQL Injection?`

不要使用客戶端輸入的東西來組合 SQL 語句

#### 解決方法：透過 Prepared Statment來防禦 -> 處理 SQL 跳脫。

```php
<?php
$stat = $conn->prepare("SELECT * FROM users WHERE username=? and pwd=?"); // => 把參數換成 ?
$stat->bind_param('ss', $username, $password); // => 替換成準備好的參數
$stat->execute(); // => 執行 query 語法
$result = $stat->getResult(); // => 執行結果
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc(); // => 撈資料
}
?>
```
* 把要放的參數都改成問號
* bind_param() 的第一個參數，有幾個參數就要寫幾個字元，字元依照參數的資料類型而定
```
  string => s
  int => i
```
>[參考資料](https://www.coderbridge.com/@Jing-Teng/c28308e08a2f45c29504ce6b9c2968c5)

>[參考資料](https://yakimhsu.com/project/project_w12_Info_Security-XSS_SQL.html)

##  請說明 XSS 的攻擊原理以及防範方法

### `攻擊原理`

網站被他人植入程式碼的攻擊方法

### `舉例`

* 對方可以植入廣告
* 盜取cookie
* 利用 input 欄位輸入特別的 JS 語法，
  網頁有 輸出此內容 的時候，就可以竄改網頁或竊取資料。

```php
<input type="text" placeholder="輸入內容"> // 輸入欄位
<script>alert("XSS攻擊測試");</script> // 輸入惡意碼

<p>文字文字文字</p> // => 正常輸出
<p><script>alert("XSS攻擊測試");</script></p> // => 不正常輸出，且每個使用者都會中標
```

### `防範方法`

輸入驗證檢查，輸出encoding，可以植入的地方太多，
Javascript、HTML、URL等，不好防範。

```php
// php 跳脫字元的內建函式 htmlspecialchars
echo htmlspecialchars($str, ENT_QUOTES, 'utf-8')


// 資料輸出時候的 Encoding! 一般的編碼規則如下：
& --> &amp;
< --> &lt;
> --> &gt;
" --> &quot;
' --> &#x27;     
/ --> &#x2F;
```

>[參考資料](https://www.qa-knowhow.com/?p=2992)

>[參考資料](https://www.qa-knowhow.com/?p=2951)

>[參考資料](https://medium.com/blacksecurity/metasploitable-dvwa-xss-vulnerability-2c7c8facf5e9)

## 請說明 CSRF 的攻擊原理以及防範方法

### `攻擊原理`

偽造使用者發出請求。透過瀏覽器的機制，當發送請求時會把相關 cookie 傳送過去，當進入釣魚網站時使用者正好是登入狀態，就有可能送出包含資訊的請求。

### `舉例 1`

* 受害者T登錄了某個銀行網站，session Id等信息就會保存在瀏覽器中。
  這時候，用戶T又打開了CSRF攻擊網站，這個網站通過表單自動提交來向銀行網站發起
  一次轉帳請求，這樣，受害者T的銀行賬戶的錢可能就被轉走了。

* 這個過程成功的關鍵點在於：
  用戶登錄了銀行網站，並且session還未過期的時候，打開了CSRF攻擊網站。

### `舉例 2`

當某個登錄了的用戶點開這個網頁時，就會自動在中發表一個評論，而用戶對此毫不知情

```html
<!--注意：ajax受瀏覽器同源策略的影響，但是表單提交是不受這個限制的。-->
< form  id = "attackForm"  action = " http :// www . example . com / article / 59a12398904c4928cc46603c / comment / new "  method = "post" >
    < input  type = "text"  name = "content"  value = "text" />
</ form >
```
```javascript
//自動提交表單，這時候，瀏覽器會帶著受害用戶在example.com下的cookie去發請求，這樣就通過了服務器的認證
window .onload = function () {
   ( function () {
       document .querySelector( '#attackForm' ).submit();
   })();
};
```
### `防範方法`

* 加上 CSRF token
  確保有些資訊「只有使用者知道」
  -> form 表單的 token 雖然可以隨便修改，但攻擊者並不知道正確的 csrf_token 值
     是什麼，也沒辦法猜到，兩者不可能匹配， request 就不被信任，所以自然就無法進行攻擊了
  
  
* SameSite cookie(瀏覽器端的防禦)
  原理就是幫 Cookie 再加上一層驗證，不允許跨站請求。
  SameSite 設有三個數值層級，分別為 Strict, Lax 和 None，由嚴格至寬鬆不同程度地限制 cookies 的傳輸。
  
  1. 當 cookie 中設定了 SameSite = ‘Strict’ 的話，代表著這個 cookie 只允許 same site 情況下使用。
     
  2. 而 SameSite = ‘Lax’ 放寬部份限制，只限制當使用 POST、PUT 或 DELETE 方法進行跨站請求時，就不會帶上此 cookie。
     
     
* Double Submit Cookie
  在表單放 CSRF token，但這次參照值不是存在 Server 裡，而是存在 cookie 裡
  -> 利用的是 cookie 只會從相同 domain 帶上來，攻擊者無法從不同 domain 帶上此 cookie

### `CSRF token`

#### `安裝 flask-wtf`

```
pip install flask-wtf
```
#### `從 flask_wtf 中載入 CSRFProtect，並設定 SECRET_KEY`

```js
import os
from flask_wtf.csrf import CSRFProtect

app.config['SECRET_KEY'] = os.urandom(24)

csrf = CSRFProtect(app)
```

在表單中加入 hidden 欄位 csrf_token

``` html
<form method="post">
     <!--值由 server 隨機產生，並且存在 server 的 session 中
     csrf token 必須被保存在 server 當中，才能驗證正確性-->
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
</form>
```

如果是使用 ajax 或 axios 可在 header 中加入 csrf-token

```html
<script>
var csrf = "{{ csrf_token() }}";
axios.post('/auth/login', data, {
        headers: {'x-csrf-token': csrf}
        })
</script>
```
>[參考資料](https://xwjgo.github.io/2017/10/26/XSS%E5%92%8CCSRF/)

### `SameSite cookie`

除了在 B 網站這個 domain 發出的請求，其他 domain（如 A 網站）的發出的 request 都不會帶上此 Cookie，等於是張更安全的通行證。

```
@app.route("/set")
def setcookie():
    resp = make_response('Setting cookie!')
    resp.set_cookie(key='framework', value='flask', expires=time.time()+6*60, secure=False, httponly=False, samesite=None)
    return resp
```

* set cookie 時，多設定三個參數：
  secure=False, httponly=False, samesite=None

* secure：
  如果設定為 True，表示此 cookie 僅在 Https 時才被傳送
  httponly：如設定為 True，表示 JavaScript 的Document.cookie API 無法取得 HttpOnly cookies

* samesite：
  可以設定成 Strict、Lax 和 None，功能如同剛剛所述

>[參考資料](https://www.maxlist.xyz/2020/05/07/flask-csrf/)

#### `Double Submit Cookie`

概念: 攻擊者的沒辦法讀寫目標網站的 cookie，所以 request 的 csrf token 會跟 cookie 內的不一樣

* 由 server 產生一組隨機的 token 並且加在 form 上面。
* 不用把這個值寫在 session 以外
* 同時也讓 client side 設定一個名叫 csrftoken 的 cookie，值也是同 一組 token。

```html
<!--當使用者按下 submit 的時候，server 比對 cookie 內的 csrftoken 與 form 
   裡面的 csrftoken，檢查是否有值並且相等，就知道是不是使用者發的了*-->
Set-Cookie: csrftoken=fj1iro2jro12ijoi1

<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
  <input type="submit" value="刪除文章"/>
</form>

```
>[參考資料](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)

>[參考資料](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)