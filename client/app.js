import React from 'react';
import ReactDOM from 'react-dom';
import Messager from './Messager';
import Feeds from './Feeds';

const App = (
  <div>
    <Messager/>
    <Feeds/>
  </div>
);

ReactDOM.render(App, document.getElementById('root'));
