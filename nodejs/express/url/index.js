const express = require('express');

const app = express();

app.get('/', (req, res) => {
    // console.log(req, res);
    res.send('hello world')
})
app.listen('3000', () => {
    console.log('server was started at port 3000')
})