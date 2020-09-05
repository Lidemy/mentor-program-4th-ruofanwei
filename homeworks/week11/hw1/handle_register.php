<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫

  if (
    empty($_POST['nickname']) || 
    empty($_POST['username']) ||
    empty($_POST['password'])
    ){
    header("Location: register.php?errCode=1"); // 自動跳轉回 register.php
    die();
  }

   // $_POST['key-name'] 取得輸入的資料
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
  // 密碼經過內建函式，存到資料庫裡面會是hash的結果，保護使用者的密碼

  // 原本的字串拼接改成用問號
  $sql = "insert into ruofan_users(nickname, username, password) values(?, ?, ?)";
  // prepare() 把傳進去的參數自動拼起來，就不會有SQL Injection的問題，傳入的資料不會被當成指令執行
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nickname, $username, $password);
  
  // 判斷是否執行成功
  $result = $stmt->execute();
  if (!$result) {
    $code = $conn->errno;
    if($code === 1062){
    header("Location: register.php?errCode=2"); 
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username; // 註冊完後即是登入狀態
  header("Location: index.php"); // 註冊完成導回 index.php
?>