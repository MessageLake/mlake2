import React from 'react';
import Feed from './Feed.js';

const Feeds = (props) => (
  <div>
    <h1>Feeds</h1>
    {props.feeds.map((feed) => (
      <Feed feed={feed} /> 
    ))}
  </div>
)

export default Feeds;