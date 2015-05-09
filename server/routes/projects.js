var express = require('express');
var router = express.Router();

/* GET projects listing. */
router.get('/', function(req, res, next) {
  res.send({ payload: [
    { id: 1, name: 'Hello World', images: [], cover: '' }
  ]});
});

module.exports = router;
