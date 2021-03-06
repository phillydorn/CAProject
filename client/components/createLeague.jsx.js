import {React, Reflux, Router, ReactDOM} from '../importPackage';


var CreateLeagueActions = require('../actions/CreateLeagueActions');
var createLeagueStore = require('../stores/createLeagueStore');
var createTeamStore = require('../stores/createTeamStore');
var TeamForm = require('./teamForm.jsx.js');
var AuthComponent = require('./Authenticated.jsx.js');



module.exports = AuthComponent(React.createClass({


  mixins: [Reflux.ListenerMixin, Router.Navigation],

  getInitialState: function() {
    return {teamForm: <div />, created: false}
  },

  componentDidMount: function() {
    this.listenTo(createLeagueStore, this.loadForm);
    this.listenTo(createTeamStore, this.pathRedirect);
  },

  loadForm: function(payload) {
    if (payload.created) {
      this.setState({

        teamForm: <TeamForm leagueID={payload.leagueID} />
      });
    }
  },

  pathRedirect: function(leagueID) {
    this.transitionTo('/league/'+leagueID);
  },

  handleSubmit: function(e) {
      e.preventDefault();
      var leaguename= ReactDOM.findDOMNode(this.refs.leaguename).value

      CreateLeagueActions.createLeague(leaguename);
    },


  render: function() {

    return (
      <div>
        <form noValidate className="league-form" onSubmit={this.handleSubmit}>
          <h1>Create A League</h1>
          <div className="input-block">
            <label>League Name</label>
            <input type="text" placeholder="League Name" ref="leaguename" />
          </div>
          <input type="Submit" />
        </form>
        {this.state.teamForm}
      </div>
    );
  }
}));

