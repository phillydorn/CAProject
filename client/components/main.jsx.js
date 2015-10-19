var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');


  var BracketMain = React.createClass({

    mixins: [Reflux.connect(mainStore, "schoolsList")],




    render: function() {
      return (
          <div className="main">
            <h1>Main</h1>
            <TeamPool schoolsList={this.state.schoolsList} />
          </div>
        );
    }
  });



module.exports = BracketMain;