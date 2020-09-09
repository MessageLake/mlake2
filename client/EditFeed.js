import React from 'react';

const EditFeed = (props) => (
  <div>
    <input type="text" name="text" id="text" onChange={props.updateTags} value={props.tags} />
    <button onClick={props.saveEdit}>Save</button>
  </div>
);

export default EditFeed;
