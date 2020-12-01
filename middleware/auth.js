var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const conn = require('../koneksi');

//buat controller untuk registrasi
exports.registrasi = function(req,res) {
    var post = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        role_user: req.body.role_user
    }

    var query = "SELECT email FROM ?? WHERE ??";
    var table = ["users","email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["users"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil tambah user baru", res);
                    }
                });
            }else{
                response.ok("EMAIL SUDAH TERDAFTAR");
            }
        }
    })
}