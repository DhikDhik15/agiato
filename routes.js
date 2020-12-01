'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    //ALL ABOUT USER

    app.route('/tampil')
        .get(jsonku.tampiluser);
    app.route('/tampilID/:id')
        .get(jsonku.tampiluserID);
    app.route('/tambah')
        .post(jsonku.tambahuser);
    app.route('/ubah')
        .put(jsonku.ubahdatauser);
    app.route('/hapus')
        .delete(jsonku.hapususer);
    app.route('/detuser')
        .get(jsonku.detailuser);
}