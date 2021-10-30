import glslify from "glslify";

export const fragment = () => {
  return glslify`
    precision mediump float;
    
        varying vec3 vVertexPosition;
        varying vec2 vTextureMatrixCoord;
    
        uniform sampler2D planeTexture;
    
        void main() {
            // just display our texture
            gl_FragColor = texture2D(planeTexture, vTextureMatrixCoord);
        }
    
`;
};

export const rgbFs = () => {
  return glslify`
    precision mediump float;
    
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
    
        uniform sampler2D uRenderTexture;
    
        uniform float uScrollEffect;
    
        void main() {
            vec2 textureCoords = vTextureCoord;
            
            // These contils colors and how muct it will strech
            vec2 redTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 400.0);
            vec2 greenTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 500.0);
            vec2 blueTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 600.0);
    
            vec4 red = texture2D(uRenderTexture, redTextCoords);
            vec4 green = texture2D(uRenderTexture, greenTextCoords);
            vec4 blue = texture2D(uRenderTexture, blueTextCoords);
    
            vec4 finalColor = vec4(red.r, green.g, blue.b, min(1.0, red.a + blue.a + green.a));
            gl_FragColor = finalColor;
        }
  `;
};

export const blurFs = () => {
    return glslify`
    precision mediump float;
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D uRenderTexture;

    uniform float uScrollEffect;
    uniform vec2 uResolution;


    vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
        vec4 color = vec4(0.0);
        vec2 off1 = vec2(1.3333333333333333) * direction;
        color += texture2D(image, uv) * 0.29411764705882354;
        color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
        color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
        return color;
    }

    void main() {
        vec4 original = texture2D(uRenderTexture, vTextureCoord);
        vec4 blur = blur5(uRenderTexture, vTextureCoord, uResolution, vec2(0.0, 1.0));

        gl_FragColor = mix(original, blur, min(1.0, abs(uScrollEffect) / 5.0));
    }
    `;
  };