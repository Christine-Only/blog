<template><div><h1 id="输入-url-到页面展示-这中间发生了什么" tabindex="-1"><a class="header-anchor" href="#输入-url-到页面展示-这中间发生了什么"><span>输入 URL 到页面展示，这中间发生了什么</span></a></h1>
<h2 id="导航流程" tabindex="-1"><a class="header-anchor" href="#导航流程"><span>导航流程</span></a></h2>
<h3 id="_1-用户输入" tabindex="-1"><a class="header-anchor" href="#_1-用户输入"><span>1. 用户输入</span></a></h3>
<p>当⽤⼾在地址栏中输⼊⼀个查询关键字时，地址栏会判断输⼊的关键字是搜索内容，还是请求的URL。</p>
<ul>
<li>如果是搜索内容，地址栏会使⽤浏览器默认的搜索引擎，来合成新的带搜索关键字的URL。</li>
<li>如果判断输⼊内容符合URL规则，⽐如输⼊的是 time.geekbang.org，那么地址栏会根据规则，把这段内容加上协议，合成为完整的URL，如 <a href="https://time.geekbang.org" target="_blank" rel="noopener noreferrer">https://time.geekbang.org<ExternalLinkIcon/></a>。</li>
</ul>
<h3 id="_2-url请求过程" tabindex="-1"><a class="header-anchor" href="#_2-url请求过程"><span>2. url请求过程</span></a></h3>
<p>浏览器进程会通过进程间通信（IPC）把URL请求发送⾄⽹络进程，⽹络进程接收到URL请求后，会在这⾥发起真正的URL请求流程。</p>
<ul>
<li>⽹络进程会查找本地缓存是否缓存了该资源。如果有缓存资源，那么直接返回资源给浏览器进程；如果在缓存中没有查找到资源，那么直接进⼊⽹络请求流程。</li>
<li>判断是否存在 DNS 缓存，如果缓存过当前域名信息，就会直接返回缓存信息；否则进⾏DNS解析，以获取请求域名的服务器IP地址。如果请求协议是HTTPS，那么还需要建⽴TLS连接。</li>
<li>是利⽤IP地址和服务器建⽴TCP连接。连接建⽴之后，浏览器端会构建请求⾏、请求头等信息，并把和该域名相关的Cookie等数据附加到请求头中，然后向服务器发送构建的请求信息。</li>
<li>服务器接收到请求信息后，会根据请求信息⽣成响应数据（包括响应⾏、响应头和响应体等信息），并发给⽹络进程。</li>
</ul>
<h3 id="_3-解析响应阶段" tabindex="-1"><a class="header-anchor" href="#_3-解析响应阶段"><span>3.解析响应阶段</span></a></h3>
<ul>
<li>在接收到服务器返回的响应头后，⽹络进程开始解析响应头，如果发现返回的状态码是301或者302，那么说明服务器需要浏览器重定向到其他URL。这时⽹络进程会从响应头的Location字段⾥⾯读取重定向的地址，然后再发起新的HTTP或者HTTPS请求。如果服务器返回的响应头的状态码是200，继续解析响应头。</li>
<li>响应数据类型处理：解析 Content-Type ，判断数据类型，交给不同进程处理(ex:application/octet-stream 交给下载管理器处理，text/html 交给渲染进程)</li>
</ul>
<h3 id="_4-准备渲染进程阶段" tabindex="-1"><a class="header-anchor" href="#_4-准备渲染进程阶段"><span>4. 准备渲染进程阶段</span></a></h3>
<ul>
<li>通常情况下，打开新的⻚⾯都会使⽤单独的渲染进程；</li>
<li>如果从A⻚⾯打开B⻚⾯，且A和B都属于同⼀站点的话，那么B⻚⾯复⽤A⻚⾯的渲染进程；如果是其他情况，浏览器进程则会为B创建⼀个新的渲染进程。</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>渲染进程准备好之后，还不能⽴即进⼊⽂档解析状态，因为此时的⽂档数据还在⽹络进程中，并没有提交给渲染进程，所以下⼀步就进⼊了提交⽂档阶段。</p>
</div>
<h3 id="_5-提交文档阶段" tabindex="-1"><a class="header-anchor" href="#_5-提交文档阶段"><span>5. 提交文档阶段</span></a></h3>
<blockquote>
<p>⾸先要明确⼀点，这⾥的“⽂档”是指URL请求的响应体数据。</p>
</blockquote>
<ul>
<li>“提交⽂档”的消息是由浏览器进程发出的，渲染进程接收到“提交⽂档”的消息后，会和⽹络进程建⽴传输数据的“管道”。</li>
<li>等⽂档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程。</li>
<li>浏览器进程在收到“确认提交”的消息后，会更新浏览器界⾯状态，包括了安全状态、地址栏的URL、前进后退的历史状态，并更新Web⻚⾯。</li>
</ul>
<h2 id="渲染流程" tabindex="-1"><a class="header-anchor" href="#渲染流程"><span>渲染流程</span></a></h2>
<h3 id="_1-dom-生成" tabindex="-1"><a class="header-anchor" href="#_1-dom-生成"><span>1. DOM 生成</span></a></h3>
<p>渲染进程将HTML内容转换为能够读懂的DOM树结构。</p>
<h3 id="_2-样式计算" tabindex="-1"><a class="header-anchor" href="#_2-样式计算"><span>2. 样式计算</span></a></h3>
<p>渲染引擎将CSS样式表转化为浏览器可以理解的styleSheets，计算出DOM节点的样式。</p>
<h3 id="_3-布局阶段" tabindex="-1"><a class="header-anchor" href="#_3-布局阶段"><span>3. 布局阶段</span></a></h3>
<p>创建布局树，并计算元素的布局信息。</p>
<h3 id="_4-分层" tabindex="-1"><a class="header-anchor" href="#_4-分层"><span>4. 分层</span></a></h3>
<p>对布局树进⾏分层，并⽣成分层树。</p>
<h3 id="_5-图层绘制" tabindex="-1"><a class="header-anchor" href="#_5-图层绘制"><span>5. 图层绘制</span></a></h3>
<p>为每个图层⽣成绘制列表，并将其提交到合成线程。</p>
<h3 id="_6-栅格化-raster-操作" tabindex="-1"><a class="header-anchor" href="#_6-栅格化-raster-操作"><span>6. 栅格化（raster）操作</span></a></h3>
<p>合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。</p>
<h3 id="_7-合成与显示" tabindex="-1"><a class="header-anchor" href="#_7-合成与显示"><span>7. 合成与显示</span></a></h3>
<p>合成线程发送绘制图块命令DrawQuad给浏览器进程。
浏览器进程根据DrawQuad消息⽣成⻚⾯，并显⽰到显⽰器上。</p>
<h2 id="url-到底是啥" tabindex="-1"><a class="header-anchor" href="#url-到底是啥"><span>URL 到底是啥</span></a></h2>
<p>URL（Uniform Resource Locator），统一资源定位符，用于定位互联网上资源，俗称网址。</p>
<p><code v-pre>scheme://host.domain:port/path/filename</code></p>
<p>各部分解释如下：</p>
<ul>
<li><code v-pre>scheme</code>： 定义因特网服务的类型。常见的协议有 http、https、ftp、file，其中最常见的类型是 http，而 https 则是进行加密的网络传输。</li>
<li><code v-pre>host</code>： 定义域主机（http 的默认主机是 www）</li>
<li><code v-pre>domain</code>： 定义因特网域名，比如 w3school.com.cn</li>
<li><code v-pre>port</code>： 定义主机上的端口号（http 的默认端口号是 80）</li>
<li><code v-pre>path</code>： 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）</li>
<li><code v-pre>filename</code>： 定义文档/资源的名称</li>
</ul>
<h2 id="域名解析-dns" tabindex="-1"><a class="header-anchor" href="#域名解析-dns"><span>域名解析（DNS）</span></a></h2>
<h3 id="什么是域名解析" tabindex="-1"><a class="header-anchor" href="#什么是域名解析"><span>什么是域名解析</span></a></h3>
<p>DNS 协议提供通过域名查找 IP 地址，或逆向从 IP 地址反查域名的服务。DNS 是一个网络服务器，我们的域名解析简单来说就是在 DNS 上记录一条信息记录。</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>例如 baidu.com  220.114.23.56（服务器外网IP地址）80（服务器端口号）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="浏览器如何通过域名去查询-url-对应的-ip-呢" tabindex="-1"><a class="header-anchor" href="#浏览器如何通过域名去查询-url-对应的-ip-呢"><span>浏览器如何通过域名去查询 URL 对应的 IP 呢</span></a></h3>
<ul>
<li>浏览器缓存：浏览器会按照一定的频率缓存 DNS 记录。</li>
<li>操作系统缓存：如果浏览器缓存中找不到需要的 DNS 记录，那就去操作系统中找。</li>
<li>路由缓存：路由器也有 DNS 缓存。</li>
<li>ISP 的 DNS 服务器：ISP 是互联网服务提供商(Internet Service Provider)的简称，ISP 有专门的 DNS 服务器应对 DNS 查询请求。</li>
<li>根服务器：ISP 的 DNS 服务器还找不到的话，它就会向根服务器发出请求，进行递归查询（DNS 服务器先问根域名服务器.com 域名服务器的 IP 地址，然后再问.baidu 域名服务器，依次类推）</li>
</ul>
<p><img src="/dns.png" alt="alt"></p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<p>浏览器通过向 DNS 服务器发送域名，DNS 服务器查询到与域名相对应的 IP 地址，然后返回给浏览器，浏览器再将 IP 地址打在协议上，同时请求参数也会在协议搭载，然后一并发送给对应的服务器。接下来介绍向服务器发送 HTTP 请求阶段，HTTP 请求分为三个部分：TCP 三次握手、http 请求响应信息、关闭 TCP 连接。</p>
</div>
<p><img src="/dns1.png" alt="alt"></p>
<h2 id="tcp-三次握手" tabindex="-1"><a class="header-anchor" href="#tcp-三次握手"><span>TCP 三次握手</span></a></h2>
<p>三次握手（Three-way Handshake）其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备。实质上其实就是连接服务器指定端口，建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。</p>
<p>刚开始客户端处于 Closed 的状态，服务端处于 Listen 状态。</p>
<p><strong>进行三次握手：</strong></p>
<p>第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN©。此时客户端处于 SYN_SEND 状态。</p>
<p>首部的同步位SYN=1，初始序号seq=x，SYN=1的报文段不能携带数据，但要消耗掉一个序号。</p>
<p>第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)。同时会把客户端的 ISN + 1 作为ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 SYN_RCVD 的状态。</p>
<p>在确认报文段中SYN=1，ACK=1，确认号ack=x+1，初始序号seq=y。</p>
<p>第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 ESTABLISHED 状态。服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接。</p>
<p>确认报文段ACK=1，确认号ack=y+1，序号seq=x+1（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号。</p>
<p>发送第一个SYN的一端将执行主动打开（active open），接收这个SYN并发回下一个SYN的另一端执行被动打开（passive open）。</p>
<p><img src="/三次握手.jpg" alt="alt"></p>
<p><strong>标识符：</strong></p>
<ul>
<li>SYN = 1：当 SYN = 1，ACK = 0 时，表示当前请求报文段是一个连接请求报文。当 SYN = 1，ACK = 1时，表示当前请求报文段是一个同意建立连接的应答报文。</li>
<li>FIN = 1：该字段等于 1 表示此报文段是一个释放连接的请求报文。</li>
</ul>
<h3 id="为什么需要三次握手-两次不行吗" tabindex="-1"><a class="header-anchor" href="#为什么需要三次握手-两次不行吗"><span>为什么需要三次握手，两次不行吗？</span></a></h3>
<p>弄清这个问题，我们需要先弄明白三次握手的目的是什么，能不能只用两次握手来达到同样的目的。</p>
<p>第一次握手：客户端发送网络包，服务端收到了。</p>
<p>这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。</p>
<p>第二次握手：服务端发包，客户端收到了。</p>
<p>这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。</p>
<p>第三次握手：客户端发包，服务端收到了。</p>
<p>这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。</p>
<p>因此，需要三次握手才能确认双方的接收与发送能力是否正常。</p>
<div class="custom-container warning"><p class="custom-container-title">试想如果是用两次握手，则会出现下面这种情况：</p>
<p>如客户端发出连接请求，但因连接请求报文丢失而未收到确认，于是客户端再重传一次连接请求。后来收到了确认，建立了连接。数据传输完毕后，就释放了连接，客户端共发出了两个连接请求报文段，其中第一个丢失，第二个到达了服务端，但是第一个丢失的报文段只是在某些网络结点长时间滞留了，延误到连接释放以后的某个时间才到达服务端，此时服务端误认为客户端又发出一次新的连接请求，于是就向客户端发出确认报文段，同意建立连接，不采用三次握手，只要服务端发出确认，就建立新的连接了，此时客户端忽略服务端发来的确认，也不发送数据，则服务端一直等待客户端发送数据，浪费资源。</p>
</div>
<h3 id="syn攻击是什么" tabindex="-1"><a class="header-anchor" href="#syn攻击是什么"><span>SYN攻击是什么？</span></a></h3>
<p>服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击。</p>
<p>检测 SYN 攻击非常的方便，当你在服务器上看到大量的半连接状态时，特别是源IP地址是随机的，基本上可以断定这是一次SYN攻击。在 Linux/Unix 上可以使用系统自带的 netstats 命令来检测 SYN 攻击。</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-p</span> TCP <span class="token operator">|</span> <span class="token function">grep</span> SYN_RECV
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="发送-http-请求" tabindex="-1"><a class="header-anchor" href="#发送-http-请求"><span>发送 HTTP 请求</span></a></h2>
<p><strong>TCP 三次握手结束后，开始发送 HTTP 请求报文</strong>。</p>
<p>请求报文由请求行（request line）、请求头（header）、请求体三个部分组成,如下图所示：</p>
<p><img src="/http.png" alt="alt"></p>
<ul>
<li>
<p>请求行包含请求方法、URL、协议版本</p>
<ul>
<li>请求方法包含 8 种：GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS、TRACE。</li>
<li>URL 即请求地址，由 &lt;协议&gt;：//&lt;主机&gt;：&lt;端口&gt;/&lt;路径&gt;?&lt;参数&gt; 组成</li>
<li>协议版本即 http 版本号</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>POST  /chapter17/user.html HTTP/1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上代码中“POST”代表请求方法，“/chapter17/user.html”表示 URL，“HTTP/1.1”代表协议和协议的版本。现在比较流行的是 Http1.1 版本</p>
</li>
<li>
<p>请求头包含请求的附加信息，由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。</p>
<p>请求头部通知服务器有关于客户端请求的信息。它包含许多有关的客户端环境和请求正文的有用信息。其中比如：Host，表示主机名，虚拟主机；Connection,HTTP/1.1 增加的，使用 keepalive，即持久连接，一个连接可以发多个请求；User-Agent，请求发出者，兼容性以及定制化需求。</p>
</li>
<li>
<p>请求体，可以承载多个请求参数的数据，包含回车符、换行符和请求数据，并不是所有请求都具有请求数据。</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>name=tom&amp;password=1234&amp;realName=tomson
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码，承载着 name、password、realName 三个请求参数。</p>
</li>
</ul>
<h2 id="服务器处理请求并返回-http-报文" tabindex="-1"><a class="header-anchor" href="#服务器处理请求并返回-http-报文"><span>服务器处理请求并返回 HTTP 报文</span></a></h2>
<h3 id="服务器" tabindex="-1"><a class="header-anchor" href="#服务器"><span>服务器</span></a></h3>
<p>服务器是网络环境中的高性能计算机，它侦听网络上的其他计算机（客户机）提交的服务请求，并提供相应的服务，比如网页服务、文件下载服务、邮件服务、视频服务。而客户端主要的功能是浏览网页、看视频、听音乐等等，两者截然不同。 每台服务器上都会安装处理请求的应用——web server。常见的 web server 产品有 apache、nginx、IIS 或 Lighttpd 等。
web server 担任管控的角色，对于不同用户发送的请求，会结合配置文件，把不同请求委托给服务器上处理相应请求的程序进行处理（例如 CGI 脚本，JSP 脚本，servlets，ASP 脚本，服务器端 JavaScript，或者一些其它的服务器端技术等），然后返回后台程序处理产生的结果作为响应。</p>
<p><img src="/http1.png" alt="alt"></p>
<h3 id="mvc-后台处理阶段" tabindex="-1"><a class="header-anchor" href="#mvc-后台处理阶段"><span>MVC 后台处理阶段</span></a></h3>
<p>台开发现在有很多框架，但大部分都还是按照 MVC 设计模式进行搭建的。
MVC 是一个设计模式，将应用程序分成三个核心部件：模型（model）-- 视图（view）--控制器（controller），它们各自处理自己的任务，实现输入、处理和输出的分离。</p>
<p><img src="/mvc.png" alt="alt"></p>
<ul>
<li>
<p>视图（view）</p>
<p>它是提供给用户的操作界面，是程序的外壳。</p>
</li>
<li>
<p>模型（model）</p>
<p><strong>模型主要负责数据交互</strong>。在 MVC 的三个部件中，模型拥有最多的处理任务。一个模型能为多个视图提供数据。</p>
</li>
<li>
<p>控制器（controller）</p>
<p>它负责根据用户从&quot;视图层&quot;输入的指令，选取&quot;模型层&quot;中的数据，然后对其进行相应的操作，产生最终结果。控制器属于管理者角色，从视图接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示模型处理返回的数据。</p>
<p>这三层是紧密联系在一起的，但又是互相独立的，每一层内部的变化不影响其他层。每一层都对外提供接口（Interface），供上面一层调用。</p>
<p>至于这一阶段发生什么？简而言之，首先浏览器发送过来的请求先经过控制器，控制器进行逻辑处理和请求分发，接着会调用模型，这一阶段模型会获取 redis db 以及 MySQL 的数据，获取数据后将渲染好的页面，响应信息会以响应报文的形式返回给客户端，最后浏览器通过渲染引擎将网页呈现在用户面前。</p>
</li>
</ul>
<h3 id="http-响应报文" tabindex="-1"><a class="header-anchor" href="#http-响应报文"><span>http 响应报文</span></a></h3>
<p>响应报文由响应行（request line）、响应头部（header）、响应主体三个部分组成。如下图所示：</p>
<p><img src="/http2.png" alt="alt"></p>
<ul>
<li>响应行包含：协议版本，状态码，状态码描述</li>
</ul>
<p>状态码规则如下：</p>
<ul>
<li>
<p>1xx：指示信息--表示请求已接收，继续处理。</p>
</li>
<li>
<p>2xx：成功--表示请求已被成功接收、理解、接受。</p>
</li>
<li>
<p>3xx：重定向--要完成请求必须进行更进一步的操作。</p>
</li>
<li>
<p>4xx：客户端错误--请求有语法错误或请求无法实现。</p>
</li>
<li>
<p>5xx：服务器端错误--服务器未能实现合法的请求。</p>
</li>
<li>
<p>响应头部包含响应报文的附加信息，由 名/值 对组成</p>
</li>
<li>
<p>响应主体包含回车符、换行符和响应返回数据，并不是所有响应报文都有响应数据</p>
</li>
</ul>
<h2 id="浏览器解析渲染页面" tabindex="-1"><a class="header-anchor" href="#浏览器解析渲染页面"><span>浏览器解析渲染页面</span></a></h2>
<p>浏览器拿到响应文本 HTML 后，接下来介绍下浏览器渲染机制</p>
<p><img src="/render.webp" alt="alt"></p>
<p>浏览器解析渲染页面分为一下五个步骤：</p>
<ul>
<li>根据 HTML 解析出 DOM 树</li>
<li>根据 CSS 解析生成 CSS 规则树</li>
<li>结合 DOM 树和 CSS 规则树，生成渲染树</li>
<li>根据渲染树计算每一个节点的信息</li>
<li>根据计算好的信息绘制页面</li>
</ul>
<p><strong>1.根据 HTML 解析 DOM 树</strong></p>
<ul>
<li>根据 HTML 的内容，将标签按照结构解析成为 DOM 树，DOM 树解析的过程是一个深度优先遍历。即先构建当前节点的所有子节点，再构建下一个兄弟节点。</li>
<li>在读取 HTML 文档，构建 DOM 树的过程中，若遇到 script 标签，则 DOM 树的构建会暂停，直至脚本执行完毕。</li>
</ul>
<p><strong>2.根据 CSS 解析生成 CSS 规则树</strong></p>
<ul>
<li>解析 CSS 规则树时 js 执行将暂停，直至 CSS 规则树就绪。</li>
<li>浏览器在 CSS 规则树生成之前不会进行渲染。</li>
</ul>
<p><strong>3.结合 DOM 树和 CSS 规则树，生成渲染树</strong></p>
<ul>
<li>DOM 树和 CSS 规则树全部准备好了以后，浏览器才会开始构建渲染树。</li>
<li>精简 CSS 并可以加快 CSS 规则树的构建，从而加快页面相应速度。</li>
</ul>
<p><strong>4.根据渲染树计算每一个节点的信息（布局）</strong></p>
<ul>
<li>布局：通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸</li>
<li>回流：在布局完成后，发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染。</li>
</ul>
<p><strong>5.根据计算好的信息绘制页面</strong></p>
<ul>
<li>绘制阶段，系统会遍历呈现树，并调用呈现器的“paint”方法，将呈现器的内容显示在屏幕上。</li>
<li>重绘：某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的重绘。</li>
<li>回流：某个元素的尺寸发生了变化，则需重新计算渲染树，重新渲染。</li>
</ul>
<h2 id="断开连接" tabindex="-1"><a class="header-anchor" href="#断开连接"><span>断开连接</span></a></h2>
<p>建立一个连接需要三次握手，而终止一个连接要经过四次挥手（也有将四次挥手叫做四次握手的）。这由TCP的半关闭（half-close）造成的。所谓的半关闭，其实就是TCP提供了连接的一端在结束它的发送后还能接收来自另一端数据的能力。</p>
<p>TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，客户端或服务器均可主动发起挥手动作。</p>
<p>刚开始双方都处于 ESTABLISHED 状态，假如是客户端先发起关闭请求。</p>
<p><strong>四次挥手的过程如下：</strong></p>
<p>第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态。</p>
<p>即发出连接释放报文段（FIN=1，序号seq=u），并停止再发送数据，主动关闭TCP连接，进入FIN_WAIT1（终止等待1）状态，等待服务端的确认。</p>
<p>第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态。</p>
<p>即服务端收到连接释放报文段后即发出确认报文段（ACK=1，确认号ack=u+1，序号seq=v），服务端进入CLOSE_WAIT（关闭等待）状态，此时的TCP处于半关闭状态，客户端到服务端的连接释放。客户端收到服务端的确认后，进入FIN_WAIT2（终止等待2）状态，等待服务端发出的连接释放报文段。</p>
<p>第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。</p>
<p>即服务端没有要向客户端发出的数据，服务端发出连接释放报文段（FIN=1，ACK=1，序号seq=w，确认号ack=u+1），服务端进入LAST_ACK（最后确认）状态，等待客户端的确认。</p>
<p>第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。</p>
<p>即客户端收到服务端的连接释放报文段后，对此发出确认报文段（ACK=1，seq=u+1，ack=w+1），客户端进入TIME_WAIT（时间等待）状态。此时TCP未释放掉，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态。</p>
<p>收到一个FIN只意味着在这一方向上没有数据流动。客户端执行主动关闭并进入TIME_WAIT是正常的，服务端通常执行被动关闭，不会进入TIME_WAIT状态。</p>
<p>在socket编程中，任何一方执行close()操作即可产生挥手操作。</p>
<p><img src="/四次挥手.jpg" alt="alt"></p>
<p><strong>TCP 为什么是四次挥手，而不是三次？</strong></p>
<ul>
<li>当 A 给 B 发送 FIN 报文时，代表 A 不再发送报文，但仍可以接收报文。</li>
<li>B 可能还有数据需要发送，因此先发送 ACK 报文，告知 A “我知道你想断开连接的请求了”。这样 A 便不会因为没有收到应答而继续发送断开连接的请求（即 FIN 报文）。</li>
<li>B 在处理完数据后，就向 A 发送一个 FIN 报文，然后进入 LAST_ACK 阶段（最后确认）。</li>
<li>A 向 B 发送 ACK 报文，双方都断开连接。</li>
</ul>
<p>参考链接：</p>
<ul>
<li><a href="https://github.com/ljianshu/issues/24" target="_blank" rel="noopener noreferrer">从URL输入到页面展现到底发生什么？<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kaola-fed/issues/271" target="_blank" rel="noopener noreferrer">从输入页面地址到展示页面信息都发生了些什么？<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/86426969" target="_blank" rel="noopener noreferrer">面试官，不要再问我三次握手和四次挥手<ExternalLinkIcon/></a></li>
</ul>
</div></template>


