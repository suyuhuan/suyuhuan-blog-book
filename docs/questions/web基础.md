---
sidebarDepth: 4
pageClass: custom-code-highlight
---

# web综合基础

## HTML、HTTP、web综合问题

### 1 前端需要注意哪些SEO

- 合理的`title`、`description`、`keywords`：搜索对着三项的权重逐个减小，`title`值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面`title`要有所不同；`description`把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面`description`有所不同；`keywords`列举出重要关键词即可
- 语义化的`HTML`代码，符合W3C规范：语义化代码让搜索引擎容易理解网页
- 重要内容`HTML`代码放在最前：搜索引擎抓取`HTML`顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用`js`输出：爬虫不会执行js获取内容
- 少用`iframe`：搜索引擎不会抓取`iframe`中的内容
- 非装饰性图片必须加`alt`
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

### 2 `<img>`的`title`和`alt`有什么区别

- 通常当鼠标滑动到元素上的时候显示
- `alt`是`<img>`的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。


### 3 HTTP的几种请求方法用途

- `GET`方法
  - 发送一个请求来取得服务器上的某一资源

- `POST`方法
  - 向`URL`指定的资源提交数据或附加新的数据

- `PUT`方法
  - 跟`POST`方法很像，也是想服务器提交数据。但是，它们之间有不同。`PUT`指定了资源在服务器上的位置，而`POST`没有

- `HEAD`方法
  - 只请求页面的首部

- `DELETE`方法
  - 删除服务器上的某资源

- `OPTIONS`方法
  - 它用于获取当前`URL`所支持的方法。如果请求成功，会有一个`Allow`的头包含类似`“GET,POST”`这样的信息

- `TRACE`方法
  - `TRACE`方法被用于激发一个远程的，应用层的请求消息回路

- `CONNECT`方法
  - 把请求连接转换到透明的`TCP/IP`通道

### 4 从浏览器地址栏输入url到显示页面的步骤

**基础版本**

- 浏览器根据请求的`URL`交给`DNS`域名解析，找到真实`IP`，向服务器发起请求；
- 服务器交给后台处理完成后返回数据，浏览器接收文件（`HTML、JS、CSS`、图象等）；
- 浏览器对加载到的资源（`HTML、JS、CSS`等）进行语法解析，建立相应的内部数据结构（如`HTML`的`DOM`）；
- 载入解析到的资源文件，渲染页面，完成。

**详细版**

1. 在浏览器地址栏输入URL
2. 浏览器查看**缓存**，如果请求资源在缓存中并且新鲜，跳转到转码步骤
    1. 如果资源未缓存，发起新请求
    2. 如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。
    3. 检验新鲜通常有两个HTTP头进行控制`Expires`和`Cache-Control`：
        - HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期
        - HTTP1.1增加了Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
3. 浏览器**解析URL**获取协议，主机，端口，path
4. 浏览器**组装一个HTTP（GET）请求报文**
5. 浏览器**获取主机ip地址**，过程如下：
    1. 浏览器缓存
    2. 本机缓存
    3. hosts文件
    4. 路由器缓存
    5. ISP DNS缓存
    6. DNS递归查询（可能存在负载均衡导致每次IP不一样）
6. **打开一个socket与目标IP地址，端口建立TCP链接**，三次握手如下：
    1. 客户端发送一个TCP的**SYN=1，Seq=X**的包到服务器端口
    2. 服务器发回**SYN=1， ACK=X+1， Seq=Y**的响应包
    3. 客户端发送**ACK=Y+1， Seq=Z**
7. TCP链接建立后**发送HTTP请求**
8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序
9. 服务器检查**HTTP请求头是否包含缓存验证信息**如果验证缓存新鲜，返回**304**等对应状态码
10. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作
11. 服务器将**响应报文通过TCP连接发送回浏览器**
12. 浏览器接收HTTP响应，然后根据情况选择**关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下**：
    1. 主动方发送**Fin=1， Ack=Z， Seq= X**报文
    2. 被动方发送**ACK=X+1， Seq=Z**报文
    3. 被动方发送**Fin=1， ACK=X， Seq=Y**报文
    4. 主动方发送**ACK=Y， Seq=X**报文
13. 浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同
14. 如果资源可缓存，**进行缓存**
15. 对响应进行**解码**（例如gzip压缩）
16. 根据资源类型决定如何处理（假设资源为HTML文档）
17. **解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本**，这些操作没有严格的先后顺序，以下分别解释
18. **构建DOM树**：
    1. **Tokenizing**：根据HTML规范将字符流解析为标记
    2. **Lexing**：词法分析将标记转换为对象并定义属性和规则
    3. **DOM construction**：根据HTML标记关系将对象组成DOM树
19. 解析过程中遇到图片、样式表、js文件，**启动下载**
20. 构建**CSSOM树**：
    1. **Tokenizing**：字符流转换为标记流
    2. **Node**：根据标记创建节点
    3. **CSSOM**：节点创建CSSOM树
21. **[根据DOM树和CSSOM树构建渲染树](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)**:
    1. 从DOM树的根节点遍历所有**可见节点**，不可见节点包括：1）`script`,`meta`这样本身不可见的标签。2)被css隐藏的节点，如`display: none`
    2. 对每一个可见节点，找到恰当的CSSOM规则并应用
    3. 发布可视节点的内容和计算样式
22. **js解析如下**：
    1. 浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时**document.readystate为loading**
    2. HTML解析器遇到**没有async和defer的script时**，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用document.write()把文本插入到输入流中。**同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容**
    3. 当解析器遇到设置了**async**属性的script时，开始下载脚本并继续解析文档。脚本会在它**下载完成后尽快执行**，但是**解析器不会停下来等它下载**。异步脚本**禁止使用document.write()**，它们可以访问自己script和之前的文档元素
    4. 当文档完成解析，document.readState变成interactive
    5. 所有**defer**脚本会**按照在文档出现的顺序执行**，延迟脚本**能访问完整文档树**，禁止使用document.write()
    6. 浏览器**在Document对象上触发DOMContentLoaded事件**
    7. 此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些**内容完成载入并且所有异步脚本完成载入和执行**，document.readState变为complete，window触发load事件
23. **显示页面**（HTML解析过程中会逐步显示页面）

**详细简版**

1. 从浏览器接收`url`到开启网络请求线程（这一部分可以展开浏览器的机制以及进程与线程之间的关系）

2. 开启网络线程到发出一个完整的`HTTP`请求（这一部分涉及到dns查询，`TCP/IP`请求，五层因特网协议栈等知识）

3. 从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）

4. 后台和前台的`HTTP`交互（这一部分包括`HTTP`头部、响应码、报文结构、`cookie`等知识，可以提下静态资源的`cookie`优化，以及编码解码，如`gzip`压缩等）

5. 单独拎出来的缓存问题，`HTTP`的缓存（这部分包括http缓存头部，`ETag`，`catch-control`等）

6. 浏览器接收到`HTTP`数据包后的解析流程（解析`html`-词法分析然后解析成`dom`树、解析`css`生成`css`规则树、合并成`render`树，然后`layout`、`painting`渲染、复合图层的合成、`GPU`绘制、外链资源的处理、`loaded`和`DOMContentLoaded`等）

7. `CSS`的可视化格式模型（元素的渲染规则，如包含块，控制框，`BFC`，`IFC`等概念）

8. `JS`引擎解析过程（`JS`的解释阶段，预处理阶段，执行阶段生成执行上下文，`VO`，作用域链、回收机制等等）

9. 其它（可以拓展不同的知识模块，如跨域，web安全，`hybrid`模式等等内容）

### 5 如何进行网站性能优化

- `content`方面
  - 减少`HTTP`请求：合并文件、`CSS`精灵、`inline Image`
  - 减少`DNS`查询：`DNS`缓存、将资源分布到恰当数量的主机名
  - 减少`DOM`元素数量

