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
      url: 'http://api.sportradar.us/ncaamb-t3/tournaments/83c03d12-e03b-4f71-846c-5d42ba90eeb1/summary.json?api_key='+sportRadarKey,
    },
      function(err, resp, body) {
        var brackets = JSON.parse(body).brackets;
        var results = [];
        brackets.forEach(function(bracket) {
          bracket.participants.forEach(function(school){
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
                  bracket: bracket.name
                }
              });
            });
            results.push({
                  name: school.name,
                  id: school.id,
                  seed: school.seed,
                  market: school.market,
                  bracket: bracket.name
            })
          });
        });
        // res.status(200).send(results);
      });
  }


}