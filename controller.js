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

//GET berdasarkan ID
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

//POST DATA
exports.tambahuser = function(req, res){
    var name = req.body.name;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var email = req.body.dob;

    connection.query('INSERT INTO users (name,gender,dob,email) VALUES (?, ?, ?, ?)',
        [name,gender,dob,email],
        function (error, row, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("berhasil menambahkan data",res)
        }
    });
};