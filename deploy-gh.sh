# 终止一个错误
set -e
git add -A
git commit -m "文件更新"
git push -f git@github.com:Christine-Only/blog.git master

yarn docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m "deploy脚本更新"

git push -f git@github.com:Christine-Only/blog.git gh-pages