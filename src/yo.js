(function(global) {
  class yo extends NIN.THREENode {
    constructor(id) {
      super(id, {
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;

      this.images = [{
        path: 'res/city.jpg' ,
        x: 720 + 1920 / 8 - 1920 / 2,
        y: 405 + 1080 / 8 - 1080 / 2,
        zoom: 4,
        rotation: 0,
      }, {
        path: 'res/sun.jpg' ,
        x: 480 - 1920 / 2,
        y: 453 - 1080 / 2,
        zoom: 4,
        rotation: 0,
      }, {
        path: 'res/cube.jpg' ,
        x: 1033 - 960,
        y: 513 - 540,
        zoom: 4,
        rotation: 29.87 / 360 * Math. PI * 2,
      }, {
        path: 'res/graph.jpg' ,
        x: 989 - 960,
        y: 745 - 540,
        zoom: 4,
        rotation: 0,
      }, {
        path: 'res/face.jpg' ,
        x: 960 - 960,
        y: 644 - 540 + 20,
        zoom: 100 / 15.52,
        rotation: 0,
      }, {
        path: 'res/teeth.jpg' ,
        x: 1169 - 960,
        y: 406 - 540,
        zoom: 4,
        rotation: Math.PI * 2 + -185.93 / 360 * Math.PI * 2,
      }, {
        path: 'res/cocktail.jpg' ,
        x: 412 - 960,
        y: 681 - 540,
        zoom: 4,
        rotation: -21.27 / 360 * Math.PI * 2,
      }, {
        path: 'res/snake.jpg',
        x: 0,
        y: 0,
        zoom: 4,
        rotation: 0,
      }];
      for(let image of this.images) {
        image.element = document.createElement('img');
        Loader.load(image.path, image.element, () => null);
      }
    }

    update(frame) {
      super.update(frame);
      this.frame = frame;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
    }

    render() {

      this.ctx.save();
      this.ctx.scale(16 * GU / 1920, 16 * GU /  1920);
      this.ctx.translate(1920 / 2, 1080 / 2);

      this.ctx.save();
      const progress = this.frame / 400;
      const t = progress % 1;
      const currentImage = this.images[progress | 0];
      const nextImage = this.images[(progress + 1) | 0];
      const x = lerp(0, currentImage.x, t);
      const y = lerp(0, currentImage.y, t);
      const zoom = lerp(1, currentImage.zoom, Math.pow(2, 1 + t) / 2 - 1);

      const rotation = lerp(0, currentImage.rotation, t);

      this.ctx.rotate(rotation);
      this.ctx.translate(-x * zoom, -y * zoom);
      this.ctx.scale(zoom, zoom);


      this.ctx.drawImage(currentImage.element, -1920 / 2, -1080 / 2);

      this.ctx.scale(1 / currentImage.zoom, 1 / currentImage.zoom);
      this.ctx.translate(currentImage.x * currentImage.zoom, currentImage.y * currentImage.zoom);
      this.ctx.rotate(-currentImage.rotation);

      this.ctx.drawImage(nextImage.element, -1920 / 2, -1080 / 2);

      this.ctx.restore();
      this.ctx.restore();

      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.yo = yo;
})(this);
