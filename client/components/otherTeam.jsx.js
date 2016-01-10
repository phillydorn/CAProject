var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');
var otherTeamStore =  require('../stores/otherTeamStore');

var OtherTeam = React.createClass({

    mixins: [Reflux.connect(otherTeamStore, "otherSchoolList")],


 getInitialState: function() {
    let list = [];
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
    var schoolNodes = this.state.otherSchoolList.map(function (school, order) {
      return (
          <UserSchool order={order+1} schoolName = {school.market} schoolId={school.id} key={school.id} />
        )
    });
    return (
      <div className = "team-box otherTeam" key="otherTeamBox">
      <h1 key="teamName">{this.props.teamName}</h1>
        <ul className="team-list" key="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});


module.exports = OtherTeam;

