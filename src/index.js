require('./css/main.css');

import React from 'react';
import ImageGallery from 'react-image-gallery';
import {render} from 'react-dom';
import Masonry from 'react-masonry-component';
import isEmpty from 'lodash/isEmpty';
import partial from 'lodash/partial';

const {images} = require('!json!./images_list.json');

const masonryOptions = {
  gutter: 10
};

const sliderOptions = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  arrows: true,
  variableWidth: true
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
      showOverlay: true
    };
  }

  showOverlay = (index) => {
    this.setState({
      selectedImage: index,
      showOverlay: true
    });
  }

  hideOverlay = () => {
    this.setState({
      showOverlay: false
    })
  }

  render() {

    const masonryChildren = images.map((i, idx) => {
      return (
        <div key={idx} className="gallery_masonry-item">
          <img src={`${i.thumbnail}`} onClick={partial(this.showOverlay, idx)} />
          {!isEmpty(i.description) && <div>{i.description}</div>}
        </div>
      );
    });

    return (
      <div className="galley__component">
        <Masonry options={masonryOptions}>
          {masonryChildren}
        </Masonry>
        { this.state.showOverlay &&
          <div className="gallery__slider">
            <div className="gallery__bg" onClick={this.hideOverlay}></div>
            <ImageGallery items={images} startIndex={this.state.selectedImage} />
          </div>
        }
      </div>
    );
  }
}

render(<App/>, document.getElementById('gallery'));
