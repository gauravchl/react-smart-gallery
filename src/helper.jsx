import React from 'react';
import Layouts from './layouts.js'

const Helper = {

  getOneImageLayout(images, style) {
    return (
      <div style={Object.assign({}, style.root, {height: 'auto'})}>
        <img src={images[0].src} style={Object.assign({}, style.img,  {width: '100%'})} />
      </div>
    )
  },

  getTwoImageLayout(images, style) {
    let score1 = Layouts['_l2_1'].getScore(images);
    let score2 = Layouts['_l2_2'].getScore(images);

    let params = '';
    if (score1 < score2) {
      params = Layouts['_l2_1'].getParams();
    } else {
      params = Layouts['_l2_2'].getParams();
      style.root.height = style.root.width / 2
    }

    return (
      <div style={Object.assign({}, style.root)}>
        <img src={images[0].src} style={Object.assign({}, style.img,  {width: params[0].width + '%', height: params[0].height + '%'})} />
        <img src={images[1].src} style={Object.assign({}, style.img,  {width: params[1].width + '%', height: params[1].height + '%'})} />
      </div>
    )
  },

  getThreeImageLayout(images, style) {
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
    console.log(best);
    let params = Layouts[`_l3_${best.layout}`].getParams();

    let preparedImages = [0,1,2].map((index) => {
      let width = `${params[index].width}%`;
      let height = `${params[index].height}%`;
      let styl = Object.assign({}, style.img, {width, height})
      return <img src={images[best.pos[index]].src} style={styl} />
    })
    return <div style={style.root}>{preparedImages}</div>
  },

  getFourImageLayout(images) {
    return <p>4 images not supported yet</p>
  },

  getFiveImageLayout(images) {
    return <p>5 images not suported yet</p>
  },
};




export default Helper
