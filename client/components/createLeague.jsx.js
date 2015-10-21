var React = require('react');
var CreateActions = require('../actions/CreateActions');
var createStore = require('../stores/createStore');

var CreateLeague = React.createClass({
handleSubmit: function(e) {
    e.preventDefault();
    var leaguename= React.findDOMNode(this.refs.leaguename).value


    var data = {
        leaguename: leaguename
      };
      CreateActions.createLeague(data);
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
      </div>
    );
  }
});

module.exports = CreateLeague;