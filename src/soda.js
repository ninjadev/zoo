(function(global) {
  class soda extends ImageNode {
    getImageName() {
      return 'res/soda.png';
    }

    constructor(id) {
      super(id);

      this.startStarShootFrame = 3138;
      // shoots in clockwise, starting from top left
      this.shoot1 = {x: 1048, y: 161};
      this.shoot2 = {x: 1083, y: 141};
      this.shoot3 = {x: 1113, y: 183};
      this.shoot4 = {x: 1092, y: 213};
      this.shoot5 = {x: 1052, y: 201};
    }

    update(frame) {
      super.update(frame);

      const beans = [
        1, 21, 33, 45, 49, 57, 69, 81,
        97, 117, 129, 141, 145, 153, 165, 169, 177, 181, 189,
        193, 201, 203, 205, 213, 225, 237, 241, 249, 261, 273, 285,
        289, 301, 321, 325, 333, 337, 345, 357, 361, 369, 373, 381,
      ];

      if (BEAT && beans.includes((BEAN - 192) % 384)) {
        this.throb = 1.18;
      } else {
        this.throb = Math.max(1, this.throb - .007);
      }
    }

    render() {
      super.render();
      this.ctx.save();
      this.ctx.scale(this.canvas.width / 1920, this.canvas.width / 1920);

    	// star animation!
    	// Start BEAN 1632 / frame 3138
    	// end BEAN 2000 / frame 3779
    	if (BEAN >= 1632){
    		const frameInAnimation = (this.frame - this.startStarShootFrame) % 100
        const move = lerp(0, 1, frameInAnimation / 70);
        const seeThrough = easeIn(1, 0, frameInAnimation / 70);
        this.ctx.fillStyle = "rgba(238,221,165," + seeThrough + ")";
        this.ctx.save();
        this.ctx.translate(1078, 178);
        this.ctx.save();
        // left
        this.ctx.rotate(0.869);
        this.ctx.fillRect(0,52+(100 * move),10, 100*move);
        this.ctx.restore();
        this.ctx.save();
        // top left
        this.ctx.rotate(2.3);
        this.ctx.fillRect(0,52+(100 * move),10, 100*move);
        this.ctx.restore();
        this.ctx.save();
        // top right
        this.ctx.rotate(3.52);
        this.ctx.fillRect(0,52+(100 * move),10, 100*move);
        this.ctx.restore();
        this.ctx.save();
        // right
        this.ctx.rotate(4.8);
        this.ctx.fillRect(0,52+(100 * move),10, 100*move);
        this.ctx.restore();
        this.ctx.save();
        // bottom
        this.ctx.rotate(5.96);
        this.ctx.fillRect(0,52+(100 * move),10, 100*move);
        this.ctx.restore();
        this.ctx.restore();

    	}

    	// top left star corner 1048 x 161

    	// top right 1083 x 141

    	// right 1113 x 183

    	// bottom 1092 x 213

    	// left 1052 x 201

      this.ctx.restore();

      const scale = this.throb;

      this.beatRegions = [
        {x: 735, y: 756, width: 98, height: 105, rotation: -.1},
        {x: 528, y: 475, width: 140, height: 107, rotation: .06},
        {x: 174, y: 129, width: 158, height: 141, rotation: -.05},
        {x: 1517, y: 626, width: 66, height: 69, rotation: .04},
      ];

      for (const beatRegion of this.beatRegions) {
        this.ctx.save();
        this.ctx.translate(beatRegion.x + beatRegion.width / 2, beatRegion.y + beatRegion.height / 2);
        this.ctx.rotate(beatRegion.rotation);
        this.ctx.drawImage(
          this.imageElement,
          beatRegion.x, beatRegion.y,
          beatRegion.width, beatRegion.height,
          -beatRegion.width / 2 * scale, -beatRegion.height / 2 * scale,
          beatRegion.width * scale, beatRegion.height * scale
        );
        this.ctx.restore();
      }

      this.ctx.restore();
    }
  }

  global.soda = soda;
})(this);
