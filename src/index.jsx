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
    this.prepareImages(this.props.images, () => {console.log('images prepared', this.images); this.forceUpdate();});
  },

  componentWillReceiveProps(nextProps) {
    let nextImages = nextProps.images;
    this.prepareImages(nextImages, () => {console.log('images prepared', this.images); this.forceUpdate();});

  },


  prepareImages(images, cb) {
    if (!images || !images.length) return;
    let style = this.getStyles();

    this.images = [];
    images.forEach((img, index) => {
      let i = new Image();
      this.images[index] = {src: img, loading: true};
      i.onload = () => {
        this.images[index] = {src: img, width: i.width, height: i.height, style: style.img}
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
    switch(this.images && this.images.length){
      case 1: result = Helper.getOneImageLayout(this.images);   break;
      case 2: result = Helper.getTwoImageLayout(this.images);   break;
      case 3: result = Helper.getThreeImageLayout(this.images); break;
      case 4: result = Helper.getFourImageLayout(this.images);  break;
      case 5: result = Helper.getFiveImageLayout(this.images);  break;
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
        objectFit: 'cover',
        border: 'solid 2px transparent',
        float: 'left',
      }

    }


    return styles;
  },


  render() {
    let styles = this.getStyles();

    // Todo - show placeholder here based on number of total images
    if (!this.imagesPrepared()) return <div>Preparing images...</div>

    return (
      <div style={styles.root}>
        {this.getArrangedImages()}
      </div>
    )
  },
});

export default ImageStory;
