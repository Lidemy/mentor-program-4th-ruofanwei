<?php
  require_once('conn.php');
  // 輸出jason資料
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  // 錯誤處理
  if(
    // 如果前端post的資料是空的
    empty($_GET['site_key'])
  ){
    $json = array(
      "ok" => false,
      "message" => "Please send site_key in url"
    );
    // 把資歷變成jason的格式
    $response = json_encode($json);
    echo $response;
    die();
  }
  // 錯誤處理完之後可以拿資料
  $site_key = $_GET['site_key'];
  

  //拿完資料後可以新增到資料庫裡面
  $sql = "select id, nickname, content, created_at from ruofan_discussions where site_key = ? " .
   (empty($_GET['before']) ? "" : " and id < ?") . 
   " order by id desc limit 5 ";
  $stmt = $conn->prepare($sql);
  // 如果before是空的
  if (empty($_GET['before'])){
    // 只帶一個參數上去
    $stmt->bind_param('s', $site_key);
  }else{
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }
  
  
  $result = $stmt->execute();
  //執行完之後可以根據內容來看有沒有成功
  //如果沒有資料
  if(!$result){
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
 // 判斷完錯誤處理後要把東西拿回來
 $result = $stmt->get_result();
 $discussions = array();
 while($row = $result->fetch_assoc()){
   array_push($discussions, array(
    "id" => $row["id"],
    "nickname" => $row["nickname"],
    "content" => $row["content"],
    "created_at" => $row["created_at"]
   ));
 }


  // 如果成功有資料 產生一個物件
  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );
  // 把物件用json_encode這個function變成json的字串後輸出，這樣client就可以接收到
  //可以用postman測試
  $response = json_encode($json);
  echo $response;

?>
