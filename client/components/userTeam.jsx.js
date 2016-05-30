var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var UserTeamActions=  require('../actions/UserTeamActions');
var userTeamStore =  require('../stores/userTeamStore');

var UserTeam = React.createClass({

    mixins: [Reflux.connect(userTeamStore, "userSchoolList")],


 getInitialState: function() {
    let list = [];
    for (var i=0; i<10; i++) {
      list.push({Team_NCAA: {round: 0}});
    }
    return {userSchoolList: list};
  },

  componentWillReceiveProps: function (){
    setTimeout(()=> {
      UserTeamActions.loadSchools(this.props.teamId);
    }, 500)
  },

  render: function() {
    var schoolNodes = this.state.userSchoolList.sort((a,b)=>{
      return a.Team_NCAA.round - b.Team_NCAA.round;
    }).map(function (school, order) {
      return (
          <UserSchool order={order+1} schoolName = {school.market} schoolId={school.id} key={school.id} />
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

