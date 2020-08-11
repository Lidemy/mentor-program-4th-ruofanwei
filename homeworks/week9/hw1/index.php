<?php 

session_start();
require_once('./conn.php'); // 連線到資料庫

// 將 SQL 撈出的資料存在 $result 這個變數中，後新增的資料排在前面（倒敘）
// select * 會撈取全部資料放在 𝑟𝑒𝑠𝑢𝑙𝑡
// prepare() 把傳進去的參數自動拼起來，就不會有SQL Injection的問題，傳入的資料不會被當成指令執行
$stmt = $conn->prepare('SELECT * FROM ruofan_comments order by id desc');
// 判斷是否執行成功
$result = $stmt->execute();
// 若是連線出現錯誤，𝑟𝑒𝑠𝑢𝑙𝑡會是空值，錯誤訊息寫在conn->error
if (!$result){
  die('Error:' . $conn->error);
}
// 如果執行成功就把結果拿回來
$result = $stmt->get_result();
/*
  1. 從cookie裡面讀取PHPSESSID(token)
  2. 從檔案裡面讀取session id內容
  3. 放到$_SESSION
*/
$username = NULL;
if(!empty($_SESSION['username'])){
  $username = $_SESSION['username'];
};

?> 


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
  注意！註冊時請勿使用任何真實的帳號或密碼，本站為練習用網站！ 
  </header>
  <main class="board">
    <div>
      <?php if(!$username){ ?>
    <a class="btn" href="register.php">register</a>
    <a class="btn" href="login.php">Login</a>
      <?php }else { ?>
    <a class="btn" href="logout.php">Logout</a>
    <h3 class="hi">おはよう!<?php echo $username; ?></h3>
      <?php }?>
    </div>
    <h1 class="title">Comments</h1>
    <?php
    if (!empty($_GET['errCode'])){
      $code = $_GET['errCode'];
      $msg = 'Error';
      if ($code === '1'){
        $msg = 'Incomplete information, please reconfirm';
      }
      echo '<h2 class="error">' . $msg . '</h2>';
    }
    ?>
    <?php if ($username){ ?>
    <form class="form" method="POST" action="comment.php">
    <textarea name="content" rows="5"></textarea>
    <input type="submit" class="submit" value="Send">
    </form>
    <?php } else { ?>
      <h3 class="advice">Please login first!</h3>
    <?php } ?>
    <div class="hr"></div>
    <section>
      <?php
      // $row = $result->fetch_assoc() 把 𝑟𝑒𝑠𝑢𝑙𝑡中的資料，一筆一筆抓出來給row
      // while 迴圈，把資料一筆一筆印出
      while ($row = $result->fetch_assoc()){
      ?>
      <div class="card">
        <div class="avatar">
        </div>
        <div class="card_body">
          <div class="info">             
            <span class="card_author"><?php echo htmlspecialchars($row['nickname'], ENT_QUOTES); // 顯示留言者的暱稱 ?></span>
            <span class="card_time"><?php echo $row['create_at']; // 顯示留言的時間 ?>
            </span>
          </div>
          <p class="card_content"><?php echo htmlspecialchars($row['content'], ENT_QUOTES); // 顯示留言內容 ?></p>
        </div>
      </div>
      <?php
      } // 把<div class="card"></div>包住
      ?>
    </section>
  </main>
</body>
</html>