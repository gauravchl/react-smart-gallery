import React from 'react';
import Helper from './helper.jsx';

const DEFAULT_WIDTH  = 500;
const DEFAULT_HEIGHT = 500;

let ImageStory = React.createClass({
  propTypes: {
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    rootStyle: React.PropTypes.object,
    onImageSelect: React.PropTypes.func,
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


    if (!this.images || !this.images.length) return null;
    let { onImageSelect } = this.props;
    style.img.cursor = onImageSelect ? 'pointer' : null;

    switch (this.images.length) {
      case 1: result = Helper.getOneImageLayout(this.images, style, onImageSelect);   break;
      case 2: result = Helper.getTwoImageLayout(this.images, style, onImageSelect);   break;
      case 3: result = Helper.getThreeImageLayout(this.images, style, onImageSelect); break;
      case 4: result = Helper.getFourImageLayout(this.images, style, null, onImageSelect);  break;
      default: result = Helper.getFourImageLayout(this.images.slice(0, 4), style, this.images.slice(4), onImageSelect);  break;
    }
    return result
  },


  getStyles() {
    let {width, height, rootStyle={}} = this.props;

    let styles = {
      root: {
        backgroundColor: '#f5f5f5',
        ...rootStyle,
        width: width || DEFAULT_WIDTH,
        height: height || DEFAULT_HEIGHT,
      },
      img: {
        boxSizing: 'border-box',
        border: 'solid 2px #fff',
        float: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      more: {
        width: '100%',
        height: '100%',
        display: 'flex',
        color: '#fff',
        fontSize: '38px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
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
