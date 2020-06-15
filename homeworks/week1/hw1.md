## 交作業流程
1. 開啟github classroom 按下accept this assignment進入後會看到 lidemy/mentor-program-4th-ruofanwei，必須clone後面有自己名稱的才對。（我第一次就clone錯誤還上傳了QQ)。
2. 先 clone github上的資料到電腦內 : git clone  https://github.com/Lidemy/mentor-program-4th-ruofanwei.git ，可以先用 ls 看 mentor-program-4th-ruofanwei 存放的位置。
3. cd mentor-program-4th-ruofanwei 後再用 ls 可以看到 homework 的資料夾，用 open mentor-program-4th-ruofanwei 打開資料夾。
4. 到mentor-program-4th的資料夾後 建立一個新的branch：git branch "week1" ，接著使用：git checkout "week1"（切換到branch上），可以用 git status 確認是否已經在 week1 的branch 上
5. 在 hw1.md寫作業
6. 寫完記得存檔
7. git status 可以看到 hw1.md 內容被新增
8. 接著使用 ：git commit -am "week1"  ，可以用git status查看作業是否完成 commit
9. git push origin "week1" (將本地的資料推到ruofan的遠端)
10. 到 github 介面點選 pull request
11. 點選 compare & pull request 
12. 接著按 create pull request 
13. 看過自我檢測後才可以交作業
14. 到Lidemy系統的作業列表新增作業 貼上PR連結
15. 助教看完作業後會merge branch 到master上
16. 讓遠端的master跟本地的master同步，在做這一步之前用 git checkout master ，回到master的位置上之後
16. 使用 git pull origin master 讓遠端的master跟本地的master同步 
17. 同步之後就可以把本地的week1 branch刪掉了 ：git branch -d "week1"
