"use strict";

var React = require('react'),
    Reflux = require('reflux');


class Message extends React.Component {

  render () {
    return (
        <li className ="message">
          <p className = "message-user">{this.props.username}:</p>
          <p className="message-content">{this.props.content}</p>
        </li>
      )
  }
}


module.exports = Message;