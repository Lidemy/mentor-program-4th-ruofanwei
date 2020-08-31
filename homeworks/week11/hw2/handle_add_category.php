<?php
  session_start();
  require_once("./conn.php");

  $name = $_POST['name'];

  if(empty($name)){
    die('empty data');
  }

  $sql = "insert into ruofan_categories(name) values(?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $name);
  $result = $stmt->execute();
  if($result){
    header("Location: ./admin_category.php");
  }else{
    die("failed." . $conn->error);
  }
?>