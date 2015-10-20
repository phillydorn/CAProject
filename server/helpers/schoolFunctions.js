var School = require('../models/NCAA_Teams');
var request = require('request');

if (!process.env.CLIENT_ID) {
  var keys = require('../keys.js');
  }

module.exports = {
  fetchAllSchools: function(req, res) {
    request({
      // url: 'http://api.sportradar.us/ncaamb-t3/tournaments/83c03d12-e03b-4f71-846c-5d42ba90eeb1/schedule.json?api_key='+keys.sportradarKey,
      url: 'http://api.sportradar.us/ncaamb-t3/tournaments/83c03d12-e03b-4f71-846c-5d42ba90eeb1/summary.json?api_key='+keys.sportradarKey,
    },
      function(err, resp, body) {
        var brackets = JSON.parse(body).brackets;
        var results = [];
        brackets.forEach(function(bracket) {
          bracket.participants.forEach(function(school){
            School().sync().then(function() {
              School().findOrCreate({
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
        res.status(200).send(results);
      });
  }


}