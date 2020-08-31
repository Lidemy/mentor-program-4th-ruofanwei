<?php
  session_start();
  require_once("./conn.php");
  require_once('utilis.php');

  $title = $_POST['title'];
  $content = $_POST['content'];
  $category_id = $_POST['category_id'];

  if(
    empty($title) || empty($content) || empty($category_id)
    ){
      echo "<script>
      alert('❗Please make sure you have add title and content❗');
      window.location.href='add.php';
      </script>";
    die();
  }



  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  $sql = "insert into ruofan_articles(title, content, category_id) values(?, ?, ?)";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $title, $content, $category_id);
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header("Location: index.php");

?>