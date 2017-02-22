# react-smart-gallery [![npm](https://img.shields.io/npm/v/react-smart-gallery.svg?maxAge=000)](https://www.npmjs.com/package/react-smart-gallery) [![npm](https://img.shields.io/npm/dm/react-smart-gallery.svg?maxAge=000)](https://www.npmjs.com/package/react-smart-gallery)

Gallery to render images based on optimal layout, just like facebook render images inside timeline.

**Demo:**  https://gauravchl.github.io/react-smart-gallery/demo/

<img width="350" alt="screen shot 2017-02-22 at 11 46 55 pm" src="https://cloud.githubusercontent.com/assets/3471415/23225853/7c2aea42-f959-11e6-8281-e10069c17c1e.png">
<img width="350" alt="screen shot 2017-02-22 at 11 48 15 pm" src="https://cloud.githubusercontent.com/assets/3471415/23225854/7c30d9b6-f959-11e6-8ddd-58d61be49625.png">


**Install:**
```
npm install react-smart-gallery
```

**Use:**
```html
import SmartGallery from 'react-smart-gallery';

const images = [
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
];

<SmartGallery images={images} />
```
**Props:**

Props | Type | Description
------|------ | -------------
images    | [string] | Array of image source url
rootStyle | object | Style for root element
width     | number | Width of gallery box (default 500)
height    | number | Height of gallery box (default 500)
onImageSelect | function | Called when user click on any image item. e.g. `function(event, src) {window.open(src)}`



** More Examples:**

[with custom width and height]

```html
import SmartGallery from 'react-smart-gallery';

const images = [
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
];

<SmartGallery width={800} height={800} images={images} />

```

[with custom style and callback]

```html
import SmartGallery from 'react-smart-gallery';

const images = [
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
  https://source.unsplash.com/random/400x400,
];

<SmartGallery
  rootStyle={{boxShadow: '2px 2px 4px #000'}}
  images={images}
  onImageSelect={(event, src) => window.open(src)}
/>

```

**Contributing:**

Please feel free to submit any bugs or suggestions as issues. Pull requests are welcome.
To build package locally run following commands which will build the package from source and will update the demo inside `/react-smart-gallery/demo/`.

  ```
  cd /react-smart-gallery/
  npm install
  npm run build
  ```



  **TODOs:**
  - Update `props.images` to support array of objects, Send image's width and height along with src within this props to improve performance.
  - Add new prop `imageStyle` to style the image element
