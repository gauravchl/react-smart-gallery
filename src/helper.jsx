import React from 'react';
import Layouts from './layouts.js'

const Helper = {

    getOneImageLayout(images) {



    },

    getTwoImageLayout(images) {


    },

    getThreeImageLayout(images) {
      let best = {
        score: 999999,
        layout: 4,
        pos: [0, 1, 2],
      };
      for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
          let x = j % 3;
          let y = (j+1) % 3;
          let z = (j+2) % 3;

          let score = Layouts[`_l${i+4}`].getScore([images[x], images[y], images[z]]);
          if (score < best.score) best = { score: score, layout: i + 4, pos: [x, y, z]};
        }
      }
      console.log(best);
      let params = Layouts[`_l${best.layout}`].getParams();

      return [0,1,2].map((index) => {
        let width = `${params[index].width}%`;
        let height = `${params[index].height}%`;
        let style = Object.assign({}, images[best.pos[index]].style, {width, height})
        return <img src={images[best.pos[index]].src} style={style} />
      })

    },

};




export default Helper
