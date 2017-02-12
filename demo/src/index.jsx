import React from 'react';
import ReactDOM from 'react-dom';
import ImageStory from '../../src/index.jsx';


let HelloWorld = React.createClass({

  getInitialState() {
    return {
      images: images,
    };
  },


  toggleImage(index) {
    let { images } = this.state;
    images[index].selected = !images[index].selected;
    this.setState({images});
  },


  getAllImages() {
    let wrapStyle = {
      float: 'left',
      margin: 8,
      backgroundColor: '#eee',
      cursor: 'pointer',
      position: 'relative',
      width: 100,
      height: 100,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
    let markStyle = {
      width: 20,
      height:20,
      backgroundColor: '#f44336',
      color: '#fff',
      padding: 4,
      textAlign: 'center',
      position: 'absolute',
      borderRadius: '50%',
      top: 4,
      left: 4,
    }


    let images = this.state.images.map((img, index) => { return (
      <div key={index} style={Object.assign({}, {backgroundImage: `url(${img.src})`}, wrapStyle)} onClick={() => this.toggleImage(index)}>
        {img.selected ? <div style={markStyle}>&#10004;</div> : null}
      </div>
    )})

    return <div style={{overflow: 'hidden', margin: '22px 0'}}>{images}</div>
  },


  render() {
    let { images } = this.state;
    let selectedImages = images.filter((img) => img.selected).map((img) => img.src);
    return (
      <div>
        {this.getAllImages()}
        <ImageStory images={selectedImages} />
      </div>
    )
  },
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<HelloWorld/>, document.getElementById('main'));
});







const images = [
  {
    src: 'https://images.unsplash.com/photo-1480914362564-9f2c2634e266?dpr=2&auto=compress,format&fit=crop&w=568&h=379&q=80&cs=tinysrgb&crop=',
    selected: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1480321182142-e77f14b9aa64?dpr=2&auto=compress,format&fit=crop&w=568&h=379&q=80&cs=tinysrgb&crop=',
    selected: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1470165511815-34e78ff7a111?dpr=2&auto=compress,format&fit=crop&w=568&h=378&q=80&cs=tinysrgb&crop=',
    selected: true,
  },
  {
    src: 'https://source.unsplash.com/random/400x400',
  },
  {
    src: 'https://source.unsplash.com/random/500x500',
  },
  {
    src: 'https://source.unsplash.com/random/600x600',
  },
  {
    src: 'https://source.unsplash.com/random/700x700',
  },
  {
    src: 'https://source.unsplash.com/random/600x700',
  },
  {
    src: 'https://source.unsplash.com/random/800x1000',
  },
  {
    src: 'https://source.unsplash.com/random/1000x1200',
  },
  {
    src: 'https://source.unsplash.com/random/1000x1400',
  },
  {
    src: 'https://source.unsplash.com/random/1024x640',
  },
  {
    src: 'https://source.unsplash.com/random/1920x1080',
  },
  {
    src: 'https://source.unsplash.com/random/1280x800',
  },
  {
    src: 'https://source.unsplash.com/random/1440x900',
  },
]
