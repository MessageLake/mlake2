import React from 'react';
import Message from './Message';
import EditFeed from './EditFeed';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      feedId: props.feed.id,
      feedTags: props.feed.tags,
      feedMessages: props.feed.messages
    };
    this.editFeed = this.editFeed.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      feedId: this.props.feed.id,
      feedTags: this.props.feed.tags,
      feedMessages: this.props.feed.messages
    });
  }

  editFeed() {
    this.setState({ editing: true });
  }

  updateTags(event) {
    this.setState({ feedTags: event.target.value.split(',') });
  }

  saveEdit() {
    const { feedId, feedTags } = this.state;
    fetch('/feed', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: feedId, 
        tags: feedTags
      })
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ 
          editing: false,
          feedMessages: data.messages
        });
      })
      .catch(err => console.error(`Error saving tag edits: ${err}`));
  }

  render() {
    const { editing, feedId, feedTags, feedMessages } = this.state;
    return (
      <div>
        <h2 style={{backgroundColor: "orange"}}>Feed {feedId}</h2>
        <h3>Tags</h3>
        {
          editing
          ? <EditFeed tags={feedTags} saveEdit={this.saveEdit} updateTags={this.updateTags} />
          : <div>
              {feedTags.map((tag) => (
                <span key={tag}>{tag} </span>
              ))}
              <button onClick={this.editFeed}>Edit</button>
            </div>
        }
        <h3>Messages</h3>
        {feedMessages.map((message) => (
          <Message message={message} />
        ))}
      </div>

    )
  }
}

export default Feed;
