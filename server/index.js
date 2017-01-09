'use strict';

var decrypter = require('./decrypter.js');
var express = require('express');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var app = express();
var cors = require('cors')
var decoded_text = [];

app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'admin',
   database: 'caesar_cipher'
});

connection.connect();

app.get('/decode/all', function(req, res) {
   connection.query('SELECT * FROM decoded_text', function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
      console.log('sent:', rows);
      // console.log('sent:', fields);
   });
});

app.post('/decode', function(req, res) {
   console.log(req.body);
   var decrypted = decrypter(req.body.text, req.body.shift)
   console.log('server', decrypted);

   connection.query({
		sql: 'INSERT INTO decoded_text(text_lines) VALUES(?)',
		values: [decrypted]
	}, function(err, rows, fields) {
		if (err) throw err;
  // 		res.send(rows);
      console.log('sent:', rows);
	});
});

app.listen(3000, function () {
   console.log('SERVER IS UP AND RUNNING on port: 3000');
});

module.exports = app;
