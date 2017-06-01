import React from 'react';
import Helper from './helper.jsx';

const DEFAULT_WIDTH  = 500;
const DEFAULT_HEIGHT = 500;

let ImageStory = React.createClass({
  propTypes: {
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    rootStyle: React.PropTypes.object,
    onImageSelect: React.PropTypes.func,
  },

  componentWillMount() {
    this.prepareImages(this.props.images, () => this.forceUpdate());
  },

  componentWillReceiveProps(nextProps) {
    let { images=[]} = this.props;
    let nextImages = nextProps.images;
    if (this.shouldPrepareImages(images, nextImages)) {
      this.prepareImages(nextImages, this.forceUpdate.bind(this));
    }
  },

  shouldPrepareImages(currentImages=[], nextImages=[]) {
    if (currentImages.length !== nextImages.length) return true;
    let result = false;
    nextImages.forEach(img => {
      if (currentImages.indexOf(img) === -1) result = true;
    })
    return result;
  },


  prepareImages(images, cb) {
    if (!images || !images.length) return;
    let oldImages = this.images || [];

    this.images = images.map(img => {
      let oldImg = oldImages.find(i => i.src === img);
      return {
        src: img,
        loading: !oldImg,
        width: oldImg ? oldImg.width : null,
        height: oldImg ? oldImg.height : null,
      }
    });


    this.images.forEach((img, index) => {
      if (!img.loading) return;
      let i = new Image();
      i.onload = () => {
        this.images[index].width = i.width;
        this.images[index].height = i.height;
        this.images[index].loading = false;
        this.imagesPrepared() && cb();
      }
      i.onerror = () => {
        this.images.splice(index, 1);
        this.imagesPrepared() && cb();
      }
      i.src = img.src;
    })
  },


  imagesPrepared() {
    if (!this.images || !this.images.length) return;
    return !this.images.some((img) => img.loading)
  },


  getArrangedImages() {
    let result = null;
    let style = this.getStyles();
    let images = this.images && this.images.filter(img => !img.loading);
    if (!images || !images.length) return null;
    let { onImageSelect } = this.props;
    style.img.cursor = onImageSelect ? 'pointer' : null;
    switch (images.length) {
      case 1: result = Helper.getOneImageLayout(images, style, onImageSelect);   break;
      case 2: result = Helper.getTwoImageLayout(images, style, onImageSelect);   break;
      case 3: result = Helper.getThreeImageLayout(images, style, onImageSelect); break;
      case 4: result = Helper.getFourImageLayout(images, style, null, onImageSelect);  break;
      default: result = Helper.getFourImageLayout(images.slice(0, 4), style, images.slice(4), onImageSelect);  break;
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
    return this.getArrangedImages()
  },
});

export default ImageStory;
