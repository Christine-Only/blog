<template><div><h1 id="eslint配置" tabindex="-1"><a class="header-anchor" href="#eslint配置"><span>ESLint配置</span></a></h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>前置条件：vscode安装并开启<code v-pre>eslint</code>插件</p>
</div>
<h2 id="安装eslint及依赖包" tabindex="-1"><a class="header-anchor" href="#安装eslint及依赖包"><span>安装eslint及依赖包</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token string">"devDependencies"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"@typescript-eslint/eslint-plugin"</span><span class="token builtin class-name">:</span> <span class="token string">"^5.6.0"</span>,
    <span class="token string">"@typescript-eslint/parser"</span><span class="token builtin class-name">:</span> <span class="token string">"^5.8.1"</span>,
    <span class="token string">"eslint"</span><span class="token builtin class-name">:</span> <span class="token string">"^8.3.0"</span>,
    <span class="token string">"eslint-config-airbnb"</span><span class="token builtin class-name">:</span> <span class="token string">"^19.0.2"</span>, // Airbnb的标准（配置文件中的extends里没有用Airbnb的话可以不装）
    <span class="token string">"eslint-plugin-import"</span><span class="token builtin class-name">:</span> <span class="token string">"^2.25.3"</span>, // Airbnb标准必需
    <span class="token string">"eslint-plugin-jsx-a11y"</span><span class="token builtin class-name">:</span> <span class="token string">"^6.5.1"</span>, // Airbnb标准必需，用来校验import的，比如不能添加后缀 .js
    <span class="token string">"eslint-config-prettier"</span><span class="token builtin class-name">:</span> <span class="token string">"^8.3.0"</span>,
    <span class="token string">"eslint-import-resolver-typescript"</span><span class="token builtin class-name">:</span> <span class="token string">"^2.5.0"</span>,
    <span class="token string">"eslint-plugin-react"</span><span class="token builtin class-name">:</span> <span class="token string">"^7.28.0"</span>, // 支持react语法
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-eslintrc-js" tabindex="-1"><a class="header-anchor" href="#配置-eslintrc-js"><span>配置.eslintrc.js</span></a></h2>
<p>rules规则说明：</p>
<ul>
<li>&quot;off&quot; 或 0：关闭规则</li>
<li>&quot;warn&quot; 或 1：开启规则，使用警告级别的提示（程序不会奔溃）</li>
<li>&quot;error&quot; 或 2：开启规则，使用错误级别的提示（触发时，程序会奔溃）</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 指定脚本的运行环境，一个环境定义了一组预定义的全局变量</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"browser"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//浏览器环境中的全局变量</span>
        <span class="token string-property property">"es6"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//启用除了modules以外的所有ES6特性（该选项会自动设置 ecmaVersion 解析器选项为 6）</span>
        <span class="token string-property property">"node"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//Node.js 全局变量和 Node.js 作用域</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'airbnb'</span><span class="token punctuation">,</span> <span class="token string">'prettier'</span><span class="token punctuation">,</span> <span class="token string">'plugin:@typescript-eslint/recommended'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置全局变量</span>
    <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"Atomics"</span><span class="token operator">:</span> <span class="token string">"readonly"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"SharedArrayBuffer"</span><span class="token operator">:</span> <span class="token string">"readonly"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 指定解析器</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span> <span class="token comment">// 定义ESLint的解析器</span>
    <span class="token comment">// 指定解析器选项</span>
    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// ts 版本的提示信息</span>
        <span class="token literal-property property">warnOnUnsupportedTypeScriptVersion</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 第三方插件</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"quotes"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"single"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//单引号</span>
        <span class="token string-property property">"no-console"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//不禁用console</span>
        <span class="token string-property property">"no-debugger"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁用debugger</span>
        <span class="token string-property property">"no-var"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//对var警告</span>
        <span class="token string-property property">"semi"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//不强制使用分号</span>
        <span class="token string-property property">"no-irregular-whitespace"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//不规则的空白不允许</span>
        <span class="token string-property property">"no-trailing-spaces"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//一行结束后面有空格就发出警告</span>
        <span class="token string-property property">"eol-last"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//文件以单一的换行符结束</span>
        <span class="token string-property property">"no-unused-vars"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">"vars"</span><span class="token operator">:</span> <span class="token string">"all"</span><span class="token punctuation">,</span> <span class="token string-property property">"args"</span><span class="token operator">:</span> <span class="token string">"after-used"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//不能有声明后未被使用的变量或参数</span>
        <span class="token string-property property">"no-underscore-dangle"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//标识符不能以_开头或结尾</span>
        <span class="token string-property property">"no-alert"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止使用alert confirm prompt</span>
        <span class="token string-property property">"no-lone-blocks"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//禁止不必要的嵌套块</span>
        <span class="token string-property property">"no-class-assign"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止给类赋值</span>
        <span class="token string-property property">"no-cond-assign"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止在条件表达式中使用赋值语句</span>
        <span class="token string-property property">"no-const-assign"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止修改const声明的变量</span>
        <span class="token string-property property">"no-delete-var"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//不能对var声明的变量使用delete操作符</span>
        <span class="token string-property property">"no-dupe-keys"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//在创建对象字面量时不允许键重复</span>
        <span class="token string-property property">"no-duplicate-case"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//switch中的case标签不能重复</span>
        <span class="token string-property property">"no-dupe-args"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//函数参数不能重复</span>
        <span class="token string-property property">"no-empty"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//块语句中的内容不能为空</span>
        <span class="token string-property property">"no-func-assign"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止重复的函数声明</span>
        <span class="token string-property property">"no-invalid-this"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//禁止无效的this，只能用在构造器，类，对象字面量</span>
        <span class="token string-property property">"no-redeclare"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//禁止重复声明变量</span>
        <span class="token string-property property">"no-spaced-func"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//函数调用时 函数名与()之间不能有空格</span>
        <span class="token string-property property">"no-this-before-super"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//在调用super()之前不能使用this或super</span>
        <span class="token string-property property">"no-undef"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//不能有未定义的变量</span>
        <span class="token string-property property">"no-use-before-define"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//未定义前不能使用</span>
        <span class="token string-property property">"camelcase"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//强制驼峰法命名</span>
        <span class="token string-property property">"jsx-quotes"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"prefer-double"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//强制在JSX属性（jsx-quotes）中一致使用双引号</span>
        <span class="token string-property property">"react/display-name"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止在React组件定义中丢失displayName</span>
        <span class="token string-property property">"react/forbid-prop-types"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">"forbid"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"any"</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//禁止某些propTypes</span>
        <span class="token string-property property">"react/jsx-boolean-value"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//在JSX中强制布尔属性符号</span>
        <span class="token string-property property">"react/jsx-closing-bracket-location"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//在JSX中验证右括号位置</span>
        <span class="token string-property property">"react/jsx-curly-spacing"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">"when"</span><span class="token operator">:</span> <span class="token string">"never"</span><span class="token punctuation">,</span> <span class="token string-property property">"children"</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//在JSX属性和表达式中加强或禁止大括号内的空格。</span>
        <span class="token string-property property">"react/jsx-indent-props"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//验证JSX中的props缩进</span>
        <span class="token string-property property">"react/jsx-key"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//在数组或迭代器中验证JSX具有key属性</span>
        <span class="token string-property property">"react/jsx-max-props-per-line"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string-property property">"maximum"</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 限制JSX中单行上的props的最大数量</span>
        <span class="token string-property property">"react/jsx-no-bind"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//JSX中不允许使用箭头函数和bind</span>
        <span class="token string-property property">"react/jsx-no-duplicate-props"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//防止在JSX中重复的props</span>
        <span class="token string-property property">"react/jsx-no-literals"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止使用未包装的JSX字符串</span>
        <span class="token string-property property">"react/jsx-no-undef"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//在JSX中禁止未声明的变量</span>
        <span class="token string-property property">"react/jsx-pascal-case"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//为用户定义的JSX组件强制使用PascalCase</span>
        <span class="token string-property property">"react/jsx-sort-props"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//强化props按字母排序</span>
        <span class="token string-property property">"react/jsx-uses-react"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//防止反应被错误地标记为未使用</span>
        <span class="token string-property property">"react/jsx-uses-vars"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//防止在JSX中使用的变量被错误地标记为未使用</span>
        <span class="token string-property property">"react/no-danger"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止使用危险的JSX属性</span>
        <span class="token string-property property">"react/no-did-mount-set-state"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止在componentDidMount中使用setState</span>
        <span class="token string-property property">"react/no-did-update-set-state"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//防止在componentDidUpdate中使用setState</span>
        <span class="token string-property property">"react/no-direct-mutation-state"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//防止this.state的直接变异</span>
        <span class="token string-property property">"react/no-multi-comp"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//防止每个文件有多个组件定义</span>
        <span class="token string-property property">"react/no-set-state"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止使用setState</span>
        <span class="token string-property property">"react/no-unknown-property"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//防止使用未知的DOM属性</span>
        <span class="token string-property property">"react/prefer-es6-class"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//为React组件强制执行ES5或ES6类</span>
        <span class="token string-property property">"react/prop-types"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止在React组件定义中丢失props验证</span>
        <span class="token string-property property">"react/react-in-jsx-scope"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//使用JSX时防止丢失React</span>
        <span class="token string-property property">"react/self-closing-comp"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止没有children的组件的额外结束标签</span>
        <span class="token string-property property">"react/sort-comp"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//强制组件方法顺序</span>
        <span class="token string-property property">"no-extra-boolean-cast"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//禁止不必要的bool转换</span>
        <span class="token string-property property">"react/no-array-index-key"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//防止在数组中遍历中使用数组key做索引</span>
        <span class="token string-property property">"react/no-deprecated"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//不使用弃用的方法</span>
        <span class="token string-property property">"react/jsx-equals-spacing"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//在JSX属性中强制或禁止等号周围的空格</span>
        <span class="token string-property property">"no-unreachable"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//不能有无法执行的代码</span>
        <span class="token string-property property">"comma-dangle"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">//对象字面量项尾不能有逗号</span>
        <span class="token string-property property">"no-mixed-spaces-and-tabs"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//禁止混用tab和空格</span>
        <span class="token string-property property">"prefer-arrow-callback"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//比较喜欢箭头回调</span>
        <span class="token string-property property">"arrow-parens"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//箭头函数用小括号括起来</span>
        <span class="token string-property property">"arrow-spacing"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">//=>的前/后括号</span>
        <span class="token comment">/* ts */</span>
        <span class="token string-property property">'no-unused-expressions'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'warn'</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">allowShortCircuit</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">allowTernary</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 允许 短路运算和三元运算 其他warning</span>
        <span class="token comment">/* js */</span>
        <span class="token string-property property">'max-len'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token number">150</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 最大行字符数</span>
        <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 行尾无分号</span>
        <span class="token comment">/* react */</span>
        <span class="token string-property property">'react-hooks/exhaustive-deps'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 react-hooks 依赖不全</span>
        <span class="token string-property property">'react/no-array-index-key'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 用 index 做key</span>
        <span class="token string-property property">'react/function-component-definition'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">namedComponents</span><span class="token operator">:</span> <span class="token string">'arrow-function'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">// 默认 用箭头函数定义函数组件</span>
        <span class="token string-property property">'react/jsx-filename-extension'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 tsx里面不带类型定义</span>
        <span class="token string-property property">'react/require-default-props'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 没有默认值</span>
        <span class="token string-property property">'react/react-in-jsx-scope'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 React不带import React </span>
        <span class="token comment">/* import */</span>
        <span class="token string-property property">'import/extensions'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 不带扩展名</span>
        <span class="token string-property property">'import/prefer-default-export'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 允许 不用export default</span>
        <span class="token string-property property">'import/resolver'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span><span class="token comment">// 关闭 eslint 模块解析（已经有ts做了依赖解析）</span>
        <span class="token string-property property">'jsx-a11y/mouse-events-have-key-events'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'jsx-a11y/no-noninteractive-element-interactions'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'jsx-a11y/click-events-have-key-events'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
        <span class="token string-property property">'brace-style'</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token comment">// 大括号风格要求</span>
        <span class="token string-property property">'no-multiple-empty-lines'</span><span class="token operator">:</span> <span class="token string">'error'</span><span class="token punctuation">,</span>  <span class="token comment">// 要求遵循大括号约定</span>
        <span class="token string-property property">'jsx-a11y/no-static-element-interactions'</span><span class="token operator">:</span> <span class="token string">'off'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 依赖解析用 ts</span>
    <span class="token literal-property property">settings</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'import/parser'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">'@typescript-eslint/parser'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'.ts'</span><span class="token punctuation">,</span> <span class="token string">'.tsx'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string-property property">'import/resolver'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">typescript</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-prettierrc-js" tabindex="-1"><a class="header-anchor" href="#配置-prettierrc-js"><span>配置.prettierrc.js</span></a></h2>
