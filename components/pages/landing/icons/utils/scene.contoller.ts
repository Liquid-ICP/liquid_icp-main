import * as THREE from 'three';
import { gsap } from "gsap"

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { UnrealBloomPass } from '3d_party/ TransparentBackgroundFixedUnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';



export const createScene = (scale: number, elementQueryString: string) => {
    let mouse = { x: 0, y: 0 }
    let ppEnabled = false
    // let ppEnabled = window.innerWidth > 750
    let composer
    const postProcessingParams = {
        exposure: 5,
        bloomStrength: 0.5,
        bloomThreshold: 0,
        bloomRadius: 1.2
    };



    const canvas = document.querySelector(elementQueryString) as HTMLElement;



    const sizes = {
        width: window.innerWidth * scale,
        height: window.innerWidth * scale
    }


    //============================ SCENE
    const scene = new THREE.Scene();
    if (ppEnabled)
        scene.background = new THREE.Color('#020202');


    scene.fog = new THREE.Fog(0x000000, 10, 20);





    //============================ LIGHT
    const light = new THREE.DirectionalLight(0x1253FE, 5);
    light.position.set(0, 1, 0); //default; light shining from top
    light.castShadow = true; // default false
    scene.add(light);


    let pointLigtht1 = new THREE.PointLight(0xE05289, 10);
    pointLigtht1.position.set(10, 10, 10);
    pointLigtht1.castShadow = true
    scene.add(pointLigtht1)

    let pointLigtht2 = new THREE.PointLight(0x3357FA, 10);
    pointLigtht2.position.set(-10, 5, 0);
    pointLigtht2.castShadow = true
    scene.add(pointLigtht2)

    let pointLigtht3 = new THREE.PointLight(0x3357FA, 10);
    pointLigtht3.position.set(0, 5, 0);
    pointLigtht3.castShadow = true
    pointLigtht3.scale.set(10, 0, 10);

    scene.add(pointLigtht3)

    var lighth = new THREE.HemisphereLight(0xf6e86d, 0x404040, 15);
    scene.add(lighth);






    //============================ CAMERA
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.width, 0.01, 1000);
    camera.position.set(0, 0, .7);
    scene.add(camera)





    //============================ RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: false, })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setSize(sizes.width, sizes.height);


    let parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
    let renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, parameters);




    //============================ POSTPROCESSING 
    if (ppEnabled) {
        composer = new EffectComposer(renderer, renderTarget);
        const renderPass = new RenderPass(scene, camera);
        renderPass.clear = false
        renderPass.clearAlpha = 0
        renderPass.renderToScreen = false

        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 4, 1, 0.1);
        bloomPass.threshold = postProcessingParams.bloomThreshold;
        bloomPass.strength = postProcessingParams.bloomStrength;
        bloomPass.radius = postProcessingParams.bloomRadius;

        composer.addPass(gammaCorrectionPass);
        composer.addPass(renderPass);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
    }





    //============================ RESIZE
    window.addEventListener("resize", () => {
        // if (window.innerWidth > 400) {
        //     sizes.width = window.innerWidth * scale;
        //     sizes.height = window.innerWidth * scale;
        // }

        // sizes.width = sizes.width;
        // sizes.height = sizes.width;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


        if (ppEnabled) {
            composer.setSize(sizes.width, sizes.height);
            composer.setSize(window.innerWidth, window.innerHeight);
        }
    })




    // const controls = new OrbitControls(camera, (canvas as HTMLElement));
    // controls.enableDamping = true


    //  MOUSEMOVE EVENT
    window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / sizes.width) * .8 - 1;
        mouse.y = - (e.clientY / sizes.height) * 1.5 + 1;
    })


    const animate = () => {
        // controls.update();

        if (scene.children) {
            const el = scene.children.find(el => el.type == "Group");
            if (el) {
                if (window.innerWidth < 550) {
                    el!.rotation.y += 0.01
                    el!.rotation.x += 0.01
                    el!.rotation.z += 0.01
                } else {
                    gsap.to(el!.rotation, { y: mouse.x });
                    gsap.to(el!.rotation, { x: mouse.y });
                }
            }


        }




        renderer.clear();
        if (ppEnabled) {
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
    }
    animate()
    renderer.clear();


    return { scene, camera, renderer };
}