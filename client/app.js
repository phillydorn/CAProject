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
var JoinLeagues = require('./components/joinLeagues.jsx.js');
var Leagues = require('./components/leagues.jsx.js');
var NavHeader = require('./components/nav.jsx.js');
var Logout = require('./components/logout.jsx.js');


var BracketApp = React.createClass({

  render : function(){

    return (
      <div>
        <NavHeader />
        <RouteHandler />
      </div>
    );
  }
});


var routes = (
    <Route name="BracketApp" handler={BracketApp} path="/">
      <DefaultRoute handler = {Leagues} />
        <Route name="Login" path="/login" handler={Login} />
        <Route name="Signup" path="/signup" handler={Signup} />
        <Route name="Bracket" path="/bracket" handler={Bracket} />
        <Route name="CreateLeague" path="/create" handler={CreateLeague} />
        <Route name="JoinLeagues" path="/join" handler={JoinLeagues} />
        <Route name="Leagues" path="/leagues" handler={Leagues} />
        <Route name="League" path="/leagues/:league" handler={BracketMain} />
        <Route name="Logout" path="/logout" handler={Logout} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
