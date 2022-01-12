---
sidebar: auto
---
# Git

## git push

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
>删除远程的分支可以使用--delete或-d参数，以下命令表示删除远程的master分支
```git
git push --delete | -d origin master
```

## git clone
```shell
git clone https://codeup.aliyun.com/xxx/xxx.git/
```
![alt git报403](/blog/git403.jpg)
**错误原因**：
git 客户端缓存了错误的密码，账号密码和本地存储的混淆。一般是多个git账号会导致这样的情况，比如自己的账号和公司的账号同时一起使用。

**解决方案**：
clone时，把账号和密码拼接在clone的url中。
```shell
git clone https://用户名:密码@codeup.aliyun.com/xxx/xxx.git/
```