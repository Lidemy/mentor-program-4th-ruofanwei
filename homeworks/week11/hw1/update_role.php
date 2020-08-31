<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫
  require_once('utilis.php');

  if (
    empty($_GET['id']) ||
    empty($_GET['role'])
    ){
    die('Incomplete information, please reconfirm');
  }
  //get username
 $username = $_SESSION['username'];
 $user = getUserFromUsername($username);
 $id = $_GET['id'];
 $role = $_GET['role'];

 if(!$user || $user['role'] !== 'admin'){
   header('Location: backstage.php');
   exit;
 }

  // 更新users這個table,要把nickname設置成新的，並且要找到對應的username
  $sql = "update ruofan_users set role=? where id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $role, $id);
 
  
  
  // 判斷是否執行成功
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: backstage.php"); // 自動跳轉回 index.php
?>