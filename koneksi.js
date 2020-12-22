var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'13.212.202.70',
    user:'agiato',
    password:'@Merapi0274',
    database:'agiato_users'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('terkoneksi');
});

module.exports = conn;