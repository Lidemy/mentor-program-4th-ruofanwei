<?php 

require_once('./conn.php'); 
session_start();
require_once('utilis.php');


if(empty($_SESSION['username'])){
  header('Location: index.php');
  exit;
}


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
  <h1 style="color:white;">Ruofan's Blog</h1>
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
          <header class="admin_container">
          <div class="section">
          <h1>新增分類</h1>
          <form class="add_category_form" method="POST" action="handle_add_category.php">
<h2>category name: <input class="add_category_input" name="name"/></h2>
<input class="add_category_submit" type="submit" value="submit">
          </div>
           </header>
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