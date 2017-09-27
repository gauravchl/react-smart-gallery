import React from 'react';
import PropTypes from 'prop-types';
import Helper from './helper.jsx';

const DEFAULT_WIDTH  = 500;
const DEFAULT_HEIGHT = 500;


class ImageStory extends React.Component {

  constructor(props) {
    super(props)
    this.shouldPrepareImages = this.shouldPrepareImages.bind(this);
    this.prepareImages = this.prepareImages.bind(this);
    this.imagesPrepared = this.imagesPrepared.bind(this);
    this.getArrangedImages = this.getArrangedImages.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }


  componentWillMount() {
    let { onLoad, images } = this.props;

    this.prepareImages(images, _ => {
      if (!this._isMounted)
        return
      this.forceUpdate();
      onLoad && onLoad();
    });
  }


  componentDidMount() {
    this._isMounted = true;
  }


  componentWillReceiveProps(nextProps) {
    let { images = []} = this.props;
    let nextImages = nextProps.images;
    if (this.shouldPrepareImages(images, nextImages)) {
      this.prepareImages(nextImages, _ => {
        this._isMounted && this.forceUpdate()
      });
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  shouldPrepareImages(currentImages = [], nextImages = []) {
    if (currentImages.length !== nextImages.length) return true;
    let result = false;
    nextImages.forEach(img => {
      if (currentImages.indexOf(img) === -1) result = true;
    })
    return result;
  }


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
  }


  imagesPrepared() {
    if (!this.images || !this.images.length) return;
    return !this.images.some((img) => img.loading)
  }


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
  }


  getStyles() {
    let { width, height, rootStyle = {}} = this.props;

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
  }


  render() {
    return this.getArrangedImages()
  }
}


ImageStory.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rootStyle: PropTypes.object,
  onImageSelect: PropTypes.func,
  onLoad: PropTypes.func,
}


export default ImageStory;
