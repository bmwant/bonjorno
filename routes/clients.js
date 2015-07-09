var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.ip);
    console.log(req.body);
    var data = console.log(decrypt(req.body));
    /*
    var ip = req.body.ip;
    var id = req.body.id;
    var port = req.body.port;
    console.log(ip, port, id);

    var db = new sqlite3.Database('hlus.db');

    db.serialize(function() {
        try {
            db.run('CREATE TABLE IF NOT EXISTS clients (id TEXT, ip TEXT, port TEXT)');
            var stmt = db.prepare('INSERT INTO clients VALUES (?, ?, ?)');
            stmt.run(id, ip, port);
            stmt.finalize();
        } catch (err) {
            res.status(500).send(err);
        }

        db.each('SELECT * FROM clients', function(err, row) {
            console.log(row.info);
        });
    });

    db.close();*/
    res.send('decryption ok');
});

var crypto = require('crypto'),
    algorithm = 'aes-128-cbc',
    password = 'fgafafafafsdafsd',
// do not use a global iv for production,
// generate a new one for each encryption
    iv = 'asdfhjklasdfhjkl';

function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, password, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    //var tag = cipher.getAuthTag();
    return {
        content: encrypted
    };
}

function decrypt(encrypted) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

/*

*/
module.exports = router;
