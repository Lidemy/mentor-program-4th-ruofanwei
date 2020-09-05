<?php
require_once("conn.php");
session_start();
require_once('utilis.php');
if(empty($_SESSION['username'])){
  header('Location: index.php');
  exit;
}
$id = $_GET['id'];
$sql = "SELECT * FROM ruofan_articles where id=" . $id;
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$sql_category = "SELECT * FROM ruofan_categories ORDER BY created_at DESC";
$result_category = $conn->query($sql_category);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🤔Ruofan's Blog</title>
  <link rel="stylesheet" href="style.css">
 
  
</head>
<body>
  <nav class="nav">
  <h1></h1>
  <div class="button_container" id="toggle">
  <span class="top"></span>
  <span class="middle"></span>
  <span class="bottom"></span>
</div>
<div class="overlay" id="overlay">
  <div class="overlay-menu">
  <ul>
      <li>
        <a href="./index.php">首頁</a>
      </li>
      <li>
        <a href="./about.php">關於我</a>
      </li>
      <?php if(!empty($_SESSION['username'])){ ?>
           <li>
        <a href="./add.php">發布文章</a>
      </li>
      <li>
        <a href="./admin.php">管理後台</a>
      </li>
      <li>
        <a href="./logout.php">登出</a>
      </li>
          <?php }else{ ?>
          <li>
        <a href="./login.php">登入</a>
      </li>
        </ul>
          </div>
            </div>
         <?php } ?>
          </nav>
          <header class="container">
          <div class="section">
          <h1>編輯文章</h1>
          <form method="POST" action="handle_update.php">
          <div class="add_article_title">title: <input type="text" name="title" placeholder="write something..." value="<?php echo $row['title'] ?>"/></div>
          <div   class="add_article_content">content: <br><textarea id="editor" type="text" name="content" placeholder="write something..."><?php echo $row['content'] ?></textarea></div>
          <div class="category_type">category：<select name="category_id" type="text">
          <?php
          while($row_category = $result_category->fetch_assoc()){
            $id = $row_category["id"];
            $name = $row_category["name"];
            $is_selected = $row['category_id'] === $id ? "selected" : "";
            echo "<option value='$id' $is_selected>$name</option>";
          }
          ?>
          
          </select>
          </div>
          <input type="hidden" name="id" value="<?php echo $row['id']; ?>"/>
          <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER'] ?>"/>
<input class="add_submit" type="submit" value="submit">
          </div>
          <script>

          var hamberger = document.querySelector('#toggle')
          hamberger.addEventListener('click',function(){
            var form = document.querySelector('#overlay')
            hamberger.classList.toggle('active')
            form.classList.toggle('open')
              })
              
          
          </script>
        </body>
        </html>