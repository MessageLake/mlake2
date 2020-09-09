import React from 'react';
import Feed from './Feed';

const Feeds = (props) => (
  <div style={{backgroundColor: "lightgray"}}>
    <h1>Feeds</h1>
    {props.feeds.map((feed) => (
      <Feed feed={feed} /> 
    ))}
  </div>
);

export default Feeds;