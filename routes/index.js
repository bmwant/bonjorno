var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = new sqlite3.Database('hlus.db');
  db.all('SELECT * FROM clients', function(err, rows) {
    res.render('index', { clients: rows });
  });
  db.close();
});

router.post('/exec', function(req, res, next) {
  var targetHost = req.body.host;
  var targetPort = req.body.port;
  var targetPayload = req.body.payload;
  console.log(targetHost, targetPort, targetPayload);
});

module.exports = router;
