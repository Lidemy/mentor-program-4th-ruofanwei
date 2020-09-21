第一次部署網站，很感謝有學長姐的留下的筆記當作參考！
部署 AWS EC2 雲端主機、設定 LAMP 環境＆phpmyadmin、設定 DNS、FileZilla 連接 EC2、修正 phpmyadmin 錯誤訊息，都蠻順利的。
但網站沒有順利呈現，接著而來的另一個錯誤訊息unable to connect to aws machine : operation timed out，試著用查到的資料修正，但還是沒有解決。
決定重新 launch instance！
重新部署後才發現原先網站沒有順利呈現的原因是檔案沒有放在filezilla正確的位置上(/var/www/html)，解決問題後網站就完成部署拉！
能夠實際練習網站部署真的蠻印象深刻的，看完老師的網站部署講解後，對於每個步驟都在做什麼相對比較有概念，真的很感謝老師！

[成功部署的PHP作業](http://ruofan.tw/comment/index.php)