"use strict";

var React = require('react'),
    Reflux = require('reflux'),
    Message = require('./message.jsx.js');


var ChatWindow= React.createClass ({

  getInitialState() {
    return {messages: []}
  },

  componentDidMount() {
    socket.on('newMessage', (message)=> {
      var messages = this.state.messages;
      messages.push(message);
      console.log('messages', messages)
      this.setState ({messages});
      console.log('state', this.state.messages)
    });
  },

  submitHandler(e) {
    e.preventDefault();
    var content = React.findDOMNode(this.refs.messageText).value;
    var username = this.props.username;
    var leagueId = this.props.leagueId;
    socket.emit('sendMessage', {leagueId, content, username})

  },

  render() {
    console.log('render', this.state)
    var messages = this.state.messages.map ((message) => {
      return (
          <Message content={message.content} username={message.username} />
        )
    });

    return (
        <div className="chat-window">
          <h1>ChatWindow</h1>
          <div className="messages">
            <ul>
              {messages}
            </ul>
          </div>
          <div className="typeMessage">
            <form className = "message-form" onSubmit= {this.submitHandler.bind(this)} >
              <input type="text" ref="messageText" />
              <input type="submit" />
            </form>
          </div>
        </div>
      )
  }
});

module.exports = ChatWindow;