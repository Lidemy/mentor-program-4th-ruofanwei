## 交作業流程
1. 開啟github class 進入後會看到 lidemy/mentor-program-4th-ruofanwei，必須clone後面有自己名稱的才對。（我第一次就clone錯誤還上傳了QQ)
2. 先 clone github上的資料到電腦內 : git clone  https://github.com/ruofanwei/mentor-program-4th.git
3. 到mentor-program-4th的資料後 建立一個新的branch ex: wk1 : git checkout -b wk1
4. 在hw1.md寫作業
5. 存檔
6. git status 可以看到hw1內容被新增
7. git commit -am wk1
8. git push original wk1
9. 到github介面點選pull request
10. 點選compare & pull request
11. 接著按 creat pull request
12. 到Llidemy系統的作業列表新增作業
13. 看過自我檢測後才可以交作業
14. 助教看完作業後會merge branch 到master上
15. git pull original master讓遠端的master跟本地的master同步
16. 同步之後就可以把本地的wk1 branch刪掉了 ：git branch -d wk1
