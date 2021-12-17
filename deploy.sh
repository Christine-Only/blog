# 终止一个错误
set -e

yarn docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m "deploy脚本更新"

git push --force https://github.com/Christine-Only/blog.git master:gh-pages