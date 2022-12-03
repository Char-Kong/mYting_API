var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/t', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));

  // res.render('index', { title: 'Express' }); // 기존 파일
});

module.exports = router;