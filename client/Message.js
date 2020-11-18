import React from 'react';

const Message = (props) => (
  <div className="message">
    <div>
      {props.message.text}
    </div>
    <div className="messageFooter">
      <div>
        {props.message.tags.map((tag) => (
        <span>{tag} </span>
        ))}
      </div>
      <span>{props.message.id}</span>
    </div>
  </div>
);

export default Message;
