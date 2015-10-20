var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');
var UserTeam = require('./userTeam.jsx.js');
var OtherTeam = require('./otherTeams.jsx.js');
var Bracket = require('./bracket.jsx.js');


  var BracketMain = React.createClass({

    mixins: [Reflux.connect(mainStore, "schoolsList")],

    render: function() {
      return (
          <div className="main">
            <h1>Main</h1>
            <Bracket teams={this.state.schoolsList.list} />
            <TeamPool schoolsList={this.state.schoolsList.list} />
            <OtherTeam />
            <UserTeam userSchoolsList={this.state.userSchoolsList} />
          </div>
        );
    }
  });



module.exports = BracketMain;