<?php
  session_start();
  require_once("./conn.php");
  require_once('utilis.php');
  $title = $_POST['title'];
  $content = $_POST['content'];
  $category_id = $_POST['category_id'];
  $id = $_POST['id'];

  $page = $_POST['page'];

  if(
    empty($title) || empty($content) || empty($category_id) || empty($id)
    ){
      echo "<script>
      alert('❗Please make sure you have update title and content❗');
      window.location.href= 'update.php?id=$id';
      </script>";
     die();
  }


  $sql = "UPDATE ruofan_articles SET title =?, content=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);

  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }
  header("Location: " . $page);
?>