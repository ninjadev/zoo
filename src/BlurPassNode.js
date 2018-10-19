(function(global) {
  class BlurPassNode extends NIN.ShaderNode {
    constructor(id, options) {
      const kernelSize = 25;
      const sigma = 4.0;

      const convolutionShader = THREE.ConvolutionShader;
      options.shader = {
        uniforms: convolutionShader.uniforms,
        vertexShader:  convolutionShader.vertexShader,
        fragmentShader: convolutionShader.fragmentShader,
        defines: {
          KERNEL_SIZE_FLOAT: kernelSize.toFixed(1),
          KERNEL_SIZE_INT: kernelSize.toFixed(0)
        }
      };
      options.inputs = {
        tDiffuse: new NIN.TextureInput()
      };
      super(id, options);
      this.renderTarget.minFilter = THREE.NearestFilter;
      this.renderTarget.magFilter = THREE.NearestFilter;
      if(options.direction == 'x') {
        this.uniforms.uImageIncrement.value = new THREE.Vector2(0.001953125, 0.0);
      } else {
        this.uniforms.uImageIncrement.value = new THREE.Vector2(0.0, 0.001953125);
      }
      this.uniforms.cKernel.value = THREE.ConvolutionShader.buildKernel(sigma);
      this.resize();
    }

    resize() {
      this.renderTarget.setSize(16 * 2, 9 * 2);
    }

    update() {
      this.uniforms.tDiffuse.value = this.inputs.tDiffuse.getValue();
    }
  }

  global.BlurPassNode = BlurPassNode;
})(this);