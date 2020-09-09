import React from 'react';
import Message from './Message';
import EditFeed from './EditFeed';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      id: props.feed.id,
      tags: props.feed.tags,
      messages: []
    };
    this.editFeed = this.editFeed.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  // componentWillReceiveProps(props) {
  //   if (props.tags) {
  //     this.setState({
  //       feedTags: props.feed.tags
  //     });
  //   }
  // }

  componentDidMount() {
    const { id, tags } = this.state;

    fetch(`/feed/messages?tags=${JSON.stringify(tags)}`)
      .then(res => {
        if (res.type != 'error') {
          return res.json()
        } else {
          throw new Error(res.statusText); 
        }
      })
      .then(data => {
        this.setState({
          messages: data.messages
        });
      })
      .catch(err => console.error(`Error loading messages for feed id=${id} : ${err.message}`));
  }

  editFeed() {
    this.setState({ editing: true });
  }

  updateTags(event) {
    this.setState({ tags: event.target.value.split(',') });
  }

  saveEdit() {
    const { id, tags } = this.state;
    fetch('/feed', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id, 
        tags: tags
      })
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ 
          editing: false,
          messages: data.messages
        });
      })
      .catch(err => console.error(`Error saving tag edits: ${err}`));
  }

  render() {
    const { editing, id, tags, messages } = this.state;
    return (
      <div>
        <h2 style={{backgroundColor: "orange"}}>Feed {id}</h2>
        <h3>Tags</h3>
        {
          editing
          ? <EditFeed tags={tags} saveEdit={this.saveEdit} updateTags={this.updateTags} />
          : <div>
              {tags.map((tag) => (
                <span key={tag}>{tag} </span>
              ))}
              <button onClick={this.editFeed}>Edit</button>
            </div>
        }
        <h3>Messages</h3>
        {messages ? messages.map(message => <Message message={message} />) : 'no messages found'}
      </div>

    )
  }
}

export default Feed;
