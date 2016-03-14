"use strict";
import {React, Reflux, ReactDOM} from '../importPackage';
var Message = require('./message.jsx.js');


class ChatWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentDidMount() {
    socket.on('newMessage', (message)=>{
      let messages = this.state.messages;
      messages.push(message);
      this.setState ({messages});
    });
  }

  submitHandler(e) {
    e.preventDefault();
    let messageText = ReactDOM.findDOMNode(this.refs.messageText);
    let content = messageText.value;
    messageText.value = '';
    let username = this.props.username;
    let leagueId = this.props.leagueId;
    socket.emit('sendMessage', {leagueId, content, username})

  }

  render() {
    let messages = this.state.messages.map (function(message) {
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
};

module.exports = ChatWindow;