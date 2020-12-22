const { response } = require('express');
const passport = require('passport');
var express = require('express');
var auth = require('./auth');
var teacher = require('./teacher');
var question = require('./question_bank');
var router = express.Router();
var verifikasi = require('./verifikasi');
var userProfile;

//menu registrasi dan login user
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//menu registrasi dan login guru
router.post('/api/v1/regteacher', teacher.regteacher);
router.post('/api/v1/logteacher', teacher.logteacher);


//autorisasi
router.get('/api/v1/autorisasi', verifikasi(), auth.halamanverifikasi);

//Get soal
router.get('/api/v1/getSoal', question.show_question);


module.exports = router;