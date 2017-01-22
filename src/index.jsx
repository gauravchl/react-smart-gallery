import React from 'react';
import Helper from './helper.jsx';

const DEFAULT_WIDTH  = 350;
const DEFAULT_HEIGHT = 350;

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
    this.prepareImages(() => {console.log('images prepared', this.images); this.forceUpdate();});
  },


  prepareImages(cb) {
    let { images } = this.props;
    let style = this.getStyles();
    if (!images || !images.length) return;

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
    }
    return result;
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
