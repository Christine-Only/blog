<template><div><h1 id="perttier配置" tabindex="-1"><a class="header-anchor" href="#perttier配置"><span>Perttier配置</span></a></h1>
<h2 id="perttier使用" tabindex="-1"><a class="header-anchor" href="#perttier使用"><span>Perttier使用</span></a></h2>
<p>prettier作为开发依赖记录在package.json里，跟着项目走，版本统一，既可以使用官方的默认配置，也可以指定一套内容的配置项。适合团队协作。</p>
<h2 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖"><span>安装依赖</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i prettier <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="运行命令" tabindex="-1"><a class="header-anchor" href="#运行命令"><span>运行命令</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>npx prettier <span class="token parameter variable">--write</span> ./src/App.tsx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>我们也可以不指定具体文件名，直接运行<code v-pre>npx prettier --write .</code> ,表示当前目录下的所有文件都会被格式化。</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p><code v-pre>prettier</code>默认不会处理<code v-pre>node_modules</code>里的文件，如果我们想忽略其他的文件或目录，可以在项目根目录下新建.prettierignore文件，表示忽略某些文件或文件夹，具体格式跟.gitignore类似.</p>
</div>
<h2 id="prettier配置项" tabindex="-1"><a class="header-anchor" href="#prettier配置项"><span>Prettier配置项</span></a></h2>
<p>首先在项目根目录新建一个<code v-pre>.prettierrc.js</code>的文件，结构如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主要有以下项</strong>：</p>
<ul>
<li>printWidth. 条件允许时每行字符长度大于该值时进行换行（prettier不会强行换行：比如将一个引号包裹的字符串折行）。默认为80</li>
<li>tabWidth. 缩进空格数；默认为2</li>
<li>semi. 语句末尾是否带分号</li>
<li>singleQuote. 是否将双引号转换为单引号。双引号里包含单引号时不会被格式化。</li>
<li>quoteProps. 对象属性引号的配置</li>
<li>jsxSingleQuote. jsx文件里使用单引号</li>
<li>bracketSpacing. 圆括号之间添加空格，如{ a: b }</li>
<li>arrowParens. 箭头函数，参数添加圆括号，如(x)=&gt;y</li>
<li>parser. 指定解析器，我们一般不需要默认的就行</li>
<li>trailingComma:'es5'</li>
<li>等等
更详细的介绍可查看文档<a href="https://prettier.io/docs/en/options.html" target="_blank" rel="noopener noreferrer">Perttier<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>trailingComma: &quot;es5&quot;:</code> 只会在多行对象的最后一个属性加上逗号，单行的对象不会加。</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>const obj1 = {
  a: 1,
  b: 2   // 会加逗号
}
const obj2 = { a: 1, b: 2 } // 不会加逗号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="git集成" tabindex="-1"><a class="header-anchor" href="#git集成"><span>Git集成</span></a></h2>
<p>目前，我们已经配置好了prettier的项，接下来就剩运行格式化的时机了，什么运行最好呢？<em>当然是代码提交的时候</em>。</p>
<p>我们需要在开发提交代码时，运行prettier格式化<code v-pre>staged</code>的代码，之后再提交，这就需要用到Git Hooks了，不过已经有工具帮我们集成了，我们只需安装并简单配置以下即可。 这里介绍两种：</p>
<p><strong>pre-commit</strong></p>
<ul>
<li>安装依赖： <code v-pre>npm i pre-commit -D</code></li>
<li>配置脚本：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token comment">//package.json</span>
<span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prettier"</span><span class="token operator">:</span> <span class="token string">"npx prettier --write ."</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"pre-commit"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"prettier"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成安装和配置后，当开发者完成代码，执行<code v-pre>git add文件名或路径后</code>（即<code v-pre>stage</code>改变）的时候，会自动运行配置的<code v-pre>prettier</code>脚本，执行格式化，开发再将格式化后的新改变添加最后提交即可。</p>
<p><strong>lint-staged</strong></p>
<p>详细介绍请看下一遍ESlint配置的lint-staged!!!</p>
</div></template>


