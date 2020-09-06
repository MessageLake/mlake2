import React from 'react';

const Messager = () => (
  <div>
    <h1>Messager</h1>
    <h3>Send a message</h3>
    {/* send messages from here */}
    <form>
      <label htmlFor="tags">Tags: (comma-separated)</label><br/>
      <input type="text" id="tags" name="tags" /><br/>
      <label htmlFor="text">Text:</label><br/>
      <input type="text" id="text" name="text"/><br/>
    </form>
  </div>
);

export default Messager;
