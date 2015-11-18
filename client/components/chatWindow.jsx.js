"use strict";

var React = require('react'),
    Reflux = require('reflux'),
    Message = require('./message.jsx.js');


class ChatWindow extends React.Component {

  constructor (props) {
    super(props);
    this.state =  {messages: []};
  }
  componentDidMount () {
    socket.on('newMessage', (message)=> {
      let messages = this.state.messages;
      messages.push(message);
      console.log('messages', messages)
      this.setState ({messages});
      console.log('state', this.state.messages)
    });
  }

  submitHandler (e) {
    e.preventDefault();
    let content = React.findDOMNode(this.refs.messageText).value;
    let username = this.props.username;
    let leagueId = this.props.leagueId;
    socket.emit('sendMessage', {leagueId, content, username})

  }

  render () {
    console.log('render', this.state)
    let messages = this.state.messages.map ((message) => {
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