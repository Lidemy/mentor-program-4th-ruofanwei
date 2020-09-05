<?php 

session_start();
require_once("./conn.php"); // 連線到資料庫
require_once("./utilis.php");

/*
  1. 從cookie裡面讀取PHPSESSID(token)
  2. 從檔案裡面讀取session id內容
  3. 放到$_SESSION
*/
$username = NULL;
$user = NULL;
if(!empty($_SESSION['username'])){
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
}

$page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

$stmt = $conn->prepare(
  'select '. 
   'C.id as id, C.content as content, '. 
   'C.create_at as create_at, U.nickname as nickname, U.username as username '. 
   'from ruofan_comments as C '.
  'left join ruofan_users as U on C.username = U.username '.
  'where C.is_deleted IS NULL '.
  'order by C.id desc '.
  'limit ? offset ? '
);
$stmt->bind_param('ii', $items_per_page, $offset);
$result = $stmt->execute();
if(!$result){
  die('Error:' . $conn->error);
}
$result = $stmt->get_result();
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
      <?php } else { ?>
    <a class="btn" href="logout.php">Logout</a>
    <span class="btn update_nickname">update nickname</span>
    <?php if($user && $user['role'] === 'admin'){ ?>
    <spna><a class="btn backstage" href="backstage.php">backstage</a></span>
    <?php } ?>
    <form class="hide board_nickname_form" action="update_user.php" method="POST">
    <div class="board_nickname">
      <span class="new_nickname">new nickname：</span>
      <input type="text" name="nickname" />
    </div>
    <input class="btn" type="submit"/>
    </form>
    <h3 class="hi">おはよう!<?php echo $user['nickname']; ?></h3>
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
    <?php if($username && !hasQualified($user, 'create', NULL)){ ?>
      <h3 class="advice">You do not have permission.</h3>
    <?php } if ($username){ ?>
    <form class="form" method="POST" action="comment.php">
    <textarea onkeyup="this.value=this.value.replace(/\s+/g,'')" name="content" rows="5"></textarea>
    <input type="submit" class="submit" value="Send">
    </form>
    <?php } else { ?>
      <h3 class="advice">Please login first!</h3>
    <?php } ?>
   </main>
    
      <?php
      // $row = $result->fetch_assoc() 把 𝑟𝑒𝑠𝑢𝑙𝑡中的資料，一筆一筆抓出來給row
      // while 迴圈，把資料一筆一筆印出
      while ($row = $result->fetch_assoc()){
      ?>
      <section class="message">
      <div class="card">
        <div class="avatar">
          <?php $num = rand(1,15); ?>
          <img class="avatar_img" src="img/<?php echo $num ?>.png"">
          
        </div>
        <div class="card_body">
          <div class="info">             
            <span class="card_author"><?php echo htmlspecialchars($row['nickname'], ENT_QUOTES); // 顯示留言者的暱稱 ?>
          (@<?php echo htmlspecialchars($row['username'], ENT_QUOTES); ?>)
          </span>
            <span class="card_time"><?php echo $row['create_at']; // 顯示留言的時間 ?>
            </span>
            <?php if (hasQualified($user, 'update', $row)){ ?>
            <a class="update_comment" href="update_comment.php?id=<?php echo $row['id']?>">update</a>
            <a class="delete_comment" href="delete_comment.php?id=<?php echo $row['id']?>">delete</a>
            <?php } ?>
          </div>
          <p class="card_content"><?php echo htmlspecialchars($row['content'], ENT_QUOTES); // 顯示留言內容 ?></p>
        </div>
      </div>
      </section>
      <?php } // 把<div class="card"></div>包住 ?>
      <?php
        $stmt = $conn->prepare(
          'select count(id) as count from ruofan_comments where is_deleted IS NULL '
        );
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="paginator">
          <?php if ($page != 1){?>
            <a href="index.php?page=1">first page</a>
            <a href="index.php?page=<?php echo $page - 1 ?>">previous</a>
          <?php } ?>
          <?php if ($page != $total_page){ ?>
            <a href="index.php?page=<?php echo $page + 1 ?>">next</a>
            <a href="index.php?page=<?php echo $total_page ?>">last page</a>
          <?php }?>
        </div>
      <div class="page_info">
        <span>total: <?php echo $count ?>comments, pages:</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
        
  <script>
  var btn = document.querySelector('.update_nickname')
  btn.addEventListener('click',function(){
    var form = document.querySelector('.board_nickname_form')
    form.classList.toggle('hide')
  })
  </script>
</body>
</html>