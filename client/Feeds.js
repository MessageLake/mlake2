import React from 'react';
import Feed from './Feed';

const Feeds = (props) => (
  <div className="lightgray component">
    <h1>Feeds</h1>
    <div className="row">
      {props.feeds.map((feed) => (
        <Feed key={feed.id} feed={feed} /> 
      ))}
    </div>
  </div>
);

export default Feeds;