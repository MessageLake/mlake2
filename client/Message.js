import React from 'react';

const Message = (props) => (
  <div>
    <div>
      {props.message.id}
    </div>
    <div>
      {props.message.tags.map((tag) => (
        <span>{tag} </span>
      ))}
    </div>
    <div>
      {props.message.text}
    </div>
  </div>
);

export default Message;
