var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');
var otherTeamStore =  require('../stores/otherTeamStore');

var OtherTeam = React.createClass({

    mixins: [Reflux.connect(otherTeamStore, "otherSchoolList")],


 getInitialState: function() {
    list = [];
    for (var i=0; i<10; i++) {
      list.push('');
    }
    return {otherSchoolList: list};
  },

  componentWillReceiveProps: function (){
    setTimeout(function() {
      OtherTeamActions.loadSchools(this.props.teamId || 0);
    }.bind(this), 500)
  },

  render: function() {
    var schoolNodes = this.state.otherSchoolList.map(function (school) {
      return (
          <UserSchool schoolName = {school.market} schoolId={school.id} key={school.id} />
        )
    });
    return (
      <div className = "team-box otherTeam">
      <h1>Other Team</h1>
        <ul className="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});


module.exports = OtherTeam;

