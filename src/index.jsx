import React from 'react';
import Helper from './helper.jsx';

const DEFAULT_WIDTH  = 500;
const DEFAULT_HEIGHT = 500;

let ImageStory = React.createClass({
  propTypes: {
    images: React.PropTypes.arrayOf(React.PropTypes.object),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  },

  getInitialState() {
    return {

    };
  },


  componentWillMount() {
    this.prepareImages(this.props.images, () => this.forceUpdate());
  },

  componentWillReceiveProps(nextProps) {
    let nextImages = nextProps.images;
    this.prepareImages(nextImages, () => this.forceUpdate());
  },


  prepareImages(images, cb) {
    if (!images || !images.length) return;

    this.images = [];
    images.forEach((img, index) => {
      let i = new Image();
      this.images[index] = {src: img, loading: true};
      i.onload = () => {
        this.images[index] = {src: img, width: i.width, height: i.height}
        this.imagesPrepared() && cb();
      }
      i.onerror = () => {
        this.images.splice(index, 1);
        this.imagesPrepared() && cb();
      }
      i.src = img;
    })
  },


  imagesPrepared() {
    if (!this.images || !this.images.length) return;
    return !this.images.some((img) => img.loading)
  },


  getArrangedImages() {
    let result = null;
    let style = this.getStyles();

    switch (this.images && this.images.length) {
      case 1: result = Helper.getOneImageLayout(this.images, style);   break;
      case 2: result = Helper.getTwoImageLayout(this.images, style);   break;
      case 3: result = Helper.getThreeImageLayout(this.images, style); break;
      case 4: result = Helper.getFourImageLayout(this.images, style);  break;
      case 5: result = Helper.getFiveImageLayout(this.images, style);  break;
    }
    return result || `${this.images.length} images not supported.`;
  },


  getStyles() {
    let {width, height} = this.props;

    let styles = {
      root: {
        width: width || DEFAULT_WIDTH,
        height: height || DEFAULT_HEIGHT,
        backgroundColor: '#f5f5f5',
      },
      img: {
        boxSizing: 'border-box',
        border: 'solid 2px transparent',
        float: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    };
    return styles;
  },


  render() {
    // Todo - show placeholder here based on number of total images
    if (!this.imagesPrepared()) return <div>Preparing images...</div>
    return this.getArrangedImages()
  },
});

export default ImageStory;
