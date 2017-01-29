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

  getTwoImageLayout(images) {
    return <p>2 image layout is not ready yet</p>
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
