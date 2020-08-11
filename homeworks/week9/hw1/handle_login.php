<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
    ){
    header("Location: register.php?errCode=1"); // 自動跳轉回 register.php
    die();
  }

   // $_POST['key-name'] 取得輸入的資料
  $username = $_POST['username'];
  $password = $_POST['password'];

  
  // 資料庫如果有一樣的帳號密碼就是登入成功
  $sql = "select * from ruofan_users where username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  
  // 看有沒有執行成功
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  // 把結果拿回來
  $result = $stmt->get_result(); 
  // 如果資料庫內沒有查到使用者資料？
  if($result->num_rows === 0){
    header("Location: login.php?errCode=2"); 
    // 帳號密碼輸入失敗
    exit(); // 加上exit()，若是沒有查到使用者資料就不會執行下方程式碼
  };
  // 如果資料庫內有查到使用者資料，把password拿出來
  $row = $result->fetch_assoc();
  // password_verify() 第一個參數是我們輸入的密碼，第二個是資料庫裡面的password
  // password_verify() 會比對我們輸入的密碼跟hash過的密碼是不是一樣的
  if(password_verify($password, $row['password'])){
  // 如果資料庫有資料
  // 給token
  // 登入成功，把username存在session裡面
    /* 
      1. 產生session id(token)
      2. 把username寫入檔案
      3. set-cookie: session-id
    */
    $_SESSION['username'] = $username;
    header("Location: index.php"); 
  }else{
    header("Location: login.php?errCode=2"); 
  };

  
?>