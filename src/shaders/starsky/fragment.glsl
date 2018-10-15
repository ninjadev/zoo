uniform float frame;
uniform sampler2D background;

varying vec2 vUv;

#define PI 3.14159265


float starsky(vec2 uv) {
    uv *= 200.;
    return max(0., sin(uv.x) * sin(uv.y) * 10. - 9.) + 0.2;
}

void main() {
  vec4 background = texture2D(background, vUv);

  vec3 color = background.rgb;

  vec2 coords = vUv - vec2(0.5, -0.5);
  float angle = -frame / 5000.;
  coords = vec2(coords.x * cos(angle) - coords.y * sin(angle),
                coords.x * sin(angle) + coords.y * cos(angle));
  float stars = starsky(coords);

  color = 
  mix(
      color,
      mix(color, color * stars, step(color.b, 0.9)),
      smoothstep(0., 1., (frame - 691.) / (737. - 691.)));
  
  gl_FragColor = vec4(color, 1.);
}
