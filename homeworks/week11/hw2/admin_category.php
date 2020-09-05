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
          <h1>管理分類</h1>
<a class="admin_add" href="./add_category.php">新增分類</a>  <a class="admin_manage" href="./admin.php">管理文章</a>
          <ul>
          <?php
          $sql = "SELECT * FROM ruofan_categories ORDER BY created_at DESC";
          $result = $conn->query($sql);
          if ($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
              echo "<li class='admin_li'>";
              echo $row['name'];
              echo "<a class='admin_update' href='update_category.php?id=$row[id]'>update</a>";
              echo "<a class='admin_delete' href='delete_category.php?id=$row[id]'>delete</a>";
              echo "</li>";
            }
          }
          ?>
          </ul>
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