import React from 'react';
import Layouts from './layouts.js'

const Helper = {

  getOneImageLayout(images, style, onImageSelect) {
    return (
      <div style={Object.assign({}, style.root, {height: 'auto'})}>
        <img onClick={(e) => onImageSelect && onImageSelect(e, images[0].src, 0)} src={images[0].src} style={Object.assign({}, style.img,  {width: '100%'})} />
      </div>
    )
  },

  getTwoImageLayout(images, style, onImageSelect) {
    let score1 = Layouts['_l2_1'].getScore(images);
    let score2 = Layouts['_l2_2'].getScore(images);

    let img1Style = { ...style.img, paddingTop: '50%', backgroundImage: `url(${images[0].src})` };
    let img2Style = { ...style.img, paddingTop: '50%', backgroundImage: `url(${images[1].src})` };

    if (score1 < score2) {
      let params = Layouts['_l2_1'].getParams();
      img1Style.width = params[0].width + '%';
      img2Style.width = params[1].width + '%';
    } else {
      let params = Layouts['_l2_2'].getParams();
      img1Style.width = params[0].width + '%';
      img2Style.width = params[1].width + '%';
    }

    return (
      <div style={{ ...style.root, height: 'auto', overflow: 'hidden' }}>
        <div onClick={(e) => onImageSelect && onImageSelect(e, images[0].src, 0)} key={1} style={img1Style} />
        <div onClick={(e) => onImageSelect && onImageSelect(e, images[1].src, 1)} key={2} style={img2Style} />
      </div>
    )
  },

  getThreeImageLayout(images, style, onImageSelect) {
    let best = {
      score: 999999,
      layout: 1,
      pos: [0, 1, 2],
    };
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let x = j % 3;
        let y = (j + 1) % 3;
        let z = (j + 2) % 3;

        let score = Layouts[`_l3_${i + 1}`].getScore([images[x], images[y], images[z]]);
        if (score < best.score) best = { score: score, layout: i + 1, pos: [x, y, z]};
      }
    }
    let params = Layouts[`_l3_${best.layout}`].getParams();

    let preparedImages = [0,1,2].map((index) => {
      let width = `${params[index].width}%`;
      let height = `${params[index].height}%`;
      let backgroundImage = `url(${images[best.pos[index]].src})`;
      let styl = Object.assign({}, style.img, {width, height, backgroundImage})
      return <div onClick={(e) => onImageSelect && onImageSelect(e, images[best.pos[index]].src, best.pos[index])} key={index} style={styl}></div>
    })
    return <div style={style.root}>{preparedImages}</div>
  },

  getFourImageLayout(images, style, remainingImages, onImageSelect) {
    let best = { layout: 1, pos: [0,1,2,3]}
    best.score = Layouts['_l4_1'].getScore(images);
    for (let i = 2; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let w = j % 4;
        let x = (j + 1) % 4;
        let y = (j + 2) % 4;
        let z = (j + 3) % 4;

        let score = Layouts[`_l4_${i}`].getScore([images[w], images[x], images[y], images[z]]);
        if (score < best.score) best = { score: score, layout: i, pos: [w, x, y, z]};
      }
    }

    let params = Layouts[`_l4_${best.layout}`].getParams();
    let preparedImages = [0,1,2,3].map((index) => {
      let width = `${params[index].width}%`;
      let height = `${params[index].height}%`;
      let backgroundImage = `url(${images[best.pos[index]].src})`;
      let styl = Object.assign({}, style.img, {width, height, backgroundImage})
      let showMore = index == 3 && remainingImages && remainingImages.length

      return <div key={index} onClick={(e) => onImageSelect && onImageSelect(e, images[best.pos[index]].src, best.pos[index])} style={styl}>{showMore ? <div style={style.more}>+ {remainingImages.length}</div> : null}</div>
    })
    return <div style={style.root}>{preparedImages}</div>
  },

  getFiveImageLayout(images) {
    return <p>5 images not suported yet</p>
  },
};




export default Helper
