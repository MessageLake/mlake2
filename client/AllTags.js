import React from 'react';


// Idea: This shouldn't be all tags in feeds, it should be all tags on messages
//    While each Feed is responsible for it's own messages, idea is not practical
//    Idea becomes doable when Tags exist in their own database table.
const AllTags = (props) => {
  const tags = props.feeds.map(feed => feed.tags).flat();
  return (
    <div style={{backgroundColor: 'lemonchiffon'}}>
      <h3>All Tags</h3>
      {tags.map((tag) => (
        <span>{tag} </span>
      ))}
    </div>
  );
}

export default AllTags;
