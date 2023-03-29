//retrieve the vUv varying
varying vec2 vUv;

void main()
{
    //replace the x and y with vUv
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0);
    //
    gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
}