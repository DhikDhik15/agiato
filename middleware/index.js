const { response } = require('express');
const passport = require('passport');
var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');
var userProfile;

//mendaftarkan menu registrasi dan login
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//autorisasi
router.get('/api/v1/autorisasi', verifikasi(), auth.halamanverifikasi);


module.exports = router;