- `Server`方面
  - 使用`CDN`
  - 配置`ETag`
  -  对组件使用`Gzip`压缩

- `Cookie`方面
  - 减小`cookie`大小

- `css`方面
    - 将样式表放到页面顶部
    - 不使用`CSS`表达式
    -  使用`<link>`不使用`@import`

- `Javascript`方面
    - 将脚本放到页面底部
    - 将`javascript`和`css`从外部引入
    - 压缩`javascript`和`css`
    - 删除不需要的脚本
    - 减少`DOM`访问

- 图片方面
   - 优化图片：根据实际颜色需要选择色深、压缩
   - 优化`css`精灵
   - 不要在`HTML`中拉伸图片


### 6 HTTP状态码及其含义

- `1XX`：信息状态码
    -  `100  Continue`   继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息
- `2XX`：成功状态码
    - `200  OK`         正常返回信息
    - `201  Created `   请求成功并且服务器创建了新的资源
    - `202  Accepted`   服务器已接受请求，但尚未处理
- `3XX`：重定向
   - `301  Moved Permanently`  请求的网页已永久移动到新位置。
   - `302 Found  `     临时性重定向。
   - `303 See Other `  临时性重定向，且总是使用 `GET` 请求新的 `URI`。
   - `304  Not Modified` 自从上次请求后，请求的网页未修改过。
- `4XX`：客户端错误
     - `400 Bad Request ` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
     - `401 Unauthorized` 请求未授权。
     - `403 Forbidden `  禁止访问。
     - `404 Not Found`   找不到如何与 `URI` 相匹配的资源。
- `5XX:` 服务器错误
   - `500 Internal Server Error`  最常见的服务器端错误。
   - `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）。

### 7 语义化的理解

- 用正确的标签做正确的事情！
- `HTML`语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；
- 在没有样式`CSS`情况下也以一种文档格式显示，并且是容易阅读的。
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 `SEO`。
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解

### 8 介绍一下你对浏览器内核的理解？

- 主要分成两部分：渲染引擎(`layout engineer`或`Rendering Engine`)和`JS`引擎

- 渲染引擎：负责取得网页的内容（`HTML`、`XML`、图像等等）、整理讯息（例如加入`CSS`等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核
- `JS`引擎则：解析和执行`javascript`来实现网页的动态效果
- 最开始渲染引擎和`JS`引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎

### 9 html5有哪些新特性、移除了那些元素？
- `HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加
  - 绘画 `canvas`
  - 用于媒介回放的 `video` 和 `audio` 元素
  - 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失
  - `sessionStorage` 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如` article`、`footer`、`header`、`nav`、`section`
  - 表单控件，`calendar`、`date`、`time`、`email`、`url`、`search`
  - 新的技术`webworker`、 `websocket`、 `Geolocation`

- 移除的元素：
  - 纯表现的元素：`basefont`、`big`、`center`、`font`、 `s`、`strike`、`tt`、`u`
  - 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`

- 支持`HTML5`新标签：
  - `IE8/IE7/IE6`支持通过`document.createElement`方法产生的标签
  - 可以利用这一特性让这些浏览器支持`HTML5`新标签
  - 浏览器支持新标签后，还需要添加标签默认的样式

- 当然也可以直接使用成熟的框架、比如`html5shim`

### 10 `HTML5`的离线储存怎么使用，工作原理能不能解释一下？

- 在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件

- 原理：`HTML5`的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

- 如何使用：
  - 页面头部像下面一样加入一个`manifest`的属性；
  - 在`cache.manifest`文件的编写离线存储的资源
  - 在离线状态时，操作`window.applicationCache`进行需求实现

```json
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
/offline.html
```

### 11 浏览器是怎么对`HTML5`的离线储存资源进行管理和加载的呢

- 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过`app`并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件与旧的`manifest`文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

- 离线的情况下，浏览器就直接使用离线存储的资源。

### 12 请描述一下 `cookies`，`sessionStorage` 和 `localStorage` 的区别？
- `cookie`是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 存储大小：
  - `cookie`数据大小不能超过4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比`cookie`大得多，可以达到5M或更大

- 有期时间：
  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - `sessionStorage` 数据在当前浏览器窗口关闭后自动删除
  - `cookie` 设置的`cookie`过期时间之前一直有效，即使窗口或浏览器关闭

### 13 iframe有那些缺点？

- `iframe`会阻塞主页面的`Onload`事件
- 搜索引擎的检索程序无法解读这种页面，不利于`SEO`
- `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
- 使用`iframe`之前需要考虑这两个缺点。如果需要使用`iframe`，最好是通过`javascript`动态给`iframe`添加`src`属性值，这样可以绕开以上两个问题

### 14 WEB标准以及W3C标准是什么?

- 标签闭合、标签小写、不乱嵌套、使用外链`css`和`js`、结构行为表现的分离

### 15 xhtml和html有什么区别?

- 一个是功能上的差别
  - 主要是`XHTML`可兼容各大浏览器、手机以及`PDA`，并且浏览器也能快速正确地编译网页

- 另外是书写习惯的差别
  - `XHTML` 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素

### 16 Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?

- 页面被加载的时，`link`会同时被加载，而`@imort`页面被加载的时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载
`import`只在`IE5`以上才能识别，而`link`是`XHTML`标签，无兼容问题
`link`方式的样式的权重 高于`@import`的权重
- `<!DOCTYPE>` 声明位于文档中的最前面，处于 `<html>` 标签之前。告知浏览器的解析器， 用什么文档类型 规范来解析这个文档
- 严格模式的排版和 `JS` 运作模式是 以该浏览器支持的最高标准运行
- 在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。 `DOCTYPE`不存在或格式不正确会导致文档以混杂模式呈现

### 17 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？行内元素和块级元素有什么区别？

- 行内元素有：`a b span img input select strong`
- 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4… p`
- 空元素：`<br> <hr> <img> <input> <link> <meta>`
- 行内元素不可以设置宽高，不独占一行
- 块级元素可以设置宽高，独占一行

### 18 HTML全局属性(global attribute)有哪些

- `class`:为元素设置类标识
- `data-*`: 为元素增加自定义属性
- `draggable`: 设置元素是否可拖拽
- `id`: 元素`id`，文档内唯一
- `lang`: 元素内容的的语言
- `style`: 行内`css`样式
- `title`: 元素相关的建议信息

### 19 Canvas和SVG有什么区别？

- `svg`绘制出来的每一个图形的元素都是独立的`DOM`节点，能够方便的绑定事件或用来修改。`canvas`输出的是一整幅画布
- `svg`输出的图形是矢量图形，后期可以修改参数来自由放大缩小，不会失真和锯齿。而`canvas`输出标量画布，就像一张图片一样，放大会失真或者锯齿

### 20 HTML5 为什么只需要写 <!DOCTYPE HTML>

-  `HTML5` 不基于 `SGML`，因此不需要对`DTD`进行引用，但是需要`doctype`来规范浏览器的行为
-  而`HTML4.01`基于`SGML`,所以需要对`DTD`进行引用，才能告知浏览器文档所使用的文档类型


### 21 如何在页面上实现一个圆形的可点击区域？

- `svg`
- `border-radius`
- 纯`js`实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等

### 22 网页验证码是干嘛的，是为了解决什么安全问题

- 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试

### 23 viewport

```javascript
 <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    // width    设置viewport宽度，为一个正整数，或字符串‘device-width’
    // device-width  设备宽度
    // height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
    // initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
    // minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
    // maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
    // user-scalable    是否允许手动缩放
