"use strict";



module.exports = function(sequelize, DataTypes) {
  var NCAA_Team = sequelize.define('NCAA_Team', {
    NCAA_Team_name: DataTypes.STRING,
    wins: {type: DataTypes.INTEGER, defaultValue: 0},
    market: DataTypes.STRING,
    sportRadarID: DataTypes.STRING,
    bracket: DataTypes.STRING,
    seed: DataTypes.INTEGER,

  }, {
    classMethods: {
      associate: function(models) {
        NCAA_Team.belongsToMany(models.Team, {through: 'Team-NCAA'});
      }
    }
  });


  return NCAA_Team;
}

