var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');
var UserTeam = require('./userTeam.jsx.js');
var OtherTeam = require('./otherTeams.jsx.js');
var Bracket = require('./bracket.jsx.js');
var AuthComponent = require('./Authenticated.jsx.js');


  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.connect(mainStore, "data")],

    getInitialState: function() {
      return {otherTeams: [], leagueId: location.hash.slice(10), leagueName: '', schoolsList: []}
    },

    componentDidMount: function(){
      this.listenTo(mainStore, this.populate);
      MainActions.populate();
    },

    populate: function(data) {
      this.setState({
        otherTeams: data.teams,
        schoolsList: data.schoolsList,
        leagueName: data.leagueName
      });
    },

    render: function() {
      return (
          <div className="main">
            <h1>{this.state.leagueName}</h1>
            <Bracket teams={this.state.schoolsList} />
            <TeamPool schoolsList={this.state.schoolsList} />
            <OtherTeam otherTeams={this.state.otherTeams} />
            <UserTeam userSchoolsList={this.state.userSchoolsList} />
          </div>
        );
    }
  }));


