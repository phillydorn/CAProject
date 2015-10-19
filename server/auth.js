var bcrypt = require('bcrypt');
var User = require('./models/users');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('bracketDraft', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = function(app) {

  app.post('/api/auth/signup', function (req, res) {
    var newUser = {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      username : req.body.username
    }

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        newUser.password = hash;
        User().sync().then(function() {
          User().create({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
            username: newUser.username
          }).then(function(user){
            console.log('user created for ', user.username)
            res.status(200).json(req.body);
          });
        });
      });
    });

  });

  app.post('/api/auth/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User().find({
      where: {
        username:username
      }
    }).then(function(found) {
      var hash = found.password;
      bcrypt.compare(password, hash, function(err, resp) {
        if (resp) {
          console.log('success')
          res.status(200).send({response:'success'})
        } else {
          console.log('failure')
          res.sendStatus(401);
        }
      })
    });
  });
};