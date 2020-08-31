<?php
  session_start();
  require_once('conn.php'); // 連線到資料庫
  require_once('utilis.php');

  if (
    empty($_POST['content'])
    ){
    header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
    die('Incomplete information, please reconfirm');
  }
  //get username
 $username = $_SESSION['username'];
 $user = getUserFromUsername($username);
 $id = $_POST['id'];
 $content = $_POST['content'];

  // 更新users這個table,要把nickname設置成新的，並且要找到對應的username
  $sql = "update ruofan_comments set content=? where id=? and username=?";
  if (isAdmin($user)){
    $sql = "update ruofan_comments set content=? where id=?";
 }
  // stmt是statement的縮寫
  // prepare() 把傳進去的參數自動拼起來，就不會有SQL Injection的問題，傳入的資料不會被當成指令執行
  $stmt = $conn->prepare($sql);
  if (isAdmin($user)){
    $stmt->bind_param('si', $content, $id);
 }else{
    // bind_param 把參數放進去，s代表字串的類型，有幾個參數就有幾個s
  $stmt->bind_param('sis', $content, $id, $username);
 }
  
  
  // 判斷是否執行成功
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php"); // 自動跳轉回 index.php
?>