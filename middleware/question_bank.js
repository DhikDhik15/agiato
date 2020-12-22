//var connection = require('../koneksi');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dhika',
    password : 'cliquers150193',
    database : 'agiato_question_bank'
  });
var response = require('../res');
var config = require('../config/secret');

connection.connect();

exports.show_question = function(req, res){
    connection.query('SELECT * FROM question_bank_sd', function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};
connection.end();