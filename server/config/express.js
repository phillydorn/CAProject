var express = require('express'),
    bodyParser = require ('body-parser'),
    app = express(),
    path = require('path'),

    http    = require( 'http' );



  if (!process.env.CLIENT_ID) {
    var keys = require('../keys.js');
    }


    module.exports = function(app) {
    app.use(express.static('./client'));

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());


    }