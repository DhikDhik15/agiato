const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        var role_user = req.body.role_user;
        //cek autorization
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer) {
            var token = tokenWithBearer.split('')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message: 'Token tidak terdaftar'});
                }else{
                    if(user_role==0){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message: 'Gagal autorisasi'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message: 'Token tidak tersedia'});
        }
    }
}

module.exports = verifikasi;