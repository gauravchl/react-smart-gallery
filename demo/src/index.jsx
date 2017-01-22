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
        <ImageStory

          images={[
            'http://www.johannjohannsson.com/wp-content/uploads/2015/10/Sicario-CD-Cover-500x500.jpg',
            'http://www.johannjohannsson.com/wp-content/uploads/2015/10/Sicario-CD-Cover-500x500.jpg',
            'http://media.vanityfair.com/photos/54525a63b8745bb176801bd7/master/pass/arya_JS.jpg',
          ]}

          />
      </div>
    )
  },
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<HelloWorld/>, document.getElementById('main'));
});
