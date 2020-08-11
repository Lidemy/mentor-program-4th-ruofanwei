


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
    <a class="btn" href="index.php">Back to message board</a>
    <a class="btn" href="login.php">Login</a>
    </div>
    <h1 class="title">Register</h1>
    <?php
    if (!empty($_GET['errCode'])){
      $code = $_GET['errCode'];
      $msg = 'Error';
      if ($code === '1'){
        $msg = '資料不完整，請重新確認';
      }else if($code === '2'){
        $msg = 'Account has been registered';
      }
      echo '<h2 class="error">Error：' . $msg . '</h2>';
    }
    ?>
    <form class="form" method="POST" action="handle_register.php">
    <div class="nickname">
      <span class="nickname">Nickname:</span>
      <input type="text" name="nickname">
    </div>
    <div class="nickname">
      <span class="acount">Account:</span>
      <input type="text" name="username">
    </div>
    <div class="nickname">
      <span class="password">Password:</span>
      <input type="password" name="password">
    </div>
    <input type="submit" class="submit" value="Send">
    </form>
  </main>
</body>
</html>