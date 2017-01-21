import React from 'react';
import ReactDOM from 'react-dom';

import ImageStory from '../../src/index.jsx';

let HelloWorld = React.createClass({
  propTypes: {

  },

  getInitialState() {
    return {

    };
  },


  render() {
    return (
      <div>
        React Image Story
        <ImageStory/>
      </div>
    )
  },
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<HelloWorld/>, document.getElementById('main'));
});
