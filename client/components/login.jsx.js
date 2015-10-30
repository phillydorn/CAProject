var React = require('react');
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions');
var loginStore = require('../stores/loginStore');
var authStore = require('../stores/authStore');
var Router = require('react-router');
var WebSocket = require('ws');

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

    mixins: [Router.Navigation, Reflux.connect(authStore, 'loggedIn')],


  getInitialState: function() {
    return {loggedIn: this.props.loggedIn}
  },

  componentDidMount: function() {
    this.listenTo(authStore, this.pathRedirect);
    function updateStats(memuse) {
        document.getElementById('rss').innerHTML = memuse.rss;
        document.getElementById('heapTotal').innerHTML = memuse.heapTotal;
        document.getElementById('heapUsed').innerHTML = memuse.heapUsed;
      }
      var host = window.document.location.host.replace(/:.*/, '');
      console.log('host', host)
      var ws = new WebSocket('ws://' + host + (process.env.PORT||':3000'));
      ws.onmessage = function (event) {
        updateStats(JSON.parse(event.data));
      };
  },

  pathRedirect: function(loggedIn) {
    if (loggedIn) {
      this.transitionTo('/');
    }
  },


  handleSubmit: function(e) {
    e.preventDefault();
    var data = {
      username: React.findDOMNode(this.refs.username).value,
      password: React.findDOMNode(this.refs.password).value
    }
    LoginActions.sendLogin(data);
  },

  render: function() {
    return (
      <div>
        <form noValidate className="signup-form" onSubmit = {this.handleSubmit}>
          <h1>Login</h1>
          <label>username</label>
          <input type="text" placeholder="username" ref="username"/>
          <label>Password</label>
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
});

module.exports = Login;