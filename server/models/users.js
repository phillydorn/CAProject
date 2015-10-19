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
var Team = require('./teams');
var League = require('./leagues');

module.exports = function() {
  var User = sequelize.define('User', {
    username: {type: Sequelize.STRING, unique: true},
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Team);
        User.belongsToMany(models.League, {as: 'Managers', through: 'league_managers'});
      }
    }
  });


  return User;
}


