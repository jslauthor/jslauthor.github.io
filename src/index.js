require('./css/main.css');

import React from 'react';
import ImageGallery from 'react-image-gallery';
import {render} from 'react-dom';
import Masonry from 'react-masonry-component';
import isEmpty from 'lodash/isEmpty';
import partial from 'lodash/partial';
import marked from 'marked';

const {images} = require('!json!./images_list.json');

const masonryOptions = {
  gutter: 25,
  fitWidth: true
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
      showOverlay: false
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
          <img className="gallery_img" src={`${i.thumbnail}`} onClick={partial(this.showOverlay, idx)} />
          {!isEmpty(i.description) && <div className="gallery_desc" dangerouslySetInnerHTML={{__html:marked(i.description)}}></div>}
          {!isEmpty(i.client) &&
            <div className="gallery_client">
              <a href={i.clientLink} target="_blank">{i.client}&nbsp;&nbsp;<i className="fa fa-external-link" aria-hidden="true"></i></a>
            </div>}
        </div>
      );
    });

    return (
      <div className="gallery__component">
        <Masonry options={masonryOptions} className="mc">
          {masonryChildren}
        </Masonry>
        { this.state.showOverlay &&
          <div className="gallery__slider">
            <div className="gallery__bg" onClick={this.hideOverlay}></div>
            <ImageGallery items={images} startIndex={this.state.selectedImage} />
            <i className="fa fa-times-circle fa-2x gallery__close" onClick={this.hideOverlay}></i>
          </div>
        }
      </div>
    );
  }
}

render(<App/>, document.getElementById('gallery'));
