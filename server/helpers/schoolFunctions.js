"use strict";

var models = require('../models');
var request = require('request');

if (!process.env.CLIENT_ID) {
  var keys = require('../keys.js');
  var sportRadarKey = keys.sportradarKey;
  } else {
    var sportRadarKey = process.env.CLIENT_ID;
  }

module.exports = {
  fetchAllSchools: function(req, res) {
    request({
      // url: 'http://api.sportradar.us/ncaamb-t3/tournaments/83c03d12-e03b-4f71-846c-5d42ba90eeb1/schedule.json?api_key='+keys.sportradarKey,
      url: 'http://api.sportradar.us/ncaamb-t3/tournaments/83c03d12-e03b-4f71-846c-5d42ba90eeb1/summary.json?api_key='+sportRadarKey
    },
      function(err, resp, body) {
        var brackets = JSON.parse(body).brackets;
        setTimeout(()=>{
          request({
            url: 'http://api.sportradar.us/ncaamb-t3/polls/rpi/2014/rankings.json?api_key='+sportRadarKey
          },
            (err, resp, body) => {
              let RPI_Teams = JSON.parse(body).rankings;
              let allSchools = [];
              brackets.forEach(function(bracket) {
                let bracketSchools = bracket.participants.map((school)=>{
                  return {bracket:bracket.name, school:school }
                });
                allSchools = allSchools.concat(bracketSchools);
              });

              allSchools = allSchools.sort((a,b)=>{
                let aRank, bRank;
                RPI_Teams.forEach((RPI_Team)=>{
                  if (RPI_Team.id === a.school.id) {
                    aRank = RPI_Team.rank;
                  } else if (RPI_Team.id === b.school.id) {
                    bRank = RPI_Team.rank;
                  }
                });
                return aRank-bRank;
              });
              allSchools.forEach(function(allSchool, index){
                models.NCAA_Team.create({
                  sportRadarID:allSchool.school.id,
                  NCAA_Team_name: allSchool.school.name,
                  sportRadarID: allSchool.school.id,
                  seed: allSchool.school.seed,
                  market: allSchool.school.market,
                  bracket: allSchool.bracket,
                  RPI_Ranking: index+1
                })
              });
        });
      },2000)
    });
  }
}