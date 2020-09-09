import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './Messager';
import Feeder from './Feeder';
import Feeds from './Feeds';
import AllTags from './AllTags';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    };
    this.getFeedsForUser = this.getFeedsForUser.bind(this);
  }
  
  componentDidMount() {
    this.getFeedsForUser();
  }

  getFeedsForUser() {
    fetch('/feeds')
      .then(res => res.json())
      .then(data => {
        this.setState({ feeds: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { feeds } = this.state;
    return (
      <div>
        {/* for adding messages to the database */}
        <Messager getFeeds={this.getFeedsForUser} />
        {/* show all tags */}
        <AllTags feeds={feeds}/>
        {/* for adding feeds to the database */}
        <Feeder getFeeds={this.getFeedsForUser} />
        {/* for viewing messages from the database in feeds */}
        <Feeds feeds={feeds} />
      </div>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('root'));
