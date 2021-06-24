## 一、有做过前端加载优化相关的工作吗？都做过哪些努力

### 做性能优化的目的是什么？

因为我们一些比较重要的，比较多的需求都是集中在春运期间的，所以当时的代码一般都是不会太去要求代码质量的，所以一般都是会在其他时间做优化

1. 首屏时间
2. 首次可交互时间
3. 首次有意义内容渲染时间：比如百度的搜索功能，很重要

页面性能检测：https://developers.google.com/speed/pagespeed/insights/?url=www.qunar.com

pollyfill： https://polyfill.io/v3/url-builder

### 解决方法

1. 只请求当前需要的资源
   异步加载、懒加载、polyfill

2. 缩减资源体积
   打包压缩 webpack4 中内置了
   gzip 压缩(默认开启)
   nginx 使用`gzip: on`
   nodejs 使用`compression`插件
   图片格式的优化(是否真的需要 1080 的分辨率)、压缩、根据屏幕分辨率展示不同分辨率的图片、webp
   https://tinypng.com/ 压缩 png 图片(压缩 80%)
   尽量控制 cookie 大小：因为每次都会携带cookie(同域名的请求)
3. 时序优化
   js promise.all
   ssr(可以做缓存、有利于 seo)
   prefetch、prerender、preload
       <link rek="des-prefetch" href="xxx.com"> // 如果没有这一行，会在第一个请求的时候才回去解析dns
       加了这一行之后会再解析到这一行就去进行 dns 的预解析
       <link rek="preconnect" href="xxx1.com"> //和 prefetch 差不多
       <link rek="preload" as="image" href="xxx1.com/p.png"> //加载优先级比较高的图片可以优先加载

4. 合理的利用缓存
   cdn cdn 预热 cdn 刷新
   cdn 预热：cdn 厂家不通过用户的访问将源站的内容分发到全国各地的 cdn 节点上
   cdn 刷新：强制回源，即当你的内容有更新了，可以从源站上拉取新内容

cdn 的域名一般和业务的域名不相同，这是因为浏览器的同源策略，对于同源同域的请求才会携带 cookie，而对于不同源的请求不会携带 cookie 的

如果一段 js 执行时间特别长，怎么去分析
通过装饰器去实现

5. 阿里云的 oss 支持通过链接后面拼参数来做图片的格式转换，尝试写一下，把任何图片格式转换为 webp，需要注意什么？

    1. 是否所有的浏览器都支持 webp
    2. 还得查看图片是否在oss上

6. 如果你的页面上有巨量的图片需要展示，除了懒加载的方式，有没有其他方式限制一下同时加载的图片数量
   代码题：实现 promise 的并发控制

## 二、平时有关注过前端的内存处理吗？

1. 内存的生命周期
   内存分配：当我们在声明变量、函数、对象的时候，js 会自动分配内存
   内存使用：调用函数或者使用变量的时候
   内存回收：当你不用的时候

2. js 中的垃圾回收机制
   当你的内存使用完之后，系统通过垃圾回收算法检测到你没有使用这快内存得时候，就会将内存回收

    1. 引用计数法
       a 对象对 b 对象有访问权限，那么称为 a 引用 b 对象，如果没有任何对象去访问他了，此时就表明它该被回收了

        循环引用：a 引用 b、b 同时引用 a，此时不会被回收

    2. 标记清除法
       如果从 js 根部扫描，如果不可达到某个对象，说明这个对象应该会被回收了
       算法过程
        1. 在运行的时候给存储在内存的所有变量加上标记
        2. 从根部出发，能触及的对象，把标记清除
        3. 哪些有标记的就被视为将要删除的变量

3. js 中有哪些常见的内存泄漏

    1. 全局变量
       window.a = 'xxx' 不使用后 --> window.a = null;
    2. 未被清除的定时器和回调

        ```js
        // 优化前， 此时定时器会在内存中存储;
        setTimeout(() => {
        	console.log(1000);
        }, 1000);
        // 优化后
        let t = setTimeout(() => {
        	console.log(1000);
        }, 1000);
        clearTimeout(t);
        ```

    3. 闭包
    4. dom 的引用

    ```js
        const ele = {
            image: document.getElementById('image');
        }

        document.body.removeChild(document.getElementById('image'));
    ```

    上述代码还是会内存泄漏，此时 ele 对象中的 image 属性还是在使用 image 元素的，除非 ele 的 image 属性被内存回收掉了

4. 如何避免内存泄漏
    1. 减少不必要的全局变量
    2. 使用完数据后及时解除引用

### 实现 sizeOf 函数，传入一个参数 object，计算这个 object 占用了多少字节

基本类型
boolean: 4 个字节
number: 8 个字节
str: 一个字符占 2 个字节

注意事项：

1. 在计算对象所占的内存大小时，需要将 key 也算上，除此之外，在计算 value 的时候，要考虑到是否会有相同的对象指向 value，如果有的话，此对象不参与计算

## 三、来聊一下前端的 HTTP 请求

1. 平时怎么解决跨域问题的
    1. jsonp
    2. cors
    3. node 正向代理 有一个请求/api,可以将其转接到同域的 node 服务，然后去请求原有的 api，然后返回给前端
    4. nginx 反向代理 proxy_pass, 将一个你请求的路径转发到另外的一个地址上， /api -> /same/api
    5. img 标签是不跨域的

2.有做过全局的请求处理吗，比如统一处理登录态，统一处理全局错误
axios
interceptor request response 拦截

3. 代码题，能给 xhr 添加 hook，实现在各个阶段打印日志吗？

## EventBus
