'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

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
    var email = req.body.email;

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

//PUT DATA
exports.ubahdatauser = function (req, res){
    var name = req.body.name;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var email = req.body.email;
    var id = req.body.id;

    connection.query('UPDATE users SET name=?, gender=?, dob=?, email=? WHERE id = ?', 
    [name,gender,dob,email,id],
            function(error, rows, fields){
                if(error){
                    console.log(error);
                }else{
                    response.ok("berhasil ubah data",res)
                }
    });
}

//DELETE DATA
exports.hapususer = function (req, res) {
    var id = req.body.id;

    connection.query('DELETE FROM users WHERE id=?',
    [id],
    function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("berhasil hapus data",res)
        }
    });
    
}