//retrieve the vUv varying
varying vec2 vUv;

void main()
{
    //replace the x and y with vUv
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0);

    //Pattern 2 - gradient from left to right
    // float strenght = vUv.x;

    //Pattern 3 - gradient from bottom to the top
    // float strenght = vUv.y;

    //Pattern 4 - gradient from top to the bottom
    // float strenght = 1.0 - vUv.y;

    // //Pattern 5 - 
    // float strenght = vUv.y * 10.0;

    //Pattern 6 - 
    // float strenght = mod(vUv.y * 10.0, 1.0);

    // //Pattern 7 - 
    // float strenght = mod(vUv.y * 10.0, 1.0);
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght = step(0.5, strenght);

    // //Pattern 8 - 
    // float strenght = mod(vUv.x * 10.0, 1.0);
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght = step(0.5, strenght);

    //Pattern 9 - my own pattern LOL
    // float strenght = mod((vUv.x * 10.0) * (vUv.y * 10.0), 1.0);
    // // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght = step(0.5, strenght);

    // //Pattern 10 -tic tac toe lookalike
    // float strenght = step(0.8, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght += step(0.8, mod((vUv.y * 10.0) , 1.0));

    //Pattern 11 -
    // float strenght = step(0.8, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght *= step(0.8, mod((vUv.y * 10.0) , 1.0));

    //Pattern 12 -
    // float strenght = step(0.4, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // strenght *= step(0.8, mod((vUv.y * 10.0) , 1.0));

    //Pattern 13 -
    // float barX = step(0.4, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // barX *= step(0.8, mod((vUv.y * 10.0) , 1.0));

    // float barY = step(0.8, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // barY *= step(0.4, mod((vUv.y * 10.0) , 1.0));

    // float strenght = barX + barY;

    //Pattern 14 -
    float barX = step(0.4, mod((vUv.x * 10.0) , 1.0));
    //do not use if statements in  glsl as it is bad for porformance, use step() method
    barX *= step(0.8, mod((vUv.y * 10.0 + 0.25) , 1.0));

    float barY = step(0.8, mod((vUv.x * 10.0 + 0.25) , 1.0));
    //do not use if statements in  glsl as it is bad for porformance, use step() method
    barY *= step(0.4, mod((vUv.y * 10.0) , 1.0));

    float strenght = barX + barY;

    gl_FragColor = vec4(strenght, strenght, strenght, 1.0);
}