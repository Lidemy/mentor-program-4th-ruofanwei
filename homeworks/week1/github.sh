# github.sh username <= 帶入想查詢的 github 帳號
//  curl : 發送 request

echo curl -X GET https://api.github.com/users/aszx87410


//使用 curl取得資料並透過 jq 顯示出指定的資料
data=`curl -X GET https://api.github.com/users/aszx87410 | jq '.'`
echo $data | jq '.name'
echo $data | jq '.bio'
echo $data | jq '.location'
echo $data | jq '.blog'
