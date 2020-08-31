<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫
  require_once('utilis.php');

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
    ){
    echo "<script>
    alert('❗Please make sure you have the access to login❗');
    window.location.href='login.php';
    </script>";
    
    
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
    echo "<script>
    alert('❗Please make sure you have the access to login❗');
    window.location.href='login.php';
    </script>";
    // 帳號密碼輸入失敗
    exit(); // 加上exit()，若是沒有查到使用者資料就不會執行下方程式碼
  };
  // 如果資料庫內有查到使用者資料，把password拿出來
  $row = $result->fetch_assoc();
  // password_verify() 第一個參數是我們輸入的密碼，第二個是資料庫裡面的password
  // password_verify() 會比對我們輸入的密碼跟hash過的密碼是不是一樣的
  if(password_verify($password, $row['password'])){
  
    $_SESSION['username'] = $username;
    header("Location: index.php"); 
  }else{
    echo "<script>
    alert('❗Please make sure you have the access to login❗');
    window.location.href='login.php';
    </script>";
  };

  
?>