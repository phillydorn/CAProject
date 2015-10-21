var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require ('body-parser'),
    app = express(),
    path = require('path'),
    session = require('express-session'),
    passport = require('passport'),
    http    = require( 'http' );



  if (!process.env.CLIENT_ID) {
    var keys = require('../keys.js');
    }


    module.exports = function(app) {
    app.use(express.static('./client'));

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
      secret: 'mySecret'
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    }