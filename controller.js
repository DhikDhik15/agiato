'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi REST API berjalan",res)
};

//menampilkan data
exports.tampiluser = function(req, res){
    connection.query('SELECT * FROM users', function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan berdasarkan ID
exports.tampiluserID = function(req,res){
    let id = req.params.id;
    //console.log(id);
    connection.query('SELECT * FROM users WHERE id = ?',[id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
}