<?php
  require_once('conn.php');
  // 輸出jason資料
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  // 錯誤處理
  if(
    // 如果前端post的資料是空的
    empty(trim($_POST['content'])) ||
    empty(trim($_POST['nickname'])) ||
    empty(trim($_POST['site_key']))
  ){
    $json = array(
      "ok" => false,
      "message" => "Please complete both nickname and content!"
    );
    // 把資料變成jason的格式
    $response = json_encode($json);
    echo $response;
    die();
  }
  // 錯誤處理完之後可以拿資料
  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];
  $content = $_POST['content'];
  //拿完資料後可以新增到資料庫裡面
  $sql = "insert into ruofan_discussions(site_key, nickname, content) values(?,?,?)";
  $stmt = $conn->prepare($sql);
  // 把參數帶上去
  $stmt->bind_param('sss', $site_key, $nickname, $content);
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
  // 如果成功有資料 產生一個物件
  $json = array(
    "ok" => true,
    "message" => "success"
  );
  // 把物件用json_encode這個function變成json的字串後輸出，這樣client就可以接收到
  //可以用postman測試
  $response = json_encode($json);
  echo $response;

?>
