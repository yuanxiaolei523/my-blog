const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'jade');

app.all('*', (req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
// app.use(express.static(path.join(__dirname, './public')))

app.use('/static', express.static('public')) // 将静态文件挂在到特殊的目录下

app.get('/about/:aboutId', (req, res) => {
    console.log(req.params)
    // console.log(req, res);
    // res.send(JSON.parse(JSON.stringify(req)));
    res.send('加油')
})

app.post('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.render(path.join(__dirname, './view/index.jade'))
})
app.listen('3001', () => {
    console.log('server was started at port 3000')
})
