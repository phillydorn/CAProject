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
var User = require('./users');

module.exports = function() {
  var League = sequelize.define('League', {
    league_name: Sequelize.STRING
  },{
    classMethods: {
      associate: function(models) {
        League.hasMany(models.Team);
        League.belongsToMany(models.User, {through: 'league_managers'});
      }
    }
  });

  return League;
}

