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
        <div class="login_section">
          <h1>Login</h1>
          <form class="form" method="POST" action="handle_login.php">
          <div class="account">Account: <input type="username" name="username">
          </div>
          <div class="password">Password: <input type="password" name="password"/>
          </div><input type="submit" class="login_submit" value="Send"/>
          </form>
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