import { useEffect, useState } from "react";
import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

//import{ fragment } from "./shaders/fragmentShader";
//import{ vertex } from "./shaders/vertexShader";



// COMPONENETS
import Button from "components/lib/button/Button"
import Loading from '../../../global/Loading/Loading';
import ColorBalls from "components/lib/ColorBalls/ColorBalls";





const Hero = () => {
    // const [ready, setReady] = useState(false)
    // const [loadedElements, setLoadedElements] = useState(0)
    let _logo
    let _town
    
    // let _cameraLook = {
    //     isLooking: true
    // }

    // const _globalTimeline = gsap.timeline()
    let readyForMouse = false;
    const [cursor,] = useState({ x: 0, y: 0 })




    useEffect(() => {
        init();
    }, []);





    const init = () => {
        // const pane: any = new Pane();

        // const PARAMS = {
        //     c_location_x: 9.5,
        //     c_location_y: 6.45,
        //     c_location_z: 8,
        //     c_rotation_x: 0,
        //     c_rotation_y: 0,
        //     c_rotation_z: 0,
        // };


        // pane.addInput(
        //     PARAMS, 'c_location_x',
        //     { min: -20, max: 50, step: 0.05 },
        // );
        // pane.addInput(
        //     PARAMS, 'c_location_y',
        //     { min: -20, max: 50, step: 0.05 },
        // );
        // pane.addInput(
        //     PARAMS, 'c_location_z',
        //     { min: -20, max: 50, step: 0.05 },
        // );


        // pane.addInput(
        //     PARAMS, 'c_rotation_x',
        //     { min: -10, max: 10, step: 0.01 },
        // );
        // pane.addInput(
        //     PARAMS, 'c_rotation_y',
        //     { min: -10, max: 10, step: 0.01 },
        // );
        // pane.addInput(
        //     PARAMS, 'c_rotation_z',
        //     { min: -10, max: 10, step: 0.01 },
        // );




        //! TODO: get rid of leva 
        const canvas = document.querySelector(".hero_landing_canvas") as HTMLElement;


        const sizes = {
            width: window.innerWidth,
            height: window.innerWidth < 750 ? window.innerHeight * .5 : window.innerHeight
        }

        const postProcessingParams = {
            exposure: 5,
            bloomStrength: 0.5,
            bloomThreshold: 0,
            bloomRadius: 1.2
        };





        //============================ SCENE
        const scene = new THREE.Scene();
        // const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--black_-1')

        // scene.background = new THREE.Color('#00000000');
        scene.background = new THREE.Color('#000000');

        // scene.fog = new THREE.Fog(0x000000, 10, 20);








        //============================ CAMERA
        const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.01, 1000);
        camera.position.set(0, 1.10, -3.45);
        camera.focus = 1;


        // camera.position.set(PARAMS.c_location_x, PARAMS.c_location_y, PARAMS.c_location_z);
        // camera.rotation.set(PARAMS.c_rotation_x, PARAMS.c_rotation_y, PARAMS.c_rotation_z)
        camera.position.set(0, 1, 3.5)
        scene.add(camera)



        //============================ RENDERER
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: false, })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor(0x000000, 0);

        let parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
        let renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, parameters);


        //============================ POSTPROCESSING 
        let composer = new EffectComposer(renderer, renderTarget);
        const renderPass = new RenderPass(scene, camera);
        renderPass.clear = false
        renderPass.clearAlpha = 0


        composer.addPass(renderPass);
        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 1.5, 0.4, 0.85);
        bloomPass.threshold = postProcessingParams.bloomThreshold;
        bloomPass.strength = postProcessingParams.bloomStrength;
        bloomPass.radius = postProcessingParams.bloomRadius;

        composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);






        //============================ LIGHT
        var lighth = new THREE.HemisphereLight(0xf6e86d, 0x404040, 15);
        scene.add(lighth);









        //============================ ENV
        let envmapLoader = new THREE.PMREMGenerator(renderer)



        //============================ MESH AND GEOMETRY
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.3.6/');
        loader.setDRACOLoader(dracoLoader);







        new RGBELoader().setPath("/hdr_textures/").load("HDRI.hdr", (hdrmap: any) => {
            let envmap = envmapLoader.fromCubemap(hdrmap)
            // scene.background = hdrmap;
            // scene.environment = hdrmap;

            // const roughnessMapTexture = new THREE.TextureLoader().load('/textures/rought.png')
            const normalMapTexture = new THREE.TextureLoader().load('/textures/normals.jpg')
            const townMatterial = new THREE.MeshStandardMaterial({
                color: 0x000000,
                // roughnessMap: roughnessMapTexture,
                roughness: .19,
                normalMap: normalMapTexture,
                normalScale: new THREE.Vector2(0.4, 0.4),
                envMap: envmap.texture,
                envMapIntensity: 10,
                side: THREE.DoubleSide,
            });

            const logoMaterial = new THREE.MeshStandardMaterial({
                color: 0x000000,
                // roughnessMap: roughnessMapTexture,
                roughness: .19,
                // normalMap: normalMapTexture,
                // normalScale: new THREE.Vector2(0.2, 0.2),
                emissive: 0x3357FA,
                emissiveIntensity: 0.005,
                envMap: envmap.texture,
                envMapIntensity: 10,
                side: THREE.DoubleSide,
            });


            loader.load(
                '/3d_models/logo.glb',
                (gltf) => {
                    _logo = gltf.scene
                    gltf.scene.traverse((child: THREE.Object3D) => {
                        if ((child as THREE.Mesh).isMesh) {
                            (child as THREE.Mesh).material = logoMaterial;
                            (child as THREE.Mesh).castShadow = true;
                            (child as THREE.Mesh).receiveShadow = true;
                        }
                    })
                    gltf.scene.position.set(0, 1, 0);
                    gltf.scene.rotation.set(-1.5, 0, 0);
                    gltf.scene.scale.set(2, 2, 2);
                    // camera.lookAt(gltf.scene.position)
                    scene.add(gltf.scene);


                    if (scene.children[2].type == 'Group') {
                        loader.load(
                            '/3d_models/test_test3.glb',
                            (gltf) => {
                                gltf.scene.position.y = -10
                                gltf.scene.traverse((child: THREE.Object3D) => {
                                    if ((child as THREE.Mesh).isMesh) {
                                        (child as THREE.Mesh).material = townMatterial;
                                        (child as THREE.Mesh).castShadow = true;
                                        (child as THREE.Mesh).receiveShadow = true;
                                    }
                                })
                                _town = gltf.scene
                                scene.add(gltf.scene);

                                setTimeout(() => {
                                    gsap.fromTo('.loading',
                                        {
                                            opacity: 1
                                        },
                                        {
                                            duration: 2,
                                            opacity: 0
                                        })
                                    initAnimation()
                                }, 3000);
                            },
                        );
                    }
                },
            );
        })



        const initAnimation = () => {
            // gsap.ticker.lagSmoothing(1)
            const tl = gsap.timeline()

            if (window.innerWidth < 750) {
                tl.fromTo('.animate_UI', {
                    x: 15,
                    opacity: 0,
                }, {
                    x: 0,
                    opacity: 1,
                    duration: .5,
                    stagger: {
                        each: 0.1
                    }
                })
            }


            tl.to(_logo.rotation, {
                x: -1.5,
                y: 0,
                z: Math.PI,
                duration: 3,
                ease: 'none'
            }).add('first_zoom')
                .to(camera.position, {
                    x: 0,
                    y: 2.0,
                    z: 0,
                    duration: 1.5,
                    ease: 'power1.out'
                }, 'first_zoom')
                .to(camera.rotation, {
                    x: -Math.PI / 2,
                    duration: 1.5,
                    delay: .3,
                    ease: 'power4.out'
                }, 'first_zoom')
                .add('camera_out')
                .to(_town.position, {
                    y: -1,
                    duration: 1,
                    ease: 'power4.out'
                }, 'camera_out')
                .to(camera.position, {
                    y: 6.0,
                    x: 0,
                    z: 0,
                    duration: 1.5,
                    delay: .3,
                    ease: 'power4.out'
                }, 'camera_out')
                .to(_logo.rotation, {
                    z: Math.PI * 2,
                    duration: 1.5,
                    ease: 'power3.out'
                }, 'camera_out')


            tl.add('final_scenes')


            if (window.innerWidth < 750) {
                tl.to(camera.rotation, {
                    x: 0,
                    duration: 3,
                    ease: 'circ.out'
                }, 'final_scenes')
                    .to(camera.position, {
                        x: 0,
                        y: 1.10,
                        z: 11.10,
                        duration: 3,
                        ease: 'circ.out'
                    }, 'final_scenes')
            } else {
                tl.to(camera.rotation, {
                    x: 0,
                    duration: 3,
                    ease: 'circ.out'
                }, 'final_scenes')
                    .to(camera.position, {
                        x: -5.85,
                        y: 1.10,
                        z: 11.10,
                        duration: 2.5,
                        ease: 'circ.out'
                    }, 'final_scenes')
                    .to(scene.position, {
                        x: Math.PI / 2,
                        delay: 0,
                        duration: 2,
                    }, 'final_scenes')
                    .fromTo('.animate_UI', {
                        x: 15,
                        opacity: 0,
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: {
                            each: 0.3
                        }
                    })
                    
            }

            tl.add('logo')
            tl.to(_logo.rotation, {
                x: 0,
                duration: 2
            }, 'logo')
                .to(_logo.position, {
                    y: 3,
                    duration: 1
                }, 'logo')
                
                


            // tl.to(_logo.rotation, {
            //     x: 1,
            //     duration: 10,                
            //     repeat: -1
            // })

            tl.fromTo(_logo.rotation, {
                y: 0,
            }, {
                y: Math.PI * 2,
                duration: 8,
                repeat: -1,
                ease: 'none',
            })

            setTimeout(() => {
                readyForMouse = true
            }, 14000);

        }








        //============================ RESIZE
        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerWidth < 750 ? window.innerHeight * .5 : window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            if(window.innerWidth < 750) {
                camera.position.set(0,1.10,11.10)
            }else {
                camera.position.set(-5.85,1.10,11.10)
            }

            renderer.setSize(sizes.width, sizes.height);
            composer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            composer.setSize(window.innerWidth, window.innerHeight);
        })




        //============================  MOUSEMOVE EVENT
        window.addEventListener("mousemove", (e) => {
            cursor.x = (e.clientX / window.innerWidth) * 0.05;
            cursor.y = - (e.clientY / window.innerHeight) * 0.05;
        })


        // const controls = new OrbitControls(camera, (canvas as HTMLElement));
        // controls.enableDamping = true



        


        const animate = () => {
            requestAnimationFrame(animate);
            // if (scene.children[2] && _cameraLook.isLooking) {
            //     // camera.lookAt(scene.children[1].position)
            // }

            // gsap.to()
            
            if(camera && readyForMouse) {
                gsap.to(camera!.rotation, { y: cursor.x });
                gsap.to(camera!.rotation, { x: cursor.y });
            }
            

            // controls.update();
            // camera.position.set(PARAMS.c_location_x, PARAMS.c_location_y, PARAMS.c_location_z);
            // camera.rotation.set(PARAMS.c_rotation_x, PARAMS.c_rotation_y, PARAMS.c_rotation_z);

            composer.render();
            // renderer.render(scene, camera);
            // renderer.clear();
            // const elapsedTime = clock.getElapsedTime();
        }
        animate()
        renderer.clear();
    }







    return (
        <>
            <div className="hero_landing_main">

                <ColorBalls
                    bgColor="var(--red)"
                    left="98%"
                    top="-7%"
                    width="12rem"
                    height="12rem"
                />


                <Loading />
                <div className="hero_landing_container">
                    <canvas className="hero_landing_canvas" />

                    <div className="content">
                        <h1 className="f-size-h2 f-weight-bl animate_UI">
                            Bridge & Stake <br />
                            your ICP coins
                        </h1>
                        <p className="description f-size-p2 f-weight-l animate_UI">
                            Liquid ICP is world's first s-Bridge
                            where bridged and staked assets remain
                            liquid. Fractional reserve is governed
                            by Liquid ICP community and ensures
                            immediate withdrawal of ICP coins at
                            any given time.
                        </p>
                        <div className="button_group animate_UI">
                            <Button
                                disabled={true}
                                size={2.2}
                                className="red_hero_btn f-size-p3 btn btn_gradient">
                                Join IDO
                            </Button>
                            <Button
                                href=""
                                size={2.2}
                                className="red_hero_btn  btn btn_black">

                                <p className="f-size-p3">
                                    s-Bridge Now
                                </p>
                                <h5 className="f-size-p8">
                                    (coming soon)
                                </h5>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}




export default Hero
