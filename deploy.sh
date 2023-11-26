# 终止一个错误
set -e

yarn docs:build

cd docs/.vuepress/dist

git init
git config --local user.email "tsy17321289030@163.com"
git config --local user.name "Christine-Only"
git add -A
git commit -m "deploy脚本更新"

git push --force git@github.com:Christine-Only/blog.git master:gh-pages

cd -