//retrieve the vUv varying
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

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
    // float barX = step(0.4, mod((vUv.x * 10.0) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // barX *= step(0.8, mod((vUv.y * 10.0 + 0.2) , 1.0));

    // float barY = step(0.8, mod((vUv.x * 10.0 + 0.2) , 1.0));
    // //do not use if statements in  glsl as it is bad for porformance, use step() method
    // barY *= step(0.4, mod((vUv.y * 10.0) , 1.0));

    // float strenght = barX + barY;

    //Pattern 15
    // float strenght = abs(vUv.x - 0.5);

    //Pattern 16
    // float strenght = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    //Pattern 17
    // float strenght = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    //Pattern 18
    // float strenght = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    //if you want to make a frame

    //Pattern 19
    //black square inside a white square patters
    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strenght = square1 * square2;

    //Pattern 20
    // float strenght = floor(vUv.x * 10.0) / 10.0;

    //Pattern 21
    // float strenght = floor(vUv.x * 10.0) / 10.0;
    // strenght *= floor(vUv.y * 10.0) / 10.0;

    //Pattern 22
    // float strenght = random(vUv);

    //Pattern 23
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) /10.0, floor(vUv.y * 10.0) /10.0);
    // float strenght = random(gridUv);

    // //Pattern 23
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) /10.0, 
    //     floor(vUv.y * 10.0 + vUv.x * 8.0) /10.0);
    // float strenght = random(gridUv);

    //Pattern 24
    float strenght = length(vUv);

    gl_FragColor = vec4(strenght, strenght, strenght, 1.0);
}