(function(global) {
  class coolcat extends NIN.Node {
    constructor(id) {
      super(id, {
        outputs: {
          render: new NIN.Output()
        }
      });

      this.output = {
        canvas: document.createElement('canvas'),
        x: 635 - 960,
        y: 471 - 540,
        zoom: 4,
        rotation: -43.66 / 360 * Math.PI * 2,
      };
      this.outputs.render.setValue(this.output);

      this.ctx = this.output.canvas.getContext('2d');
      this.resize();

      this.imageElement = document.createElement('img');
      Loader.load('res/coolcat.png', this.imageElement, () => null);
    }

    update(frame) {
      super.update(frame);
      this.frame = frame;
    }

    resize() {
      this.output.canvas.width = 16 * GU;
      this.output.canvas.height = 9 * GU;
    }

    render() {
      this.ctx.save();
      this.ctx.scale(16 * GU / 1920, 16 * GU /  1920);
      this.ctx.translate(1920 / 2, 1080 / 2);

      this.ctx.drawImage(this.imageElement, -1920 / 2, -1080 / 2);

      this.ctx.restore();
    }
  }

  global.coolcat = coolcat;
})(this);
