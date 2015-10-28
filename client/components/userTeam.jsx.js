var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var UserTeamActions=  require('../actions/UserTeamActions');
var userTeamStore =  require('../stores/userTeamStore');

var UserTeam = React.createClass({

    mixins: [Reflux.connect(userTeamStore, "userSchoolList")],


 getInitialState: function() {
    list = [];
    for (var i=0; i<10; i++) {
      list.push('');
    }
    return {userSchoolList: list};
  },

  componentWillReceiveProps: function (){
    setTimeout(function() {
      console.log('mount props', this.props)
      UserTeamActions.loadSchools(this.props.teamId);
    }.bind(this), 500)
  },

  render: function() {
    console.log('userprops', this.props)
    var schoolNodes = this.state.userSchoolList.map(function (school) {
      return (
          <UserSchool schoolName = {school.market} schoolId={school.id} key={school.id} />
        )
    });
    return (
      <div className = "team-box userTeam">
      <h1>Your Team</h1>
        <ul className="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});


module.exports = UserTeam;

