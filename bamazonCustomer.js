var fs = require('fs');
var db = require('./database');
var table = require('easy-table');

var database = db();

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });