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
        // var results = [];
        setTimeout(()=>{
          request({
            url: 'http://api.sportradar.us/ncaamb-t3/polls/rpi/2014/rankings.json?api_key='+sportRadarKey
          },
            (err, resp, body) => {
              let RPI_Teams = JSON.parse(body).rankings;
              brackets.forEach(function(bracket) {
                bracket.participants.forEach(function(school){
                  let rank;
                  RPI_Teams.forEach((RPI_Team)=>{
                    if (school.id === RPI_Team.id) {
                      rank = RPI_Team.rank;
                    }
                  });

                  models.NCAA_Team.sync().then(function() {
                    models.NCAA_Team.findOrCreate({
                      where: {
                        sportRadarID:school.id
                      },
                      defaults: {
                        NCAA_Team_name: school.name,
                        sportRadarID: school.id,
                        seed: school.seed,
                        market: school.market,
                        bracket: bracket.name,
                        RPI_Ranking: rank
                      }
                    })
                  });
                });
              });
            });
        },2000)
            // results.push({
            //       name: school.name,
            //       id: school.id,
            //       seed: school.seed,
            //       market: school.market,
            //       bracket: bracket.name
        // res.status(200).send(results);
    });
  }
}