"use strict";

module.exports = function(sequelize, DataTypes) {
  var League = sequelize.define('League', {
    name: DataTypes.STRING
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

