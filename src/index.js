require('./css/main.css');

import React from 'react';
import {render} from 'react-dom';
import Masonry from 'react-masonry-component';
import range from 'lodash/range';

const masonryOptions = {
    gutter: 10
};

class App extends React.Component {
  render() {

    const children = range(40).map((i) => {
      return <div key={i} className="gallery_item">Hi there</div>
    });

    return (
      <Masonry options={masonryOptions}>
        {children}
      </Masonry>
    );
  }
}

render(<App/>, document.getElementById('gallery'));
