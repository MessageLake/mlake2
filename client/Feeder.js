import React from 'react';

class Feeder extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tags: '' };
    this.updateTags = this.updateTags.bind(this);
    this.postFeed = this.postFeed.bind(this);
  }

  updateTags(event) {
    this.setState({ tags: event.target.value });
  }

  postFeed() {
    const { tags } = this.state;
    fetch('/feed', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tags })
    })
      .then(_res => {
        this.props.getFeeds();
      })
      .catch((err) => console.error(`Error posting feed: ${err}`));
  }

  render() {
    return (
      <div style={{backgroundColor: "lightpink"}}>
        <h1>Create Feed</h1>
        <label htmlFor="tags">Tags (comma-separated)</label><br/>
        <input type="text" name="tags" onChange={this.updateTags} /><br/>
        <button onClick={this.postFeed}>Create Feed</button>
      </div>
    )
  }
}

export default Feeder;
