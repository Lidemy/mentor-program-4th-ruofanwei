<?php
  require_once('conn.php');
  // 輸出jason資料
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (empty($_POST['todo'])){
    $json = array(
      'ok' => false, 
      'message' => 'no todos.'
      );
    $response = json_encode($json);
    echo $response;
    die();
  } 
    $todo = $_POST['todo'];

    $sql = "INSERT INTO ruofan_todos(todo) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $todo);
    $result = $stmt->execute();
    if(!$result){
      $json = array(
      'ok' => false, 
      'message' => 'no todos.'
      );
      $response = json_encode($json);
      echo $response;
      die();
    }
  $json = array( 
      "ok" => true, 
      "message" => "success",
      "id" => $conn->insert_id
    );
    $response = json_encode($json);
    echo $response;
  

?>
