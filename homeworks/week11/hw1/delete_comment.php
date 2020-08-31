<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫
  require_once('utilis.php');

  if (
    empty($_GET['id'])
    ){
    header('Location: index.php?errCode=1');
    die('Incomplete information, please reconfirm');
  }
 
 
 $id = $_GET['id'];
 $username = $_SESSION['username'];
 $user = getUserFromUsername($username);
 $sql = "update ruofan_comments set is_deleted=1 where id=? and username=?";
   if (isAdmin($user)){
    $sql = "update ruofan_comments set is_deleted=1 where id=?";
 }
  // stmt是statement的縮寫
  // prepare() 把傳進去的參數自動拼起來，就不會有SQL Injection的問題，傳入的資料不會被當成指令執行
  $stmt = $conn->prepare($sql);
  if(isAdmin($user)){
    $stmt->bind_param('i', $id);
  }else{
    $stmt->bind_param('is', $id, $username);
  }

  // 判斷是否執行成功
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php"); // 自動跳轉回 index.php
?>