var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'dhika',
    password:'cliquers150193',
    database:'agiato_users'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('terkoneksi');
});

module.exports = conn;