```

- 延伸提问
   - 怎样处理 移动端 `1px` 被 渲染成 `2px `问题

**局部处理**

- `mate`标签中的 `viewport`属性 ，`initial-scale` 设置为 `1`
- `rem `按照设计稿标准走，外加利用`transfrome` 的`scale(0.5)` 缩小一倍即可；

**全局处理**

- `mate`标签中的 `viewport`属性 ，`initial-scale` 设置为 `0.5`
- `rem` 按照设计稿标准走即可


### 24 渲染优化

- 禁止使用`iframe`（阻塞父文档`onload`事件）
  - `iframe`会阻塞主页面的`Onload`事件
  - 搜索引擎的检索程序无法解读这种页面，不利于SEO
  - `iframe`和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
  - 使用`iframe`之前需要考虑这两个缺点。如果需要使用`iframe`，最好是通过`javascript`
  - 动态给`iframe`添加`src`属性值，这样可以绕开以上两个问题

- 禁止使用`gif`图片实现`loading`效果（降低`CPU`消耗，提升渲染性能）
- 使用`CSS3`代码代替`JS`动画（尽可能避免重绘重排以及回流）
- 对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费`CPU`
  - 小图标优势在于
    - 减少`HTTP`请求
    - 避免文件跨域
    - 修改及时生效
- 页面头部的`<style></style>` `<script></script>` 会阻塞页面；（因为 `Renderer`进程中 `JS`线程和渲染线程是互斥的）
- 页面中空的 `href` 和 `src` 会阻塞页面其他资源的加载 (阻塞下载进程)
- 网页`gzip`，`CDN`托管，`data`缓存 ，图片服务器
- 前端模板 JS+数据，减少由于`HTML`标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
- 用`innerHTML`代替`DOM`操作，减少`DOM`操作次数，优化`javascript`性能
- 当需要设置的样式很多时设置`className`而不是直接操作`style`
- 少用全局变量、缓存`DOM`节点查找的结果。减少`IO`读取操作
- 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳
- 对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘`IO`

### 25 meta viewport相关

```html
<!DOCTYPE html>  <!--H5标准声明，使用 HTML5 doctype，不区分大小写-->
<head lang=”en”> <!--标准的 lang 属性写法-->
<meta charset=’utf-8′>    <!--声明文档使用的字符编码-->
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   <!--优先使用 IE 最新版本和 Chrome-->
<meta name=”description” content=”不超过150个字符”/>       <!--页面描述-->
<meta name=”keywords” content=””/>     <!-- 页面关键词-->
<meta name=”author” content=”name, email@gmail.com”/>    <!--网页作者-->
<meta name=”robots” content=”index,follow”/>      <!--搜索引擎抓取-->
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> <!--为移动设备添加 viewport-->
<meta name=”apple-mobile-web-app-title” content=”标题”> <!--iOS 设备 begin-->
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  <!--添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏-->
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
<!--添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）-->
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/>  <!--设置苹果工具栏颜色-->
<meta name=”renderer” content=”webkit”> <!-- 启用360浏览器的极速模式(webkit)-->
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     <!--避免IE使用兼容模式-->
<meta http-equiv=”Cache-Control” content=”no-siteapp” />    <!--不让百度转码-->
<meta name=”HandheldFriendly” content=”true”>     <!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓-->
<meta name=”MobileOptimized” content=”320″>   <!--微软的老式浏览器-->
<meta name=”screen-orientation” content=”portrait”>   <!--uc强制竖屏-->
<meta name=”x5-orientation” content=”portrait”>    <!--QQ强制竖屏-->
<meta name=”full-screen” content=”yes”>              <!--UC强制全屏-->
<meta name=”x5-fullscreen” content=”true”>       <!--QQ强制全屏-->
<meta name=”browsermode” content=”application”>   <!--UC应用模式-->
<meta name=”x5-page-mode” content=”app”>   <!-- QQ应用模式-->
<meta name=”msapplication-tap-highlight” content=”no”>    <!--windows phone 点击无高亮
设置页面不缓存-->
<meta http-equiv=”pragma” content=”no-cache”>
<meta http-equiv=”cache-control” content=”no-cache”>
<meta http-equiv=”expires” content=”0″>
```

### 26 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?

- `IE`: `trident`内核
- `Firefox`：`gecko`内核
- `Safari`:`webkit`内核
- `Opera`:以前是`presto`内核，`Opera`现已改用Google - `Chrome`的`Blink`内核
- `Chrome:Blink`(基于`webkit`，Google与Opera Software共同开发)

### 27 div+css的布局较table布局有什么优点？

- 改版的时候更方便 只要改`css`文件。
- 页面加载速度更快、结构化清晰、页面显示简洁。
- 表现与结构相分离。
- 易于优化（`seo`）搜索引擎更友好，排名更容易靠前。

### 28 a：img的alt与title有何异同？b：strong与em的异同？

- `alt(alt text)`:为不能显示图像、窗体或`applets`的用户代理（`UA`），`alt`属性用来指定替换文字。替换文字的语言由`lang`属性指定。(在IE浏览器下会在没有`title`时把`alt`当成 `tool tip`显示)
- `title(tool tip)`:该属性为设置该属性的元素提供建议性的信息

- `strong`:粗体强调标签，强调，表示内容的重要性
- `em`:斜体强调标签，更强烈强调，表示内容的强调点

### 29 你能描述一下渐进增强和优雅降级之间的不同吗

- 渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

> 区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带

### 30 为什么利用多个域名来存储网站资源会更有效？

- `CDN`缓存更方便
- 突破浏览器并发限制
- 节约`cookie`带宽
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题

### 31 简述一下src与href的区别

- `src`用于替换当前元素，href用于在当前文档和引用资源之间确立联系。
- `src`是`source`的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求`src`资源时会将其指向的资源下载并应用到文档内，例如`js`脚本，`img`图片和`frame`等元素

> `<script src ="js.js"></script>` 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部

- `href`是`Hypertext Reference`的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加
- `<link href="common.css" rel="stylesheet"/>`那么浏览器会识别该文档为`css`文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用`link`方式来加载`css`，而不是使用`@import`方式

### 32 知道的网页制作会用到的图片格式有哪些？

- `png-8`、`png-24`、`jpeg`、`gif`、`svg`

> 但是上面的那些都不是面试官想要的最后答案。面试官希望听到是`Webp`,`Apng`。（是否有关注新技术，新鲜事物）

- **Webp**：`WebP`格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有`JPEG`的`2/3`，并能节省大量的服务器带宽资源和数据空间。`Facebook Ebay`等知名网站已经开始测试并使用`WebP`格式。
- 在质量相同的情况下，WebP格式图像的体积要比JPEG格式图像小`40%`。
- **Apng**：全称是`“Animated Portable Network Graphics”`, 是PNG的位图动画扩展，可以实现png格式的动态图片效果。04年诞生，但一直得不到各大浏览器厂商的支持，直到日前得到 `iOS safari 8`的支持，有望代替`GIF`成为下一代动态图标准

### 33 在css/js代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理？

> `dns`缓存，`cdn`缓存，浏览器缓存，服务器缓存


### 33 一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验。

- 图片懒加载，在页面上的未可视区域可以添加一个滚动事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。
- 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。
- 如果图片为css图片，可以使用`CSSsprite`，`SVGsprite`，`Iconfont`、`Base64`等技术。
- 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。
- 如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致。

### 34 常见排序算法的时间复杂度,空间复杂度

![](https://github.com/qiu-deqing/FE-interview/raw/master/img/sort-compare.png)

### 35 web开发中会话跟踪的方法有哪些

- `cookie`
- `session`
- `url`重写
- 隐藏`input`
- `ip`地址

### 36 HTTP request报文结构是怎样的

1. 首行是**Request-Line**包括：**请求方法**，**请求URI**，**协议版本**，**CRLF**
2. 首行之后是若干行**请求头**，包括**general-header**，**request-header**或者**entity-header**，每个一行以CRLF结束
3. 请求头和消息实体之间有一个**CRLF分隔**
4. 根据实际请求需要可能包含一个**消息实体**
一个请求报文例子如下：

```
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25
```

### 37 HTTP response报文结构是怎样的


- 首行是状态行包括：**HTTP版本，状态码，状态描述**，后面跟一个CRLF
- 首行之后是**若干行响应头**，包括：**通用头部，响应头部，实体头部**
- 响应头部和响应实体之间用**一个CRLF空行**分隔
- 最后是一个可能的**消息实体**
响应报文例子如下：


```
HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25}
```

## CSS部分

### 1 css sprite是什么,有什么优缺点

- 概念：将多个小图片拼接到一个图片中。通过`background-position`和元素尺寸调节需要显示的背景图案。

- 优点：

   - 减少`HTTP`请求数，极大地提高页面加载速度
   - 增加图片信息重复度，提高压缩比，减少图片大小
   - 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

- 缺点：

  - 图片合并麻烦
  - 维护麻烦，修改一个图片可能需要从新布局整个图片，样式


### 2 `display: none;`与`visibility: hidden;`的区别

- 联系：它们都能让元素不可见

- 区别：

   - `display:none`;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility: hidden`;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
   - `display: none`;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示`；visibility: hidden;`是继承属性，子孙节点消失由于继承了`hidden`，通过设置`visibility: visible;`可以让子孙节点显式
   - 修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘。
   - 读屏器不会读取`display: none`;元素内容；会读取`visibility: hidden;`元素内容


