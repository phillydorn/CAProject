import { React, ReactDOM, Router } from './importPackage';
// import { Router, Route, Link, History, LifeCycle, IndexRoute, browserHistory } from 'react-router';
// import { createHistory, useBasename } from 'history';
require ('./styles/manifest.scss');

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;

var BracketMain = require('./components/main.jsx.js');
var Login = require('./components/login.jsx.js');
var Signup = require('./components/signup.jsx.js');
var Bracket = require('./components/bracket.jsx.js');
var CreateLeague = require('./components/CreateLeague.jsx.js');
var JoinLeagues = require('./components/joinLeagues.jsx.js');
var Leagues = require('./components/leagues.jsx.js');
var NavHeader = require('./components/nav.jsx.js');
var Logout = require('./components/logout.jsx.js');
import AppActions from './actions/AppActions.js';
import appStore from './stores/appStore';

// import NoMatch from './components/nomatch.jsx.js';

// const history = useBasename(createHistory)({
//   basename: '/'
// });

// const history = createHistory();

var BracketApp = React.createClass({

  componentDidMount () {
    AppActions.updateResults();
  },

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
    <Route name="BracketApp" path="/" handler={BracketApp} >
        <DefaultRoute handler ={Leagues} />
        <Route name ="Login" path="/login" handler={Login} />
        <Route name ="Signup" path="/signup" handler={Signup} />
        <Route name ="CreateLeague" path="/create" handler={CreateLeague} />
        <Route name ="JoinLeagues" path="/join" handler={JoinLeagues} />
        <Route name ="Leagues" path="/leagues" handler={Leagues} />
        <Route name ="League" path="/league/:league" handler={BracketMain} />
        <Route name ="Bracket" path="bracket/:league" handler={Bracket} />
        <Route name ="Logout" path="/logout" handler={Logout} />
      </Route>
);

Router.run(routes, function(Handler) {
  ReactDOM.render(<Handler />, document.getElementById('content'));
})

