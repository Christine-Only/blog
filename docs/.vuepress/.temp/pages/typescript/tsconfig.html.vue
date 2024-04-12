<template><div><h1 id="tsconfig-json介绍" tabindex="-1"><a class="header-anchor" href="#tsconfig-json介绍"><span>tsconfig.json介绍</span></a></h1>
<p>tsconfig.json 是 TypeScript 项目的配置文件。如果一个目录下存在一个 tsconfig.json 文件，那么往往意味着这个目录就是 TypeScript 项目的根目录。</p>
<p>tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。</p>
<h2 id="tsconfig-json-重要字段" tabindex="-1"><a class="header-anchor" href="#tsconfig-json-重要字段"><span>tsconfig.json 重要字段</span></a></h2>
<ul>
<li>files - 设置要编译的文件的名称；</li>
<li>include - 设置需要进行编译的文件，支持路径模式匹配；</li>
<li>exclude - 设置无需进行编译的文件，支持路径模式匹配；</li>
<li>compilerOptions - 设置与编译流程相关的选项。</li>
</ul>
<h2 id="compileroptions-选项" tabindex="-1"><a class="header-anchor" href="#compileroptions-选项"><span>compilerOptions 选项</span></a></h2>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 基本选项 */</span>
    <span class="token property">"target"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>                       <span class="token comment">// 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'</span>
    <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>                  <span class="token comment">// 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'</span>
    <span class="token property">"lib"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                             <span class="token comment">// 指定要包含在编译中的库文件</span>
    <span class="token property">"allowJs"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                       <span class="token comment">// 允许编译 javascript 文件</span>
    <span class="token property">"checkJs"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                       <span class="token comment">// 报告 javascript 文件中的错误</span>
    <span class="token property">"jsx"</span><span class="token operator">:</span> <span class="token string">"preserve"</span><span class="token punctuation">,</span>                     <span class="token comment">// 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'</span>
    <span class="token property">"declaration"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                   <span class="token comment">// 生成相应的 '.d.ts' 文件</span>
    <span class="token property">"sourceMap"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                     <span class="token comment">// 生成相应的 '.map' 文件</span>
    <span class="token property">"outFile"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                       <span class="token comment">// 将输出文件合并为一个文件</span>
    <span class="token property">"outDir"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                        <span class="token comment">// 指定输出目录</span>
    <span class="token property">"rootDir"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                       <span class="token comment">// 用来控制输出目录结构 --outDir.</span>
    <span class="token property">"removeComments"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                <span class="token comment">// 删除编译后的所有的注释</span>
    <span class="token property">"noEmit"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                        <span class="token comment">// 不生成输出文件</span>
    <span class="token property">"importHelpers"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                 <span class="token comment">// 从 tslib 导入辅助工具函数</span>
    <span class="token property">"isolatedModules"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>               <span class="token comment">// 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.</span>

    <span class="token comment">/* 严格的类型检查选项 */</span>
    <span class="token property">"strict"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                        <span class="token comment">// 启用所有严格类型检查选项</span>
    <span class="token property">"noImplicitAny"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                 <span class="token comment">// 在表达式和声明上有隐含的 any类型时报错</span>
    <span class="token property">"strictNullChecks"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>              <span class="token comment">// 启用严格的 null 检查</span>
    <span class="token property">"noImplicitThis"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                <span class="token comment">// 当 this 表达式值为 any 类型的时候，生成一个错误</span>
    <span class="token property">"alwaysStrict"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                  <span class="token comment">// 以严格模式检查每个模块，并在每个文件里加入 'use strict'</span>

    <span class="token comment">/* 额外的检查 */</span>
    <span class="token property">"noUnusedLocals"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                <span class="token comment">// 有未使用的变量时，抛出错误</span>
    <span class="token property">"noUnusedParameters"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>            <span class="token comment">// 有未使用的参数时，抛出错误</span>
    <span class="token property">"noImplicitReturns"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>             <span class="token comment">// 并不是所有函数里的代码都有返回值时，抛出错误</span>
    <span class="token property">"noFallthroughCasesInSwitch"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>    <span class="token comment">// 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）</span>

    <span class="token comment">/* 模块解析选项 */</span>
    <span class="token property">"moduleResolution"</span><span class="token operator">:</span> <span class="token string">"node"</span><span class="token punctuation">,</span>            <span class="token comment">// 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)</span>
    <span class="token property">"baseUrl"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                       <span class="token comment">// 用于解析非相对模块名称的基目录</span>
    <span class="token property">"paths"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>                           <span class="token comment">// 模块名到基于 baseUrl 的路径映射的列表</span>
    <span class="token property">"rootDirs"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                        <span class="token comment">// 根文件夹列表，其组合内容表示项目运行时的结构内容</span>
    <span class="token property">"typeRoots"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                       <span class="token comment">// 包含类型声明的文件列表</span>
    <span class="token property">"types"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>                           <span class="token comment">// 需要包含的类型声明文件名列表</span>
    <span class="token property">"allowSyntheticDefaultImports"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// 允许从没有设置默认导出的模块中默认导入。</span>

    <span class="token comment">/* Source Map Options */</span>
    <span class="token property">"sourceRoot"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                    <span class="token comment">// 指定调试器应该找到 TypeScript 文件而不是源文件的位置</span>
    <span class="token property">"mapRoot"</span><span class="token operator">:</span> <span class="token string">"./"</span><span class="token punctuation">,</span>                       <span class="token comment">// 指定调试器应该找到映射文件而不是生成文件的位置</span>
    <span class="token property">"inlineSourceMap"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>               <span class="token comment">// 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件</span>
    <span class="token property">"inlineSources"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                 <span class="token comment">// 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性</span>

    <span class="token comment">/* 其他选项 */</span>
    <span class="token property">"experimentalDecorators"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>        <span class="token comment">// 启用装饰器</span>
    <span class="token property">"emitDecoratorMetadata"</span><span class="token operator">:</span> <span class="token boolean">true</span>          <span class="token comment">// 为装饰器提供元数据的支持</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>typeRoots: 用来指定默认的类型声明文件查找路径，默认为node_modules/@types, 指定typeRoots后，TypeScript 编译器会从指定的路径去引入声明文件，而不是node_modules/@types, 比如以下配置会从typings路径下去搜索声明</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"typeRoots"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"./typings"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>总结</strong></p>
<ul>
<li>typeRoots 是 tsconfig 中 compilerOptions 的一个配置项，typeRoots 下面的包会被 ts 编译器自动包含进来，typeRoots 默认指向 node_modules/@types。</li>
<li>@types 是 scoped packages，和@babel 类似。@types 下的所有包会默认被引入，你可以通过修改 compilerOptions 来修改默认策略。</li>
<li>types 和 typeRoots 一样也是 compilerOptions 的配置，指定 types 后，typeRoots 下只有被指定的包才会被引入。</li>
</ul>
</div></template>


