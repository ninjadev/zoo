uniform float frame;
uniform sampler2D background;

varying vec2 vUv;

#define PI 3.14159265

float starsky(vec2 uv) {
    uv *= 100.;
    return pow(max(0., sin(uv.x) * sin(uv.y) * 10. - 9.), 0.25);
}

float circle(vec2 p, float r) {
    return step(sqrt(p.x * p.x + p.y * p.y), r);

}

void main() {
  vec4 background = texture2D(background, vUv);

  vec3 color = background.rgb;

  vec2 coords = vUv - .5;
  float angle = -frame / 2000.;
  coords = (coords + 4. * vec2(1666. - 960., -527. + 540.) / vec2(1920., 1080.));
  coords *= vec2(16. / 9., 1.);
  coords *= 0.25;
  coords += vec2(0., 1.);
  coords = vec2(coords.x * cos(angle) - coords.y * sin(angle),
                coords.x * sin(angle) + coords.y * cos(angle));

  float stars = starsky(coords);

  stars = clamp(stars + circle((vUv - vec2(0.5)) * vec2(16. / 9., .5) + vec2(0.,
  1.0299 + 0.065 - mix(0., 0.065, pow(clamp((frame - 1031. + 20.) / 20., 0., 1.), 5.))
  ), 1.), 0., 1.);

  vec3 yellow = vec3(238., 221., 165.) / 255.;
  vec3 brown = vec3(82., 46., 34.) / 255.;
  vec3 starColor = mix(brown, yellow, stars);

  if(frame < 5000.) {
      color = 
      mix(
          color,
          mix(color, starColor, 1. - background.a),
          pow(clamp((frame - 714.) / (737. - 714.), 0., 1.), 3.));
  } else {
      color = mix(color, yellow, 1. - background.a);
    }
  
  gl_FragColor = vec4(color, 1.);
}
