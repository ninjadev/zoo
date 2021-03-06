uniform float frame;
uniform float zoom;
uniform sampler2D tDiffuse;
uniform float x;
uniform float y;
uniform float throb;
uniform float zoomThrob;

varying vec2 vUv;

void main() {

    vec2 zoomUv = vUv - 0.5;

    zoomUv *= 1. - zoomThrob * 0.01;

    vec3 color = texture2D(tDiffuse, zoomUv + 0.5).rgb;

    float startTimer = smoothstep(0., 1., (frame - 91.) / 184.);
    float startTimer2 = clamp((frame - 345.) / (368. - 345.), 0., 1.);
    

    vec3 yellow = vec3(238., 221., 165.) / 255.;
    vec3 black = vec3(0.);

    vec3 startColor;
    if(vUv.x > vUv.y - 0.35) {
        startColor = black;
    } else {
        startColor = mix(yellow, black, (color.r + color.g + color.b) / 3. * 10.);
    }

    color = mix(startColor, color, startTimer2 * startTimer2 * startTimer2 * startTimer2 * startTimer2 * startTimer2 * startTimer2);
    color = mix(vec3(0.), color, startTimer);

    gl_FragColor = vec4(color, 1.);
}
