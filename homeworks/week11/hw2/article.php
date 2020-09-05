<?php 
require_once('./conn.php'); 
require_once('./utilis.php');
session_start();
$id = $_GET['id'];

$sql = "SELECT A.id, A.title, A.content, A.created_at, C.name FROM ruofan_articles as A LEFT JOIN ruofan_categories as C ON A.category_id = C.id WHERE A.id = " . $id;

$result = $conn->query($sql);
$row = $result->fetch_assoc();
$title = $row['title'];
$content = $row['content'];



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
  <h1>Ruofan's Blog</h1>
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
            <header class="article_container">
          <div class="section">
            <h1 class="article_title"><?php echo htmlspecialchars($title, ENT_QUOTES); ?></h1>
            <h2 class="article_name">category:<?php echo $row['name']; ?>  <span><?php echo htmlspecialchars($row['created_at'], ENT_QUOTES); ?></span></h2>
            <p class='article_content'><?php echo htmlspecialchars($content, ENT_QUOTES); ?></p>
            <?php
            if(!empty($_SESSION['username'])){ 
            echo "<a class='article_update' href='update.php?id=$id'>update</a>";
             echo "<a class='article_delete' href='delete.php?id=$id'>delete</a>";
            } 
            ?>
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