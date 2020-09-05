<?php
  require_once("conn.php");

  
  function getUserFromUsername($username){
    global $conn;
    $sql = sprintf(
      "select * from ruofan_users where username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // username, id, nickname, role
  };

  

?>
