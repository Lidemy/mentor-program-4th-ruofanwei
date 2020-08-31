<?php
  require_once("conn.php");

  function generateToken(){
    $s = '';
    for($i=1; $i<=16; $i++){
      $s .= chr(rand(65,90));
    }
    return $s;
  }

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

  function hasQualified($user, $action, $comment){
     if ($user["role"] = "admin"){
       return true;
     }
     if ($user["role"] = "customer"){
      if ($action === 'create') return true;
      return $comment["username"] === $user["username"];
    }
    if ($user["role"] = "prohibit"){
      return $action !== 'create';
    }
  }

  function isAdmin($user){
    if($user["role"] === "admin"){
      return true;
    }
  }

?>
