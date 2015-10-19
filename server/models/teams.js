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

var League = require('./leagues');
var User = require('./users');
var NCAA_Team = require('./NCAA_Teams');

module.exports = function() {
  var Team = sequelize.define('Team', {
    team_name: Sequelize.STRING,
    wins: Sequelize.INTEGER,

  },
  {
    classMethods: {
      associate: function(models) {
        Team.belongsTo(models.League);
        Team.belongsTo(models.User);
        Team.belongsToMany(models.NCAA_Team, {through: 'Team-NCAA'});
      }
    }
  });
  return Team;

}


