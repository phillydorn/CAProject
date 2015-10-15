var React = require('react');
var Router = require('react-router');

var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var BracketMain = require('./components/main.jsx.js');
var Login = require('./components/login.jsx.js');
var Signup = require('./components/signup.jsx.js');
var NavHeader = require('./components/nav.jsx.js');


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
      <DefaultRoute handler = {BracketMain} />
        <Route name="Login" path="/login" handler={Login} />
        <Route name="Signup" path="/signup" handler={Signup} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
