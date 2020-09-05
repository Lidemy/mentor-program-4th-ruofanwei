<?php 

require_once('./conn.php'); 
session_start();
require_once('utilis.php');


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
      
      <?php if(!empty($_SESSION['username'])){ ?>
        <li>
        <a href="./about.php">關於我</a>
      </li>
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
              
        
          
        <?php
          
          $sql = "SELECT * FROM ruofan_articles ORDER BY created_at DESC";
          $result = $conn->query($sql);
          if ($result->num_rows > 0){
          while($row = $result->fetch_assoc()){
            $id = htmlspecialchars($row['id'], ENT_QUOTES);
            $title = htmlspecialchars($row['title'], ENT_QUOTES);
            $content = substr(htmlspecialchars($row['content'], ENT_QUOTES), 0, 500);
            $created_at = htmlspecialchars($row['created_at'], ENT_QUOTES);
            
            echo "<div class='section'>";
            echo "<div class='article'>";
            echo "<h1><a href='./article.php?id=$id'>$title</a></h1>";
            if(!empty($_SESSION['username'])){ 
              echo "<a  class='index_update' href='update.php?id=$id'>update</a>";
              echo "<a  class='index_delete' href='delete.php?id=$id'>delete</a>";
            } 
            echo "<span><a  class='index_time' href='./article.php?id=$id'>$created_at</a></span>";
            echo "<p class='index_content'><a class='index_content' href='./article.php?id=$id'>$content</a></p>";
            echo "<p><a class='index_more' href='./article.php?id=$id'>read more</a></p>";
            echo "</div>";
            echo "</div>";
           }
          } 
          
          
          ?>
        
    
        

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