import React from 'react';


// This shouldn't be all tags in feeds, it should be all tags on messages
// Or display both separately
const AllTags = (props) => {
  const tags = props.feeds.map(feed => feed.tags).flat();
  return (
    <div className="lemonchiffon component">
      <h3>All Tags</h3>
      {tags.map((tag) => (
        <span>{tag} </span>
      ))}
    </div>
  );
}

export default AllTags;
