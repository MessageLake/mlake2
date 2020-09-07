import React from 'react';
import Message from './Message';

const Feed = (props) => (
  <div>
    <h2>Feed {props.feed.id}</h2>
    <h3>Tags</h3>
    {props.feed.tags.map((tag) => (
      <span key={tag}>{tag} </span>
    ))}
    <h3>Messages</h3>
    {props.feed.messages.map((message) => (
      <Message message={message} />
    ))}
  </div>
);

export default Feed;
