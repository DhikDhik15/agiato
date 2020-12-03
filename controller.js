'use strict';

var response = require('./res');
//var response = require('./autorisasi');
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

//MENAMPILKAN DETAIL USER
exports.detailuser = function(req, res) {

connection.query('\SELECT agiato_users.users.name,\
                    agiato_users.users.gender,\
                    agiato_users.users.dob,\
                    agiato_academic.class_study.class,\
                    agiato_academic.school.name_school,\
                    agiato_academic.level_study.level ,\
                    agiato_users.users.back_education\
                    FROM\
                    agiato_users.users\
                    LEFT JOIN agiato_academic.class_study ON agiato_users.users.id_class = agiato_academic.class_study.id\
                    LEFT JOIN agiato_academic.school ON agiato_users.users.id_school = agiato_academic.school.id\
                    LEFT JOIN agiato_academic.level_study ON agiato_academic.school.id_level_study = agiato_academic.level_study.id \
                    GROUP BY\
                    agiato_users.users.id',
//connection.query('select * from users',
function(error, rows){   
        if(error){ 
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
    
}
