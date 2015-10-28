"use strict";

if (!process.env.CLIENT_ID) {
  var keys = require('../keys.js');
  var dbUser = keys.clearDB_username;
  var dbPassword = keys.clearDB_password;
  var dbAddress = keys.clearDB_address;
  var dbHost = keys.clearDB_hostName;
  var dbName = keys.clearDB_name;
  } else {
  var dbUser = process.env.CLEARDB_USERNAME;
  var dbPassword = process.env.CLEARDB_PASSWORD;
  var dbAddress = process.env.CLEARDB_ADDRESS;
  var dbHost = process.env.CLEARDB_HOSTNAME;
  var dbName = process.env.CLEARDB_NAME;
  }

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 500,
    min: 1,
    idle: 50000
  }
});
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
