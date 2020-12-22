'use strict';

const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');
const path = require('path');
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.Node_ENV || 'development';
const config = require('./config.js')[env];
const db = {};
const databases = Object.keys(config.databases);

//add database
for(let i = 0; i < databases.length; ++i){
    let database = databases[i];
    let dbPath = config.databases[database];
    db[database] = new Sequelize( dbPath.database, dbPath,username, dbPath.password, dbPath);
}

//add models from database1
fs
    .readdirSync(__dirname + '/database1')
    .filter(file => 
        (file.indexOf('.') !== 0 ) && 
        (file !== basename) && 
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = db.Database1.import(path.join(__dirname + '/database1', file));
        db[model.name] = model;
    });

//add models from database2
fs
    .readdirSync(__dirname + '/database2')
    .filter(file =>
        (file.indexOf('.') !== 0) && 
        (file !== basename) && 
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = db.Database2.import(path.join(__dirname + '/database2', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

module.exports = db;