### 3 `link`与`@import`的区别

1. ``link``是`HTML`方式， ``@import``是CSS方式
2. ``link``最大限度支持并行下载，``@import``过多嵌套导致串行下载，出现`FOUC`(文档样式短暂失效)
4. ``link``可以通过``rel="alternate stylesheet"``指定候选样式
5. 浏览器对``link``支持早于``@import``，可以使用``@import``对老浏览器隐藏样式
6. ``@import``必须在样式规则之前，可以在css文件中引用其他文件
6. 总体来说：`link`优于`@import`


### 4 什么是FOUC?如何避免

- `Flash Of Unstyled Content`：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
- **解决方法**：把样式表放到文档的`<head>`

### 5 如何创建块级格式化上下文(block formatting context),BFC有什么用

- 创建规则：

  - 根元素
  - 浮动元素（``float``不取值为``none``）
  - 绝对定位元素（``position``取值为``absolute``或``fixed``）
  - ``display``取值为``inline-block``、``table-cell``、``table-caption``、``flex``、``inline-flex``之一的元素
  - ``overflow``不取值为``visible``的元素

- 作用：

  - 可以包含浮动元素
  - 不被浮动元素覆盖
  - 阻止父子元素的`margin`折叠

### 6 display、float、position的关系

- 如果`display`取值为`none`，那么`position`和`float`都不起作用，这种情况下元素不产生框
- 否则，如果`position`取值为`absolute`或者`fixed`，框就是绝对定位的，`float`的计算值为`none`，`display`根据下面的表格进行调整。
- 否则，如果`float`不是`none`，框是浮动的，`display`根据下表进行调整
- 否则，如果元素是根元素，`display`根据下表进行调整
- 其他情况下`display`的值为指定值
- 总结起来：**绝对定位、浮动、根元素都需要调整``display``**

### 7 清除浮动的几种方式，各自的优缺点

- 父级`div`定义`height`
- 结尾处加空`div`标签`clear:both`
- 父级`div`定义伪类`:after`和`zoom`
- 父级`div`定义`overflow:hidden`
- 父级`div`也浮动，需要定义宽度
- 结尾处加`br`标签`clear:both`
- 比较好的是第3种方式，好多网站都这么用

### 8 为什么要初始化CSS样式?

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对`CSS`初始化往往会出现浏览器之间的页面显示差异。
- 当然，初始化样式会对`SEO`有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化

### 9 css3有哪些新特性

- 新增各种`css`选择器
- 圆角 `border-radius`
- 多列布局
- 阴影和反射
- 文字特效`text-shadow`
- 线性渐变
- 旋转`transform`

**CSS3新增伪类有那些？**

- `p:first-of-type` 选择属于其父元素的首个`<p> `元素的每个` <p>` 元素。
- `p:last-of-type`  选择属于其父元素的最后 `<p>` 元素的每个` <p>` 元素。
- `p:only-of-type`  选择属于其父元素唯一的 `<p> `元素的每个 `<p>` 元素。
- `p:only-child `       选择属于其父元素的唯一子元素的每个 `<p>` 元素。
- `p:nth-child(2)`  选择属于其父元素的第二个子元素的每个 `<p>` 元素。
- `:after  `        在元素之前添加内容,也可以用来做清除浮动。
- `:before  `       在元素之后添加内容。
- `:enabled `       已启用的表单元素。
- `:disabled `      已禁用的表单元素。
- `:checked `       单选框或复选框被选中。

### 10 display有哪些值？说明他们的作用

- `block`         转换成块状元素。
- `inline`        转换成行内元素。
- `none`          设置元素不可见。
- `inline-block ` 象行内元素一样显示，但其内容象块类型元素一样显示。
- `list-item  `   象块类型元素一样显示，并添加样式列表标记。
- `table  `       此元素会作为块级表格来显示
- `inherit `      规定应该从父元素继承 `display` 属性的值

### 11 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？
- 有两种， `IE `盒子模型、`W3C `盒子模型；
- 盒模型： 内容(content)、填充(`padding`)、边界(`margin`)、 边框(`border`)；
- 区  别： `IE`的c`ontent`部分把 `border` 和 `padding`计算了进去;

### 12 CSS优先级算法如何计算？

- 优先级就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准
- 优先级为: `!important >  id > class > tag`; `!important` 比 内联优先级高

### 13 对BFC规范的理解？

- 它决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用

### 14 谈谈浮动和清除浮动

- 浮动的框可以向左或向右移动，直到他的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流的块框表现得就像浮动框不存在一样。浮动的块框会漂浮在文档普通流的块框上

### 15 position的值， relative和absolute定位原点是
- `absolute`：生成绝对定位的元素，相对于 `static` 定位以外的第一个父元素进行定位
- `fixed`：生成绝对定位的元素，相对于浏览器窗口进行定位
- `relative`：生成相对定位的元素，相对于其正常位置进行定位
- `static` 默认值。没有定位，元素出现在正常的流中
- `inherit` 规定从父元素继承 `position` 属性的值

### 16 display:inline-block 什么时候不会显示间隙？(携程)

- 移除空格
- 使用`margin`负值
- 使用`font-size:0`
- `letter-spacing`
- `word-spacing`

### 17 PNG\GIF\JPG的区别及如何选

- `GIF`
  - `8`位像素，`256`色
  - 无损压缩
  - 支持简单动画
  - 支持`boolean`透明
  - 适合简单动画

- `JPEG`
  - 颜色限于`256`
  - 有损压缩
  - 可控制压缩质量
  - 不支持透明
  - 适合照片
- `PNG`
  - 有`PNG8`和`truecolor PNG`
  - `PNG8`类似`GIF`颜色上限为`256`，文件小，支持`alpha`透明度，无动画
  - 适合图标、背景、按钮

### 18 行内元素float:left后是否变为块级元素？

> 行内元素设置成浮动之后变得更加像是`inline-block`（行内块级元素，设置成这个属性的元素会同时拥有行内和块级的特性，最明显的不同是它的默认宽度不是`100%`），这时候给行内元素设置`padding-top`和`padding-bottom`或者`width`、`height`都是有效果的

### 19 在网页中的应该使用奇数还是偶数的字体？为什么呢？

- 偶数字号相对更容易和 web 设计的其他部分构成比例关系

### 20 ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用

- 单冒号(`:`)用于`CSS3`伪类，双冒号(`::`)用于`CSS3`伪元素
- 用于区分伪类和伪元素

### 21 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

- 多数显示器默认频率是`60Hz`，即`1`秒刷新`60`次，所以理论上最小间隔为`1/60*1000ms ＝ 16.7ms`


### 22 CSS合并方法

- 避免使用`@import`引入多个`css`文件，可以使用`CSS`工具将`CSS`合并为一个`CSS`文件，例如使用`Sass\Compass`等


