### Git 查漏补缺

```git
git push <远程主机名> <本地分支名>:<远程分支名>

栗子：
git push git@github.com:xxx.git master:gh-pages
```
>如果本地分支名和远程分支名相同，则可以省略冒号：
```git
git push <远程主机名> <本地分支名>
git push origin master or git push
```
>如果本地版本与远程版本有差异，但又要强制推送可以使用--force参数：
```git
git push --force | -f origin master
```
>删除主机的分支可以使用--delete或-d参数，一下命令表示删除origin主机的master分支
```git
git push --delete | -d origin master
```
