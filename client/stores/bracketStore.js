import { Reflux, $ } from '../importPackage';
import BracketActions from '../actions/BracketActions';

var BracketStore = Reflux.createStore({
  listenables: [BracketActions],

  arrangeSchools(schools) {
    let playInSchools = [],
        midwestSchools = [],
        eastSchools = [],
        westSchools = [],
        southSchools = [],
        midwest = [],
        east = [],
        west = [],
        south = [],
        order = [1,16,8,9,5,12,4,13,6,11,3,14,7,10,2,15],
        totalSchools = schools;

    schools.forEach(function(school) {
      if (school.bracket === 'Midwest Regional') {
        midwestSchools.push(school);
      } else if (school.bracket === 'East Regional') {
        eastSchools.push(school);
      } else if (school.bracket === 'South Regional') {
        southSchools.push(school);
      } else if (school.bracket === 'West Regional') {
        westSchools.push(school);
      }
    });


    let findPlayIn = (brackets) => {
      return brackets.map((bracket)=>{
        let playInSeeds ={};
        let emptyIndex;

        let result = bracket.map((school, idx)=>{
          if (school.isPlayIn) {
            for (var i=0; i<bracket.length; i++) {
              let school2 = bracket[i];
              if (school.seed == school2.seed && school !== school2) {
                if (!playInSeeds[school.seed]) {
                  playInSeeds[school.seed] = true;
                  let playInBracket = {};
                  playInBracket.bracket = school.bracket;
                  playInBracket.seed = school.seed;
                  playInBracket.schools = [school, school2];
                  playInSchools.push(playInBracket);
                  return [school, school2];
                } else {
                  emptyIndex = idx;
                  return '';
                }
              }
            }
          } else {
            return school;
          }
        });
        result.splice(emptyIndex, 1);
        return result;
      });
    }


    [midwestSchools, southSchools, eastSchools, westSchools] = findPlayIn([midwestSchools, southSchools, eastSchools, westSchools]);


    let sortSchools = (schools) =>{
      return schools.sort((a,b)=>{
        if (a instanceof Array) {
          return a[0].seed-b.seed;
        } else if (b instanceof Array) {
          return a.seed-b[0].seed;
        } else {
          return a.seed-b.seed;
        }
      });
    };
    midwestSchools = sortSchools(midwestSchools);
    eastSchools = sortSchools(eastSchools);
    southSchools = sortSchools(southSchools);
    westSchools = sortSchools(westSchools);

    if (southSchools.length) {
      order.forEach((seed, index)=>{
        midwest.push(midwestSchools[seed-1]);
        south.push(southSchools[seed-1]);
        east.push(eastSchools[seed-1]);
        west.push(westSchools[seed-1]);
      });
      this.trigger({midwest, east, south, west, playInSchools, totalSchools})
    }

  },

  onFillBracket () {
      $.ajax ({
        method: 'GET',
        url: '/api/schools/bracket',
        success:  (data)=>{
          this.arrangeSchools(data);
      }
    });
  }


});

export default BracketStore;