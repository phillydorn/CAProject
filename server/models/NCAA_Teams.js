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

module.exports = function() {
  var NCAA_Team = sequelize.define('NCAA_Team', {
    NCAA_Team_name: Sequelize.STRING,
    wins: {type: Sequelize.INTEGER, defaultValue: 0},
    market: Sequelize.STRING,
    sportRadarID: Sequelize.STRING,
    bracket: Sequelize.STRING,
    seed: Sequelize.INTEGER,

  }, {
    classMethods: {
      associate: function(models) {
        NCAA_Team.belongsToMany(models.Team, {through: 'Team-NCAA'});
      }
    }
  });


  return NCAA_Team;
}