### 23 CSS不同选择器的权重(CSS层叠的规则)

- `！important`规则最重要，大于其它规则
- 行内样式规则，加`1000`
- 对于选择器中给定的各个`ID`属性值，加`100`
- 对于选择器中给定的各个类属性、属性选择器或者伪类选择器，加`10`
- 对于选择其中给定的各个元素标签选择器，加1
- 如果权值一样，则按照样式规则的先后顺序来应用，顺序靠后的覆盖靠前的规则

### 24 列出你所知道可以改变页面布局的属性

- `position`、`display`、`float`、`width`、`height`、`margin`、`padding`、`top`、`left`、`right`、`

### 25 CSS在性能优化方面的实践

- `css`压缩与合并、`Gzip`压缩
- `css`文件放在`head`里、不要用`@import`
- 尽量用缩写、避免用滤镜、合理使用选择器

### 26 CSS3动画（简单动画的实现，如旋转等）
- 依靠`CSS3`中提出的三个属性：`transition`、`transform`、`animation`
- `transition`：定义了元素在变化过程中是怎么样的，包含`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`。
- `transform`：定义元素的变化结果，包含`rotate`、`scale`、`skew`、`translate`。
- `animation`：动画定义了动作的每一帧（`@keyframes`）有什么效果，包括`animation-name`，`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`

### 27 base64的原理及优缺点
- 优点可以加密，减少了`HTTTP`请求
- 缺点是需要消耗`CPU`进行编解码

### 28 几种常见的CSS布局

#### 流体布局

```css
	.left {
		float: left;
		width: 100px;
		height: 200px;
		background: red;
	}
	.right {
		float: right;
		width: 200px;
		height: 200px;
		background: blue;
	}
	.main {
		margin-left: 120px;
		margin-right: 220px;
		height: 200px;
		background: green;
	}
```
```html
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

#### 圣杯布局

```css
.container {
    margin-left: 120px;
    margin-right: 220px;
}
.main {
    float: left;
    width: 100%;
    height:300px;
    background: green;
}
.left {
    position: relative;
    left: -120px;
    float: left;
    height: 300px;
    width: 100px;
    margin-left: -100%;
    background: red;
}
.right {
    position: relative;
    right: -220px;
    float: right;
    height: 300px;
    width: 200px;
    margin-left: -200px;
    background: blue;
}
```

```html
<div class="container">
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```

#### 双飞翼布局

```css
.content {
    float: left;
    width: 100%;
}
.main {
    height: 200px;
    margin-left: 110px;
    margin-right: 220px;
    background: green;
}
.main::after {
    content: '';
    display: block;
    font-size:0;
    height: 0;
    zoom: 1;
    clear: both;
}
.left {
    float:left;
    height: 200px;
    width: 100px;
    margin-left: -100%;
    background: red;
}
.right {
    float: right;
    height: 200px;
    width: 200px;
    margin-left: -200px;
    background: blue;
}
```

