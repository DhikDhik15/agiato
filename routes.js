'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampiluser);

    app.route('/tampilID/:id')
        .get(jsonku.tampiluserID);

    app.route('/tambah')
        .post(jsonku.tambahuser);

}