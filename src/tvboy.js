(function(global) {
  class tvboy extends NIN.Node {
    constructor(id) {
      super(id, {
        outputs: {
          render: new NIN.Output()
        }
      });

      this.output = {
        canvas: document.createElement('canvas'),
        x: 0,
        y: 0,
        zoom: 4,
        rotation: Math.PI,
      };
      this.outputs.render.setValue(this.output);

      this.ctx = this.output.canvas.getContext('2d');
      this.resize();

      this.imageElement = document.createElement('img');
      Loader.load('res/tvboy.png', this.imageElement, () => null);
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
      this.ctx.drawImage(this.imageElement, 0, 0);

      const doubleColonialWhite = '#eedda5';
      this.ctx.fillStyle = doubleColonialWhite;

      this.ctx.beginPath();
      this.ctx.ellipse(862,
                       338,
                       45,
                       35,
                       0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.ellipse(1089,
                       332,
                       45,
                       35,
                       0, 0, Math.PI * 2);
      this.ctx.fill();

      const open = easeIn(0, 35, (this.frame - 3860) / 25);

      this.ctx.drawImage(
        this.imageElement,
        862 - 45/2, 338 - 35/2,
        45, 35,
        862 - 45/2, 338 - open/2,
        45, open
      );

      this.ctx.drawImage(
        this.imageElement,
        1089 - 45/2, 332 - 35/2,
        45, 35,
        1089 - 45/2, 332 - open/2,
        45, open
      );

      this.ctx.restore();
    }
  }

  global.tvboy = tvboy;
})(this);
