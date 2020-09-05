<?php
require_once("./conn.php");
$id = $_GET['id'];
$sql = "DELETE FROM ruofan_categories where id=" . $id;
if($conn->query($sql)){
  header("Location: ./admin_category.php");
}else{
  die("failed.");
}
?>