import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './Messager';
import Feeds from './Feeds';
import feeds from './sampleFeeds.js';

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
        this.setState({ feeds: json });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { feeds } = this.state;
    return (
      <div>
        {/* for adding messages to the database */}
        <Messager />
        {/* for viewing messages from the database in feeds */}
        <Feeds feeds={feeds} />
      </div>
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('root'));
