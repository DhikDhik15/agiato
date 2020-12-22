var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller registrasi guru
exports.regteacher = function(req, res) {
    var post = {
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        password: md5(req.body.password), 
        telephone: req.body.telephone,
        id_province: req.body.id_province,
        id_districts: req.body.id_districts,
        id_city: req.body.id_city,
        address: req.body.address,
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["teacher","email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["teacher"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Insert berhasil", res);
                    }
                });
            }else{
                response.ok("EMAIL SUDAH ADA",res);
            }
        }
    })
}

//Login
exports.logteacher= function(req, res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table =["teacher","password", md5(post.password), "email", post.email];

    query = mysql.format(query,table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    
                    expiresIn: 1440 
                });

                id_teacher = rows[0].id;

                var data = {
                    id_teacher: id_teacher,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["teacher_access_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message:'Token Login',
                            token:token,
                            currUser: data.id_teacher
                        });
                    }
                });
            }else{
                res.json({
                    "Error": true, "Message":"Email atau password salah"
                });
            }
        }
    });
}

exports.halamanverifikasi = function(req, res){
    response.ok("Halaman user UMUM",res);
}