<p>在项目的根目录下添加 <code v-pre>.prettierrc</code> 或 <code v-pre>.prettierrc.js</code> 或 <code v-pre>.prettier.config.js</code> 和 <code v-pre>.prettierrc.toml</code> 文件。</p>
<p>JSON:</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"trailingComma"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
  <span class="token property">"tabWidth"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">"semi"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JS:</p>
<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// prettier.config.js or .prettierrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># .prettierrc or .prettierrc.yaml</span>
<span class="token key atrule">trailingComma</span><span class="token punctuation">:</span> <span class="token string">"es5"</span>
<span class="token key atrule">tabWidth</span><span class="token punctuation">:</span> <span class="token number">2</span>
<span class="token key atrule">semi</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">singleQuote</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TOML:</p>
<div class="language-toml line-numbers-mode" data-ext="toml" data-title="toml"><pre v-pre class="language-toml"><code><span class="token comment"># .prettierrc.toml</span>
<span class="token key property">trailingComma</span> <span class="token punctuation">=</span> <span class="token string">"es5"</span>
<span class="token key property">tabWidth</span> <span class="token punctuation">=</span> <span class="token number">2</span>
<span class="token key property">semi</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">singleQuote</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加脚本" tabindex="-1"><a class="header-anchor" href="#添加脚本"><span>添加脚本</span></a></h2>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"lint"</span><span class="token operator">:</span> <span class="token string">"eslint src/**/*.{js,jsx,ts,tsx}  --no-error-on-unmatched-pattern"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mrm" tabindex="-1"><a class="header-anchor" href="#mrm"><span>mrm</span></a></h2>
<p><code v-pre>mrm</code>是一个自动化工具。</p>
<p>它将根据package.json依赖项中的代码质量工具来安装和配置husky和lint-staged，因此请确保在此之前安装（npm install -D）并配置所有代码质量工具，如<code v-pre>Prettier</code>和<code v-pre>ESlint</code>。</p>
<h2 id="lint-staged" tabindex="-1"><a class="header-anchor" href="#lint-staged"><span>lint-staged</span></a></h2>
<blockquote>
<p>lint-staged 是一个在git暂存文件上运行linters的工具，当然如果你觉得每次修改一个文件就给所有文件执行一次lint检查不恶心的话，这个工具对你来说就没有什么意义了，请直接关闭即可。</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i mrm <span class="token parameter variable">-D</span>
npx mrm lint-staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行完上述命令你会发现：</p>
<ul>
<li><code v-pre>package.json</code>里多了两个开发依赖（<code v-pre>husky</code>和<code v-pre>lint-staged</code>）和一个<code v-pre>prepare</code>脚本：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prepare"</span><span class="token operator">:</span> <span class="token string">"husky install"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"husky"</span><span class="token operator">:</span> <span class="token string">"^7.0.4"</span><span class="token punctuation">,</span>
    <span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token string">"^12.1.7"</span><span class="token punctuation">,</span>
    <span class="token property">"mrm"</span><span class="token operator">:</span> <span class="token string">"^3.0.10"</span><span class="token punctuation">,</span>
    <span class="token property">"prettier"</span><span class="token operator">:</span> <span class="token string">"^2.5.1"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"*.js"</span><span class="token operator">:</span> <span class="token string">"eslint --cache --fix"</span><span class="token punctuation">,</span>
    <span class="token property">"*.{js,css,md}"</span><span class="token operator">:</span> <span class="token string">"prettier --write"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>根目录多了一个<code v-pre>.husky</code>的文件</li>
</ul>
<p>可以根据项目的需要自行修改，比如可以改为：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token comment">// 所有目录下包含后缀的都会开启ESLint检测</span>
<span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"**/*.less"</span><span class="token operator">:</span> <span class="token string">"stylelint --syntax less"</span><span class="token punctuation">,</span>
    <span class="token property">"**/*.{js,jsx,ts,tsx}"</span><span class="token operator">:</span> <span class="token string">"npm run lint-staged:js"</span><span class="token punctuation">,</span>
    <span class="token property">"**/*.{js,jsx,tsx,ts,less,md,json}"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"prettier --write"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 指定下包含后缀的都会开启ESLint检测</span>
<span class="token comment">// 这里其实是不需要跑npm run lint的，因为如果这样在commit时会全量检测所有src下的文件，然而其实我们只需要检测修改的文件即可。</span>
<span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"src/**/*.{js,jsx,ts,tsx}"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"npm run lint"</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token property">"src/**/*.{js,jsx,ts,tsx}"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">"eslint"</span>
    <span class="token punctuation">]</span>
    
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成安装和配置后，当开发者完成代码，执行<code v-pre>git commit -m 'xxx'</code>时，会自动开启ESlint检查。</p>
</div></template>


