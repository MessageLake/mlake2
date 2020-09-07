import React from 'react';

class Messager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      text: ''
    };
    this.updateTags = this.updateTags.bind(this);
    this.updateText = this.updateText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  updateTags(event) {
    this.setState({ tags: event.target.value });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
  }
  
  sendMessage() {
    const { tags, text } = this.state;
    const message = { tags, text };
    fetch('/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(_res => {
        this.props.getFeeds();
      })
      .catch(err => {
        console.error(`Error sending message: ${err.message}`);
      });
  }

  render() {
    return (
      <div style={{backgroundColor: "lightgreen"}}>
        <h1>Messager</h1>
        <h3>Send a message</h3>
        {/* send messages from here */}
        <div>
          <label htmlFor="tags">Tags: (comma-separated)</label><br/>
          <input type="text" id="tags" name="tags" onChange={this.updateTags}/><br/>
          <label htmlFor="text">Text:</label><br/>
          <input type="text" id="text" name="text" onChange={this.updateText}/><br/>
          <button onClick={this.sendMessage}>Post</button>
        </div>
      </div>
    );
  }
}

export default Messager;
