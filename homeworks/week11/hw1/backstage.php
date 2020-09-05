<?php 

session_start();
require_once("./conn.php"); // 連線到資料庫
require_once("./utilis.php");



$username = NULL;
$user = NULL;
if(!empty($_SESSION['username'])){
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
}

if($user == NULL || $user['role'] !== 'admin'){
  header('Location: index.php');
  exit;
}

$stmt = $conn->prepare(
  'select id, role, nickname, username from ruofan_users order by id asc'
);

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
  <title>Backstage management</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
  注意！註冊時請勿使用任何真實的帳號或密碼，本站為練習用網站！ 
  </header>
  <main class="user_list">
    <div>
    <a class="btn" href="index.php">Back to message board</a>
    </div>
    <h1 class="title">users list</h1>
    <form class="form" method="POST" action="handle_backstage.php">
    <table>
      <tr>
        <th>id</th>
        <th>role</th>
        <th>nickname</th>
        <th>username</th>
        <th>update role</th>
      </tr>
      <?php
      while ($row = $result->fetch_assoc()){ ?>
        <tr>
        <td><?php echo htmlspecialchars($row['id'], ENT_QUOTES); ?></td>
        <td><?php echo htmlspecialchars($row['role'], ENT_QUOTES); ?></td>
        <td><?php echo htmlspecialchars($row['nickname'], ENT_QUOTES); ?></td>
        <td><?php echo htmlspecialchars($row['username'], ENT_QUOTES); ?></td>
        <td>
          <a class="update_role" href="update_role.php?role=admin&id=<?php echo htmlspecialchars($row['id'], ENT_QUOTES); ?>">admin</a>
          <a class="update_role" href="update_role.php?role=customer&id=<?php echo htmlspecialchars($row['id'], ENT_QUOTES); ?>">customer</a>
          <a class="update_role" href="update_role.php?role=prohibit&id=<?php echo htmlspecialchars($row['id'], ENT_QUOTES); ?>">prohibit</a>
        </td>
        </tr>
      <?php } ?>
    </table>
    </form>
  </main>
</body>
</html>