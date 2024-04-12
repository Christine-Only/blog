<template><div><h1 id="git" tabindex="-1"><a class="header-anchor" href="#git"><span>Git</span></a></h1>
<h2 id="git-checkout" tabindex="-1"><a class="header-anchor" href="#git-checkout"><span>git checkout</span></a></h2>
<h3 id="基于远程分支创建本地新分支" tabindex="-1"><a class="header-anchor" href="#基于远程分支创建本地新分支"><span>基于远程分支创建本地新分支</span></a></h3>
<p>格式：</p>
<p><code v-pre>git checkout -b 新的分支名 远程仓库别名/远程仓库分支名</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> christine origin/detail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="用于检出某一个指定文件或文件夹" tabindex="-1"><a class="header-anchor" href="#用于检出某一个指定文件或文件夹"><span>用于检出某一个指定文件或文件夹</span></a></h3>
<p>格式：
<code v-pre>git checkout [&lt;commit id&gt;] [--] &lt;paths&gt;</code></p>
<ul>
<li>commit commit id，默认是暂存区</li>
<li>-- 用于分隔文件路径和commit</li>
<li>paths 文件路径</li>
</ul>
<p>如果不填写commit id，则默认会从暂存区检出该文件，如果暂存区为空，则该文件会回滚到最近一次的提交状态。</p>
<p>如果填写commit id（既可以是commit hash也可以是分支名称还可以是tag，其本质上都是commit hash），则会从指定commit hash中检出该文件。用于恢复某一个文件到某一个提交状态。</p>
<h2 id="git-push" tabindex="-1"><a class="header-anchor" href="#git-push"><span>git push</span></a></h2>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git push &lt;远程主机名> &lt;本地分支名>:&lt;远程分支名>

栗子：
git push git@github.com:xxx.git master:gh-pages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果本地分支名和远程分支名相同，则可以省略冒号：</p>
</blockquote>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git push &lt;远程主机名> &lt;本地分支名>
git push origin master or git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果本地版本与远程版本有差异，但又要强制推送可以使用--force参数：</p>
</blockquote>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git push --force | -f origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>删除远程的分支可以使用--delete或-d参数，以下命令表示删除远程的master分支</p>
</blockquote>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git push --delete | -d origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="git-clone" tabindex="-1"><a class="header-anchor" href="#git-clone"><span>git clone</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://codeup.aliyun.com/xxx/xxx.git/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="/blog/git403.jpg" alt="alt git报403">
<strong>错误原因</strong>：
git 客户端缓存了错误的密码，账号密码和本地存储的混淆。一般是多个git账号会导致这样的情况，比如自己的账号和公司的账号同时一起使用。</p>
<p><strong>解决方案</strong>：
clone时，把账号和密码拼接在clone的url中。</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://用户名:密码@codeup.aliyun.com/xxx/xxx.git/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="git-reset" tabindex="-1"><a class="header-anchor" href="#git-reset"><span>git reset</span></a></h2>
<blockquote>
<p>git reset [--soft | --mixed | --hard] [HEAD]</p>
</blockquote>
<ul>
<li><code v-pre>--mixed</code>： 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。</li>
<li><code v-pre>--soft</code>： 参数用于回退到某个版本。</li>
<li><code v-pre>--hard</code>： 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交。</li>
</ul>
<p>回退上个版本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>HEAD是指向当前版本的指针，HEAD^表示上个版本,HEAD^^表示上上个版本</p>
<p>HEAD~0 表示当前版本</p>
<p>HEAD~1 上一个版本</p>
<p>HEAD^2 上上一个版本</p>
<p>HEAD^3 上上上一个版本</p>
</div>
<p>回退到指定版本：</p>
<p>栗子：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>42eae13 <span class="token punctuation">(</span>HEAD -<span class="token operator">></span> master<span class="token punctuation">)</span> 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果发现，在第四次修改有错误，需要回滚到第三次修改，就可以用reset命令来回退。</p>
<p>执行 <code v-pre>git reset --hard 97ea0f9</code>，这个时候，git的提交历史变为:</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>97ea0f9 <span class="token punctuation">(</span>HEAD -<span class="token operator">></span> master<span class="token punctuation">)</span> 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到master当前指向97ea0f9这个版本，我们回到了第三次修改。</p>
<p>使用reset命令，Git会把要回退版本之后提交的修改都删除掉。要从第四次修改回退到第一次修改，那么会删除第二、三、四次的修改。【注：这里并不是真正的物理删除】</p>
<h2 id="git-revert" tabindex="-1"><a class="header-anchor" href="#git-revert"><span>git revert</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> revert commit-id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>撤销某个提交，但执行命令后进入编辑界面。</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> revert <span class="token parameter variable">-n</span> commit-id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>撤销某个提交，但执行命令后不进入编辑界面，更改的文件会移至暂存区，需要手动提交，这与 <code v-pre>git revert commit-id</code> 的差别就是撤销和提交分开了。</p>
<h2 id="git-pull-报错error" tabindex="-1"><a class="header-anchor" href="#git-pull-报错error"><span>git pull 报错error</span></a></h2>
<p>error: cannot lock ref 'refs/remotes/origin/xxx': 'refs/remotes/origin/c' exists; cannot create 'refs/remotes/origin/xxx'</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote prune origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有些分支在远程其实早就被删除了，但是在你本地依然可以看见这些被删除的分支，在根目录下运行 git remote prune origin刷新本地仓库与远程仓库的保持这些改动的同步，这样就不会报错了。</p>
<h2 id="git-branch" tabindex="-1"><a class="header-anchor" href="#git-branch"><span>git branch</span></a></h2>
<ol>
<li>查看本地分支</li>
</ol>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查看所有分支</li>
</ol>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git branch -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>使用 <code v-pre>git branch -a</code> 命令可以查看所有本地分支和远程分支，发现远程的remote分支已经删除了，但本地还显示。</p>
</div>
<ol start="3">
<li>查看远程分支</li>
</ol>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git branch -r
or 
git remote show origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>使用命令 <code v-pre>git remote show origin</code>，可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息。</p>
</div>
<ol start="4">
<li>同步本地分支</li>
</ol>
<div class="language-git line-numbers-mode" data-ext="git" data-title="git"><pre v-pre class="language-git"><code>git remote prune origin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="如何保持本地代码与-fork-仓库远程代码一致" tabindex="-1"><a class="header-anchor" href="#如何保持本地代码与-fork-仓库远程代码一致"><span>如何保持本地代码与 fork 仓库远程代码一致</span></a></h2>
<ol>
<li>添加上游仓库：</li>
</ol>
<ul>
<li>在本地仓库中，添加原始仓库作为上游（upstream）。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div><ul>
<li>现在你有两个远程仓库：origin（指向你的fork）和upstream（指向原始仓库）。</li>
</ul>
<ol start="2">
<li>保持更新：</li>
</ol>
<ul>
<li>定期从上游仓库拉取更新到你的本地仓库。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch upstream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>如果有更新，使用git merge或git rebase将这些更新合并到你的本地分支中。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> merge upstream/main
<span class="token comment"># 或者</span>
<span class="token function">git</span> rebase upstream/main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>处理冲突：</li>
</ol>
<ul>
<li>如果在合并过程中出现冲突，你需要手动解决这些冲突，并提交解决后的代码。</li>
</ul>
<ol start="4">
<li>推送更新到你的Fork：</li>
</ol>
<ul>
<li>将合并后的更新推送到你的GitHub仓库。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


