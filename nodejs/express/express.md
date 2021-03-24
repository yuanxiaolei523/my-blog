# Express
## Hello World
```js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    // console.log(req, res);
    res.send('hello world')
})
app.listen('3000', () => {
    console.log('server was started at port 3000')
})
```
app是一个express实例,这个app在3000端口起了一个服务，然后当你访问localhost://3000的时候，会返回到页面上hello world,如果访问其他的路由，则会返回404
## express-generator
我们可以通过expreses-generator去快速的创建一个express应用的骨架
你可以通过npx或者npm的方式去进行安装
```
npx express-generator
// 或者
npm install -g express-generator
express my-app
``` 
执行完上述操作之后，然后执行安装依赖操作
```
cd my-app
npm i 
```
如果是mac，执行以下命令
```
DEBUG=myapp:* npm start
```
## Basic routing
1. 路由的定义
路由指的是确定应用程序如何相应客户端的特定路径的请求，这个特定的路径是指URL或者https的请求方法

每个路由都有一个或者多个handler函数，当路由匹配的时候会被执行

2. 定义路由的结构
```js
app.METHOD(PATH, HANDLER)
```
详解
- app：express的实例
- METHOD：是http的请求
- PATH：是请求的路径
- HANDLER：是PATH匹配是调用的处理函数，我们可以通过指定多个handler，但是要注意需要在每个handler内加next()才能执行下一个handler

## 在Express中访问静态文件
要提供一些像image、js、css等这样的静态文件，请使用express内置的中间件函数express.static()
1. 格式

```
express.static(root, [options])

```
参数
- root: 表明了从哪个目录下读取资源文件
- options: 待定

2. 如果想引入多个文件中的静态文件怎么办
多次调用express.static即可

```js
app.use(express.static('public'))
app.use(express.static('files'))
```
```html
<!--jade-->
link(rel="stylesheet", href="/stylesheets/style.css")
```
3. 我们想将静态资源挂在到某个路径下怎么办
```js
app.use('/static', express.static('public'));
```
```html
<!--jade-->
link(rel="stylesheet", href="/static/stylesheets/style.css")
```

4. 我们页面中用的都是相对路径的形式

注意：我们在express.static中使用的是相对路径的形式，他能正常找到资源是因为我们启动服务是在当前路径下启动的，如果我们在其他路径下启动文件，
   那么这个时候就不能正常访问到静态资源文件了，所以我们推荐使用绝对路径的形式，通过path.join()

## API
### 1. app.all
可以对所有的http请求做拦截，要求就是要放在其他请求的前面，比如你可以在这个api中处理cors跨域问题

### 2.app.use
最主要的功能是使用一个中间件

### response Methods
主要列举了res Object的一些方法
#### res.download(path[, filename, options, fn])
以附件的形式传输path路径上的文件，事实上，浏览器也会提醒用户去下载文件，通常情况下content-disposition头filename参数的值是path
我们可以通过给定第二个参数filename来重写filename的value，

该方法使用res.sendFile()方法来传输文件

参数
- path: 文件存储的文职
- filename: 文件名称
- options: 是给res.sendFile()使用的，故需要参考res.sendFile函数的options
- fn: 当文件传输失败或者传输完成时执行的回调
```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
```
#### res.end([data, encoding])
用于在没有任何数据的情况下快速结束响应，如果需要响应data，可以使用res.send()或者res.join()

#### res.format(object)
当请求对象的accept http头存在时，对其执行内容协商

## route
### Route params
路由参数被命名为url 片段，他们一般被用来捕获在url里特定的值，被捕获的值会被存储到req.params中
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```
由于连字符(-)和点(.)是按字面解释的，因此它们可以与路由参数一起使用，以达到有用的目的。
```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```
同时我们也可以通过正则的方式来匹配params
```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

### router handlers
我们可以通过给app.METHOD中传递handler来决定当路由匹配时，我们需要做什么
```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```
当有多个handler时，我们有两种方式解决，一种是通过多个handler参数来解决
```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```
第二种是通过一个数组的形式来解决
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
var cb2 = function (req, res) {
  res.send('Hello from C!')
}
app.get('/example/c', [cb0, cb1, cb2])
```
当然还可以两者结合使用
> 注意：当有多个handler时，一定记得在前面的handler内加next否则后续的不会走到

## 记一次通过express返回给页面一个html文件趟过的坑

首先页面路径如图所示
我们在index.js中使用了express启动了一个服务，然后定义了get函数，只有get函数的路径为/时，
我们才会在页面进行返回(当然我这里没有做兼容处理，最好是要有一个404页面)
```js
// index.js
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.render(path.join(__dirname, './view/index.jade'))
})
app.listen('3001', () => {
    console.log('server was started at port 3000')
})
```
返回的html页面为
```jade
// 引入css
link(rel ='stylesheet', href ='/stylesheets/style.css')
div hello world
```
此时我们调用node index.js之后，发现有问题了，css引入的问题，如果我们想要访问静态资源，我们需要使用nodejs的express.static中间件
app.use(express.static(path.join(__dirname, './public')))来指定一个静态资源目录，然后在jade内引用的时候，直接是/stylesheets/style.css即可

## nodejs中通过cors解决跨域问题
```js
app.all('*', (req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
```