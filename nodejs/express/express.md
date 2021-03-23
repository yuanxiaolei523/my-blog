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
这个app在300端口起了一个服务，然后当你访问localhost://3000的时候，会返回到页面上hello world,如果访问其他的路由，则会返回404
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