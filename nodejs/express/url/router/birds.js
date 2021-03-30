const express = require('express');

const router = express.Router();

router.use(function timeLog(req,res, next) {
    console.log('timelog', Date.now());
    next()
})

router.get('/', function (req, res) {
    res.send('root birds');
})

router.get('/about', function (req, res, enext) {
    res.send('about birds');
})

module.exports = router;