<?php 

session_start();
require_once('./conn.php'); // 連線到資料庫
require_once("./utilis.php");

$id = $_GET['id'];

$username = NULL;
$user = NULL;
if(!empty($_SESSION['username'])){
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
}
$stmt = $conn->prepare(
  'select * from ruofan_comments where id = ?'
);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
if(!$result){
  die('Error:' . $conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
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
    
    <h1 class="title">Update Comments</h1>
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
    
    <form class="form" method="POST" action="handle_update_comment.php">
    <textarea name="content" rows="5"><?php echo $row['content']; ?></textarea>
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>"/>
    <input type="submit" class="submit" value="Send">
    </form>
   </main>

</body>
</html>