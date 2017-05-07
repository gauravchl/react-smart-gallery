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
      backgroundColor: '#eee',
      cursor: 'pointer',
      margin: 4,
      position: 'relative',
      width: 100,
      height: 100,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
    let markStyle = {
      width: 20,
      height: 20,
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

    return <div style={{display: 'flex', justifyContent: 'space-between', margin: '22px auto', maxWidth: 1200}}>{images}</div>
  },


  render() {
    let { images } = this.state;
    let selectedImages = images.filter((img) => img.selected).map((img) => img.src);
    return (
      <div style={{paddingBottom: 52}}>
        <Header/>

        {this.getAllImages()}
        <br/>
        <br/>
        <ImageStory onImageSelect={(e, img) => window.open(img)} rootStyle={{margin: '0 auto'}} images={selectedImages} />
        <Footer/>
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
]




const Header = function() {
  let style = {
    background: '#f5f5f5',
    padding: '0 12px',
    borderBottom: 'solid 1px #eee',
  };

  return (
    <header style={style}>
      <div style={{margin: '0 auto', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52}}>
        <span style={{fontFamily: 'monospace', fontSize: '22px'}}>React smart gallery</span>
        <a href='https://github.com/gauravchl/react-smart-gallery' target='_blank'>
          <OctoCat style={{float: 'right', fill: '#424242'}}/>
        </a>
      </div>
    </header>
  )
}


const Footer = function() {
  let style = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    textAlign: 'center',
    display: 'flex',
    fontFamily: 'monospace',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  }
  return (
    <footer style={style}>
      <CamLogo /><a style={{color: '#757575'}} href='https://unsplash.com' target='_blank'>images powered by unsplash</a>
    </footer>
  )
}


const OctoCat = function(props) {
  return (
    <svg height="22" version="1.1" viewBox="0 0 16 16" width="22" {...props}>
      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
  )
}

const CamLogo = function() {
  return (
    <svg width="30px" height="16px" viewBox="0 0 104 90" version="1.1" fill='#616161'>
      <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
        <g id="365-photos-later"  transform="translate(1.000000, 0.000000)">
            <path d="M51.2,36.1 C42.7,36.1 35.7,43 35.7,51.6 C35.7,60.2 42.7,67 51.2,67 C59.7,67 66.7,60.1 66.7,51.5 C66.7,42.9 59.8,36.1 51.2,36.1 L51.2,36.1 Z M89,13.7 L77,13.7 L74.3,6.4 C72.9,2.9 68.7,0 65,0 L37.5,0 C33.7,0 29.6,2.9 28.2,6.4 L25.5,13.7 L13.5,13.7 C5.9,13.7 -0.2,19.9 -0.2,27.4 L-0.2,75.5 C-0.2,83.1 6,89.2 13.5,89.2 L89,89.2 C96.6,89.2 102.7,83 102.7,75.5 L102.7,27.5 C102.8,19.9 96.6,13.7 89,13.7 L89,13.7 Z M51.2,75.6 C37.9,75.6 27.2,64.8 27.2,51.6 C27.2,38.4 38,27.6 51.2,27.6 C64.5,27.6 75.2,38.4 75.2,51.6 C75.2,64.8 64.5,75.6 51.2,75.6 L51.2,75.6 Z" id="Shape"/>
        </g>
      </g>
    </svg>
  )
}
