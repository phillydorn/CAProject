var React = require('react');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var BracketMain = require('./components/main.jsx.js');
var Login = require('./components/login.jsx.js');
var Signup = require('./components/signup.jsx.js');
var Bracket = require('./components/bracket.jsx.js');
var CreateLeague = require('./components/CreateLeague.jsx.js');
var JoinLeague = require('./components/joinLeague.jsx.js');
var NavHeader = require('./components/nav.jsx.js');


var BracketApp = React.createClass({


  getInitialState: function() {
    return {loggedIn : false}
  },


  render : function(){

    return (
      <div>
        <NavHeader />
        <RouteHandler data={this.state.loggedIn} />
      </div>
    );
  }
});


var routes = (
    <Route name="BracketApp" handler={BracketApp} path="/">
      <DefaultRoute handler = {BracketMain} />
        <Route name="Login" path="/login" handler={Login} />
        <Route name="Signup" path="/signup" handler={Signup} />
        <Route name="Bracket" path="/bracket" handler={Bracket} />
        <Route name="CreateLeague" path="/create" handler={CreateLeague} />
        <Route name="JoinLeague" path="/join" handler={JoinLeague} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
