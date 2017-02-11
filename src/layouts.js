const Layouts = {


      _l1_1: {},


      _l2_1: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1, 1/2)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1, 1/2)
          return img1Score + img2Score;
        },
        getParams() {
          return [
            {width: 1 * 100,height: 1 / 2 * 100},
            {width: 1 * 100,height: 1 / 2 * 100},
          ]
        },
      },


      _l2_2: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1/2, 1/2)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/2, 1/2)
          return img1Score + img2Score;
        },
        getParams() {
          return [
            {width: 1 / 2 * 100,height: 1 * 100},
            {width: 1 / 2 * 100,height: 1 * 100},
          ]
        },
      },


      _l3_1: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1, 1/2)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/2, 1/2)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1/2, 1/2)
          return img1Score + img2Score + img3Score;
        },
        getParams() {
          return [
            {width:1*100,height:1/2*100},
            {width:1/2*100,height:1/2*100},
            {width:1/2*100,height:1/2*100},
          ]
        }
      },


      _l3_2: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1, 2/3)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/2, 1/3)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1/2, 1/3)
          return img1Score + img2Score + img3Score;
        },
        getParams() {
          return [
            {width:1*100,height:2/3*100},
            {width:1/2*100,height:1/3*100},
            {width:1/2*100,height:1/3*100},
          ]
        }
      },


      _l3_3: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1/2, 2/3)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/2, 2/3)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1, 1/3)
          return img1Score + img2Score + img3Score;
        },
        getParams() {
          return [
            {width:1/2*100,height:2/3*100},
            {width:1/2*100,height:2/3*100},
            {width:1*100,height:1/3*100},
          ]
        }
      },

      _l4_1: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1/2, 1/2)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/2, 1/2)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1/2, 1/2)
          let img4Score = Layouts._getCroppedPixel(imgs[3].width, imgs[3].height, 1/2, 1/2)
          return img1Score + img2Score + img3Score + img4Score;
        },
        getParams() {
          return [
            {width:1/2*100,height:1/2*100},
            {width:1/2*100,height:1/2*100},
            {width:1/2*100,height:1/2*100},
            {width:1/2*100,height:1/2*100},
          ]
        }
      },
      _l4_2: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 1, 2/3)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/3, 1/3)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1/3, 1/3)
          let img4Score = Layouts._getCroppedPixel(imgs[3].width, imgs[3].height, 1/3, 1/3)
          return img1Score + img2Score + img3Score + img4Score;
        },
        getParams() {
          return [
            {width:1*100,height:2/3*100},
            {width:1/3*100,height:1/3*100},
            {width:1/3*100,height:1/3*100},
            {width:1/3*100,height:1/3*100},
          ]
        }
      },

      _l4_3: {
        getScore(imgs) {
          let img1Score = Layouts._getCroppedPixel(imgs[0].width, imgs[0].height, 2/3, 1)
          let img2Score = Layouts._getCroppedPixel(imgs[1].width, imgs[1].height, 1/3, 1/3)
          let img3Score = Layouts._getCroppedPixel(imgs[2].width, imgs[2].height, 1/3, 1/3)
          let img4Score = Layouts._getCroppedPixel(imgs[3].width, imgs[3].height, 1/3, 1/3)
          return img1Score + img2Score + img3Score + img4Score;
        },
        getParams() {
          return [
            {width:2/3*100,height:1*100},
            {width:1/3*100,height:1/3*100},
            {width:1/3*100,height:1/3*100},
            {width:1/3*100,height:1/3*100},
          ]
        }
      },

      _getCroppedPixel(imgWidth, imgHeight, cWidth, cHeight) {
        let rw = (imgWidth * (cHeight))/imgHeight;
        if(rw >= cWidth) return rw - cWidth
        return ((imgHeight * cWidth)/imgWidth) - cHeight;
      },
}


export default Layouts