```html
<div class="content">
    <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

### 29 stylus/sass/less区别

- 均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性
- `Scss`和`LESS`语法较为严谨，`LESS`要求一定要使用大括号“{}”，`Scss`和`Stylus`可以通过缩进表示层次与嵌套关系
- `Scss`无全局变量的概念，`LESS`和`Stylus`有类似于其它语言的作用域概念
- `Sass`是基于`Ruby`语言的，而`LESS`和`Stylus`可以基于`NodeJS` `NPM`下载相应库后进行编译；

### 30 postcss的作用

- 可以直观的理解为：它就是一个平台。为什么说它是一个平台呢？因为我们直接用它，感觉不能干什么事情，但是如果让一些插件在它上面跑，那么将会很强大
- `PostCSS` 提供了一个解析器，它能够将 `CSS` 解析成抽象语法树
- 通过在 `PostCSS` 这个平台上，我们能够开发一些插件，来处理我们的`CSS`，比如热门的：`autoprefixer`
- `postcss`可以对sass处理过后的`css`再处理 最常见的就是`autoprefixer`

### 31 css样式（选择器）的优先级

- 计算权重确定
- `!important`
- 内联样式
- 后写的优先级高

### 32 自定义字体的使用场景

- 宣传/品牌/`banner`等固定文案
- 字体图标

### 33 如何美化CheckBox

- `<label>` 属性 `for` 和 `id`
- 隐藏原生的 `<input>`
- `:checked + <label>`

### 34 伪类和伪元素的区别

- 伪类表状态
- 伪元素是真的有元素
- 前者单冒号，后者双冒号

### 35 `base64`的使用

- 用于减少 `HTTP` 请求
- 适用于小图片
- `base64`的体积约为原图的`4/3`

### 36 自适应布局

思路：

- 左侧浮动或者绝对定位，然后右侧`margin`撑开
- 使用`<div>`包含，然后靠负`margin`形成`bfc`
- 使用`flex`

### 37 请用CSS写一个简单的幻灯片效果页面

> 知道是要用`CSS3`。使用`animation`动画实现一个简单的幻灯片效果

```css
/**css**/
.ani{
  width:480px;
  height:320px;
  margin:50px auto;
  overflow: hidden;
  box-shadow:0 0 5px rgba(0,0,0,1);
  background-size: cover;
  background-position: center;
  -webkit-animation-name: "loops";
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes "loops" {
    0% {
        background:url(http://d.hiphotos.baidu.com/image/w%3D400/sign=c01e6adca964034f0fcdc3069fc27980/e824b899a9014c08e5e38ca4087b02087af4f4d3.jpg) no-repeat;             
    }
    25% {
        background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=edee1572e9f81a4c2632edc9e72b6029/30adcbef76094b364d72bceba1cc7cd98c109dd0.jpg) no-repeat;
    }
    50% {
        background:url(http://b.hiphotos.baidu.com/image/w%3D400/sign=937dace2552c11dfded1be2353266255/d8f9d72a6059252d258e7605369b033b5bb5b912.jpg) no-repeat;
    }
    75% {
        background:url(http://g.hiphotos.baidu.com/image/w%3D400/sign=7d37500b8544ebf86d71653fe9f9d736/0df431adcbef76095d61f0972cdda3cc7cd99e4b.jpg) no-repeat;
    }
    100% {
        background:url(http://c.hiphotos.baidu.com/image/w%3D400/sign=cfb239ceb0fb43161a1f7b7a10a54642/3b87e950352ac65ce2e73f76f9f2b21192138ad1.jpg) no-repeat;
    }
}
```

### 38 什么是外边距重叠？重叠的结果是什么？

> 外边距重叠就是margin-collapse

- 在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

**折叠结果遵循下列计算规则**：

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
- 两个外边距一正一负时，折叠结果是两者的相加的和。

### 39 rgba()和opacity的透明效果有什么不同？

- `rgba()`和`opacity`都能实现透明效果，但最大的不同是`opacity`作用于元素，以及元素内的所有内容的透明度，
- 而`rgba()`只作用于元素的颜色或其背景色。（设置`rgba`透明的元素的子元素不会继承透明效果！）

### 40 css中可以让文字在垂直和水平方向上重叠的两个属性是什么？

- 垂直方向：`line-height`
- 水平方向：`letter-spacing`


### 41 如何垂直居中一个浮动元素？

```css
/**方法一：已知元素的高宽**/

#div1{
  background-color:#6699FF;
  width:200px;
  height:200px;
  position: absolute;        //父元素需要相对定位
  top: 50%;
  left: 50%;
  margin-top:-100px ;   //二分之一的height，width
  margin-left: -100px;
}

/**方法二:**/

#div1{
  width: 200px;
  height: 200px;
  background-color: #6699FF;
  margin:auto;
  position: absolute;        //父元素需要相对定位
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
```

**如何垂直居中一个`<img>`?（用更简便的方法。）**

```css
#container     /**<img>的容器设置如下**/
{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
```

### 42 px和em的区别

- `px`和`em`都是长度单位，区别是，`px`的值是固定的，指定是多少就是多少，计算比较容易。`em`得值不是固定的，并且`em`会继承父级元素的字体大小。
- 浏览器的默认字体高都是`16px`。所以未经调整的浏览器都符合: `1em=16px`。那么`12px=0.75em`, `10px=0.625em`。


### 43 Sass、LESS是什么？大家为什么要使用他们？

- 他们是`CSS`预处理器。他是`CSS`上的一种抽象层。他们是一种特殊的语法/语言编译成`CSS`。
- 例如Less是一种动态样式语言. 将CSS赋予了动态语言的特性，如变量，继承，运算， 函数. `LESS` 既可以在客户端上运行 (支持`IE 6+`, `Webkit`, `Firefox`)，也可一在服务端运行 (借助 `Node.js`)

**为什么要使用它们？**

- 结构清晰，便于扩展。
- 可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对- 浏览器语法差异的重复处理，减少无意义的机械劳动。
- 可以轻松实现多重继承。
- 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只- 是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译

### 44 知道css有个content属性吗？有什么作用？有什么应用？

> css的`content`属性专门应用在 `before/after `伪元素上，用于来插入生成内容。最常见的应用是利用伪类清除浮动。

```css
/**一种常见利用伪类清除浮动的代码**/
.clearfix:after {
    content:".";       //这里利用到了content属性
    display:block;
    height:0;
    visibility:hidden;
    clear:both; 
 }
.clearfix {
    *zoom:1;
}
```

### 45 水平居中的方法

- 元素为行内元素，设置父元素`text-align:center`
- 如果元素宽度固定，可以设置左右`margin`为`auto`;
- 如果元素为绝对定位，设置父元素`position`为`relative`，元素设`left:0;right:0;margin:auto;`
- 使用`flex-box`布局，指定`justify-content`属性为center
- `display`设置为`tabel-ceil`

### 46 垂直居中的方法

- 将显示方式设置为表格，`display:table-cell`,同时设置`vertial-align：middle`
- 使用`flex`布局，设置为`align-item：center`
- 绝对定位中设置`bottom:0,top:0`,并设置`margin:auto`
- 绝对定位中固定高度时设置`top:50%，margin-top`值为高度一半的负值
- 文本垂直居中设置`line-height`为`height`值

### 47 如何使用CSS实现硬件加速？

> 硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能，

- 一般触发硬件加速的`CSS`属性有`transform`、`opacity`、`filter`，为了避免2D动画在
开始和结束的时候的`repaint`操作，一般使用`tranform:translateZ(0)`

### 48 重绘和回流（重排）是什么，如何避免？

- DOM的变化影响到了元素的几何属性（宽高）,浏览器重新计算元素的几何属性，其他元素的几何
- 属性和位置也会受到影响，浏览器需要重新构造渲染树，这个过程称为重排，浏览器将受到影响的部分
- 重新绘制到屏幕上的过程称为重绘。引起重排的原因有
  - 添加或者删除可见的DOM元素，
  - 元素位置、尺寸、内容改变，
  - 浏览器页面初始化，
  - 浏览器窗口尺寸改变，重排一定重绘，重绘不一定重排，

**减少重绘和重排的方法**：

- 不在布局信息改变时做`DOM`查询
- 使用`cssText`或者`className`一次性改变属性
- 使用`fragment`
- 对于多次重排的元素，如动画，使用绝对定位脱离文档流，让他的改变不影响到其他元素


### 49 说一说css3的animation

- css3的`animation`是css3新增的动画属性，这个css3动画的每一帧是通过`@keyframes`来声明的，`keyframes`声明了动画的名称，通过`from`、`to`或者是百分比来定义
- 每一帧动画元素的状态，通过`animation-name`来引用这个动画，同时css3动画也可以定义动画运行的时长、动画开始时间、动画播放方向、动画循环次数、动画播放的方式，
- 这些相关的动画子属性有：`animation-name`定义动画名、`animation-duration`定义动画播放的时长、`animation-delay`定义动画延迟播放的时间、`animation-direction`定义
动画的播放方向、`animation-iteration-count`定义播放次数、`animation-fill-mode`定义动画播放之后的状态、`animation-play-state`定义播放状态，如暂停运行等、`animation-timing-function`
- 定义播放的方式，如恒速播放、艰涩播放等。

### 50 左边宽度固定，右边自适应

> 左侧固定宽度，右侧自适应宽度的两列布局实现

html结构

```html
<div class="outer">
    <div class="left">固定宽度</div>
    <div class="right">自适应宽度</div>
</div>
```

> 在外层`div`（类名为`outer`）的`div`中，有两个子`div`，类名分别为`left`和`right`，其中`left`为固定宽度，而`right`为自适应宽度

**方法1：左侧div设置成浮动：float: left，右侧div宽度会自拉升适应**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
    float: left;
}
.right {
    height: 200px;
    background-color: blue;
}
```

**方法2：对右侧:div进行绝对定位，然后再设置right=0，即可以实现宽度自适应**

> 绝对定位元素的第一个高级特性就是其具有自动伸缩的功能，当我们将 `width `设置为 `auto` 的时候（或者不设置，默认为 `auto` ），绝对定位元素会根据其 `left` 和 `right` 自动伸缩其大小

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    position: relative;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
}
.right {
    height: 200px;
    background-color: blue;
    position: absolute;
    left: 200px;
    top:0;          
    right: 0;
}
```

**方法3：将左侧div进行绝对定位，然后右侧div设置margin-left: 200px**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    position: relative;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
    position: absolute;
}
.right {
    height: 200px;
    background-color: blue;
    margin-left: 200px;
}
```

**方法4：使用flex布局**

```css
.outer {
    width: 100%;
    height: 500px;
    background-color: yellow;
    display: flex;
    flex-direction: row;
}
.left {
    width: 200px;
    height: 200px;
    background-color: red;
}
.right {
    height: 200px;
    background-color: blue;
    flex: 1;
}
```

### 51 两种以上方式实现已知或者未知宽度的垂直水平居中

```css
/** 1 **/
.wraper {
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
  }
}

/** 2 **/
.wraper {
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

/** 3 **/
.wraper {
  .box {
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100px;
  }
}

/** 4 **/
.wraper {
  display: table;
  .box {
    display: table-cell;
    vertical-align: middle;
  }
}
```

### 52 如何实现小于12px的字体效果

> `transform:scale()`这个属性只可以缩放可以定义宽高的元素，而行内元素是没有宽高的，我们可以加上一个`display:inline-block`;

```
transform: scale(0.7);
```

`css`的属性，可以缩放大小

## jQuery

### 1 你觉得jQuery或zepto源码有哪些写的好的地方

- jquery源码封装在一个匿名函数的自执行环境中，有助于防止变量的全局污染，然后通过传入window对象参数，可以使window对象作为局部变量使用，好处是当jquery中访问window对象的时候，就不用将作用域链退回到顶层作用域了，从而可以更快的访问window对象。同样，传入undefined参数，可以缩短查找undefined时的作用域链

```javascript
 (function( window, undefined ) {

         //用一个函数域包起来，就是所谓的沙箱

         //在这里边var定义的变量，属于这个函数域内的局部变量，避免污染全局

         //把当前沙箱需要的外部变量通过函数参数引入进来

         //只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数

        window.jQuery = window.$ = jQuery;

    })( window );
```

- jquery将一些原型属性和方法封装在了jquery.prototype中，为了缩短名称，又赋值给了jquery.fn，这是很形象的写法
- 有一些数组或对象的方法经常能使用到，jQuery将其保存为局部变量以提高访问速度
- jquery实现的链式调用可以节约代码，所返回的都是同一个对象，可以提高代码效率


### 2 jQuery 的实现原理

- `(function(window, undefined) {})(window);`
- `jQuery` 利用 `JS` 函数作用域的特性，采用立即调用表达式包裹了自身，解决命名空间和变量污染问题

- `window.jQuery = window.$ = jQuery;`
- 在闭包当中将 jQuery 和 $ 绑定到 window 上，从而将 jQuery 和 $ 暴露为全局变量

### 3 `jQuery.fn` 的 `init` 方法返回的 `this` 指的是什么对象

* jQuery.fn 的 init 方法 返回的 this 就是 jQuery 对象
* 用户使用 jQuery() 或 $() 即可初始化 jQuery 对象，不需要动态的去调用 init 方法

### 4 jQuery.extend 与 jQuery.fn.extend 的区别

* `$.fn.extend()` 和 `$.extend()` 是 `jQuery` 为扩展插件提拱了两个方法
* `$.extend(object)`; // 为jQuery添加“静态方法”（工具方法）

```javascript
$.extend({
　　min: function(a, b) { return a < b ? a : b; },
　　max: function(a, b) { return a > b ? a : b; }
});
$.min(2,3); //  2
$.max(4,5); //  5
```
 * $.extend([true,] targetObject, object1[, object2]); // 对targt对象进行扩展

```javascript
var settings = {validate:false, limit:5};
var options = {validate:true, name:"bar"};
$.extend(settings, options);  // 注意：不支持第一个参数传 false
// settings == {validate:true, limit:5, name:"bar"}
```

* `$.fn.extend(json)`; // 为jQuery添加“成员函数”（实例方法）

```javascript

$.fn.extend({
   alertValue: function() {
      $(this).click(function(){
        alert($(this).val());
      });
   }
});

$("#email").alertValue();
```

### 5 jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝

- 浅拷贝（只复制一份原始对象的引用）
`var newObject = $.extend({}, oldObject);`

- 深拷贝（对原始对象属性所引用的对象进行进行递归拷贝）
`var newObject = $.extend(true, {}, oldObject);`

### 6 jQuery 的队列是如何实现的

* jQuery 核心中有一组队列控制方法，由 `queue()/dequeue()/clearQueue()` 三个方法组成。
* 主要应用于 `animate()`，`ajax`，其他要按时间顺序执行的事件中

```javascript
var func1 = function(){alert('事件1');}
var func2 = function(){alert('事件2');}
var func3 = function(){alert('事件3');}
var func4 = function(){alert('事件4');}

// 入栈队列事件
$('#box').queue("queue1", func1);  // push func1 to queue1
$('#box').queue("queue1", func2);  // push func2 to queue1

// 替换队列事件
$('#box').queue("queue1", []);  // delete queue1 with empty array
$('#box').queue("queue1", [func3, func4]);  // replace queue1

// 获取队列事件（返回一个函数数组）
$('#box').queue("queue1");  // [func3(), func4()]

// 出栈队列事件并执行
$('#box').dequeue("queue1"); // return func3 and do func3
$('#box').dequeue("queue1"); // return func4 and do func4

// 清空整个队列
$('#box').clearQueue("queue1"); // delete queue1 with clearQueue
```

### 7 jQuery 中的 bind(), live(), delegate(), on()的区别


* `bind()` 直接绑定在目标元素上
* `live()` 通过冒泡传播事件，默认`document`上，支持动态数据
* `delegate()` 更精确的小范围使用事件代理，性能优于 live
* `on()` 是最新的`1.9`版本整合了之前的三种方式的新事件绑定机制

### 8 是否知道自定义事件

* 事件即“发布/订阅”模式，自定义事件即“消息发布”，事件的监听即“订阅订阅”
* JS 原生支持自定义事件，示例：

```javascript
  document.createEvent(type); // 创建事件
  event.initEvent(eventType, canBubble, prevent); // 初始化事件
  target.addEventListener('dataavailable', handler, false); // 监听事件
  target.dispatchEvent(e);  // 触发事件
```

- jQuery 里的` fire` 函数用于调用` jQuery `自定义事件列表中的事件


### 9 jQuery 通过哪个方法和 Sizzle 选择器结合的


* `Sizzle` 选择器采取 `Right To Left` 的匹配模式，先搜寻所有匹配标签，再判断它的父节点
* `jQuery` 通过 `$(selecter).find(selecter);` 和 `Sizzle` 选择器结合

### 10 jQuery 中如何将数组转化为 JSON 字符串，然后再转化回来

```javascript
// 通过原生 JSON.stringify/JSON.parse 扩展 jQuery 实现
 $.array2json = function(array) {
    return JSON.stringify(array);
 }

 $.json2array = function(array) {
    // $.parseJSON(array); // 3.0 开始，已过时
    return JSON.parse(array);
 }

 // 调用
 var json = $.array2json(['a', 'b', 'c']);
 var array = $.json2array(json);
```

### 11 jQuery 一个对象可以同时绑定多个事件，这是如何实现的

```javascript
  $("#btn").on("mouseover mouseout", func);

  $("#btn").on({
      mouseover: func1,
      mouseout: func2,
      click: func3
  });
```

### 12 针对 jQuery 的优化方法

* 缓存频繁操作`DOM`对象
* 尽量使用`id`选择器代替`class`选择器
* 总是从`#id`选择器来继承
* 尽量使用链式操作
* 使用时间委托 `on `绑定事件
* 采用`jQuery`的内部函数`data()`来存储数据
* 使用最新版本的 `jQuery`

### 13 jQuery 的 slideUp 动画，当鼠标快速连续触发, 动画会滞后反复执行，该如何处理呢

* 在触发元素上的事件设置为延迟处理：使用 `JS` 原生 `setTimeout` 方法
* 在触发元素的事件时预先停止所有的动画，再执行相应的动画事件：`$('.tab').stop().slideUp();`

### 14 jQuery UI 如何自定义组件

- 通过向 `$.widget()` 传递组件名称和一个原型对象来完成
- `$.widget("ns.widgetName", [baseWidget], widgetPrototype);`

### 15 jQuery 与 jQuery UI、jQuery Mobile 区别

* `jQuery` 是 `JS` 库，兼容各种PC浏览器，主要用作更方便地处理 `DOM`、事件、动画、`AJAX`

* `jQuery UI` 是建立在 `jQuery` 库上的一组用户界面交互、特效、小部件及主题

* `jQuery Mobile` 以 `jQuery` 为基础，用于创建“移动Web应用”的框架

### 16 jQuery 和 Zepto 的区别？ 各自的使用场景


* `jQuery` 主要目标是`PC`的网页中，兼容全部主流浏览器。在移动设备方面，单独推出 `jQuery Mobile
* `Zepto `从一开始就定`位移动设备，相对更轻量级。它的 `API `基本兼容 `jQuery`，但对PC浏览器兼容不理想

### 17 jQuery对象的特点

- 只有 `JQuery `对象才能使用 `JQuery` 方法
- `JQuery` 对象是一个数组对象

## Bootstrap

### 1 什么是Bootstrap？以及为什么要使用Bootstrap？

> `Bootstrap` 是一个用于快速开发 `Web `应用程序和网站的前端框架。`Bootstrap `是基于 `HTML`、`CSS`、`JAVASCRIPT` 的

- `Bootstrap`具有移动设备优先、浏览器支持良好、容易上手、响应式设计等优点，所以`Bootstrap`被广泛应用

### 2 使用Bootstrap时，要声明的文档类型是什么？以及为什么要这样声明？

- 使用`Bootstrap`时，需要使用 `HTML5` 文档类型（`Doctype`）。`<!DOCTYPE html>`
- 因为`Bootstrap `使用了一些 `HTML5` 元素和 `CSS` 属性，如果在 `Bootstrap `创建的网页开头不使用 `HTML5` 的文档类型（`Doctype`），可能会面临一些浏览器显示不一致的问题，甚至可能面临一些特定情境下的不一致，以致于代码不能通过 `W3C` 标准的验证

### 3 什么是Bootstrap网格系统

> `Bootstrap` 包含了一个响应式的、移动设备优先的、不固定的网格系统，可以随着设备或视口大小的增加而适当地扩展到 `12` 列。它包含了用于简单的布局选项的预定义类，也包含了用于生成更多语义布局的功能强大的混合类

- 响应式网格系统随着屏幕或视口（`viewport`）尺寸的增加，系统会自动分为最多`12`列。

### 4 Bootstrap 网格系统（Grid System）的工作原理


- （1）行必须放置在 `.container class` 内，以便获得适当的对齐（`alignment`）和内边距（`padding`）。
- （2）使用行来创建列的水平组。
- （3）内容应该放置在列内，且唯有列可以是行的直接子元素。
- （4）预定义的网格类，比如 `.row` 和 `.col-xs-4`，可用于快速创建网格布局。`LESS` 混合类可用于更多语义布局。
- （5）列通过内边距（`padding`）来创建列内容之间的间隙。该内边距是通过 `.rows` 上的外边距（`margin`）取负，表示第一列和最后一列的行偏移。
- （6）网格系统是通过指定您想要横跨的十二个可用的列来创建的。例如，要创建三个相等的列，则使用三个 `.col-xs-4`

### 5 对于各类尺寸的设备，Bootstrap设置的class前缀分别是什么

- 超小设备手机（`<768px`）：`.col-xs-*`
- 小型设备平板电脑（`>=768px`）：`.col-sm-*`
- 中型设备台式电脑（`>=992px`）：`.col-md-*`
- 大型设备台式电脑（`>=1200px`）：`.col-lg-*`

### 6 Bootstrap 网格系统列与列之间的间隙宽度是多少


> 间隙宽度为`30px`（一个列的每边分别是`15px`）

### 7 如果需要在一个标题的旁边创建副标题，可以怎样操作

> 在元素两旁添加`<small>`，或者添加`.small`的`class`

### 8 用Bootstrap，如何设置文字的对齐方式？

- `class="text-center"` 设置居中文本
- `class="text-right"` 设置向右对齐文本
- `class="text-left"` 设置向左对齐文本

### 9 Bootstrap如何设置响应式表格？

> 增加`class="table-responsive"`

### 10 使用Bootstrap创建垂直表单的基本步骤？


- （1）向父`<form>`元素添加`role="form"`；

- （2）把标签和控件放在一个带有`class="form-group"`的`<div>`中，这是获取最佳间距所必需的；

- （3）向所有的文本元素`<input>`、`<textarea>`、`<select>`添加`class="form-control"`

### 11 使用Bootstrap创建水平表单的基本步骤？

- （1）向父`<form>`元素添加`class="form-horizontal"`；

- （2）把标签和控件放在一个带有`class="form-group"`的`<div>`中；

- （3）向标签添加`class="control-label"`。

### 12 使用Bootstrap如何创建表单控件的帮助文本？

> 增加`class="help-block"`的`span`标签或`p`标签。

### 13 使用Bootstrap激活或禁用按钮要如何操作？

- 激活按钮：给按钮增加`.active`的`class`
- 禁用按钮：给按钮增加`disabled="disabled"`的属性

### 14 Bootstrap有哪些关于<img>的class？

- （1）`.img-rounded` 为图片添加圆角
- （2）`.img-circle` 将图片变为圆形
- （3）`.img-thumbnail` 缩略图功能
- （4）`.img-responsive` 图片响应式 (将很好地扩展到父元素)

### 15 Bootstrap中有关元素浮动及清除浮动的class？

- （1）`class="pull-left"` 元素浮动到左边

- （2）`class="pull-right"` 元素浮动到右边

- （3）`class="clearfix"` 清除浮动

### 16 除了屏幕阅读器外，其他设备上隐藏元素的class？

> `class="sr-only"``

### 17 Bootstrap如何制作下拉菜单？

- （1）将下拉菜单包裹在`class="dropdown"`的`<div>`中；
- （2）在触发下拉菜单的按钮中添加：`class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown"`
- （3）在包裹下拉菜单的ul中添加：`class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"`
- （4）在下拉菜单的列表项中添加：`role="presentation"`。其中，下拉菜单的标题要添加`class="dropdown-header"`，选项部分要添加`tabindex="-1"`。

### 18 Bootstrap如何制作按钮组？以及水平按钮组和垂直按钮组的优先级？

- （1）用`class="btn-group"`的`<div>`去包裹按钮组；`class="btn-group-vertical"`可设置垂直按钮组。
- （2）`btn-group`的优先级高于`btn-group-vertical`的优先级。

### 19 Bootstrap如何设置按钮的下拉菜单？

> 在一个 `.btn-group` 中放置按钮和下拉菜单即可。

### 20 Bootstrap中的输入框组如何制作？

- （1）把前缀或者后缀元素放在一个带有`class="input-group"`中的`<div>`中
- （2）在该`<div>`内，在`class="input-group-addon"`的`<span>`里面放置额外的内容；
- （3）把`<span>`放在`<input>`元素的前面或后面。

### 21 Bootstrap中的导航都有哪些？

- （1）导航元素：有`class="nav nav-tabs"`的标签页导航，还有`class="nav nav-pills"`的胶囊式标签页导航；
- （2）导航栏：`class="navbar navbar-default" role="navigation"`；
- （3）面包屑导航：`class="breadcrumb"`

### 22 Bootstrap中设置分页的class？

- 默认的分页：`class="pagination"`
- 默认的翻页：`class="pager"`

### 23 Bootstrap中显示标签的class？

> `class="label"`

### 24 Bootstrap中如何制作徽章？

> `<span class="badge">26</span>`

### 25 Bootstrap中超大屏幕的作用是什么？

> 设置`class="jumbotron"`可以制作超大屏幕，该组件可以增加标题的大小并增加更多的外边距


## 综合

### 1 谈谈你对重构的理解

- 网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变UI的情况下，对网站进行优化， 在扩展的同时保持一致的UI
- 对于传统的网站来说重构通常是：
  - 表格(`table`)布局改为`DIV+CSS`
  - 使网站前端兼容于现代浏览器(针对于不合规范的`CSS`、如对IE6有效的)
  - 对于移动平台的优化
  - 针对于`SEO`进行优化

### 2 什么样的前端代码是好的

- 高复用低耦合，这样文件小，好维护，而且好扩展。
- 具有可用性、健壮性、可靠性、宽容性等特点
- 遵循设计模式的六大原则

### 3 对前端工程师这个职位是怎么样理解的？它的前景会怎么样

- 前端是最贴近用户的程序员，比后端、数据库、产品经理、运营、安全都近
  - 实现界面交互
  - 提升用户体验
  - 基于NodeJS，可跨平台开发
- 前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好，
- 与团队成员，`UI`设计，产品经理的沟通；
- 做好的页面结构，页面重构和用户体验；

### 4 你觉得前端工程的价值体现在哪

- 为简化用户使用提供技术支持（交互部分）
- 为多个浏览器兼容性提供支持
- 为提高用户浏览速度（浏览器性能）提供支持
- 为跨平台或者其他基于webkit或其他渲染引擎的应用提供支持
- 为展示数据提供支持（数据接口）


### 5 平时如何管理你的项目

- 先期团队必须确定好全局样式（`globe.css`），编码模式(`utf-8`) 等；
- 编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；
- 标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；
- 页面进行标注（例如 页面 模块 开始和结束）；
- `CSS`跟`HTML` 分文件夹并行存放，命名都得统一（例如`style.css`）；
- `JS` 分文件夹存放 命名以该`JS`功能为准的英文翻译。
- 图片采用整合的 `images.png png8` 格式文件使用 - 尽量整合在一起使用方便将来的管理

### 6 组件封装

> 目的：为了重用，提高开发效率和代码质量 注意：低耦合，单一职责，可复用性，可维护性 常用操作

- 分析布局
- 初步开发
- 化繁为简
- 组件抽象

<right-blok></right-blok>