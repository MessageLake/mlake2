import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './Messager';
import Feeder from './Feeder';
import Feeds from './Feeds';

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
      .then(json => {
        console.log(json);
        this.setState({ feeds: json });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { feeds } = this.state;
    return (
      <div>
        {/* for adding messages to the database */}
        <Messager getFeeds={this.getFeedsForUser} />
        <Feeder getFeeds={this.getFeedsForUser} />
        {/* for viewing messages from the database in feeds */}
        <Feeds feeds={feeds} />
      </div>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('root'));
