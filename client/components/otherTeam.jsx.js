var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var otherTeamStore = require('../stores/otherTeamStore');
var OtherTeamActions = require('../actions/OtherTeamActions');

var OtherTeam = React.createClass({

  mixins: [Reflux.connect(otherTeamStore, 'otherTeamSchools')],

  getInitialState: function() {
    return {otherSchoolList: ['','','','','','','','','','']}
  },


  componentDidUpdate: function() {
    OtherTeamActions.loadSchools(this.props.owner);
  },


  render: function() {
      var schoolNodes = this.state.otherSchoolList.map(function (school) {
        return (
            <UserSchool schoolName = {school.name} schoolId={school.id} key={school.id} />
          )
      });
      return (
          <ul className="team-list">
           {schoolNodes}
          </ul>
      )
    }
  });


module.exports = OtherTeam;