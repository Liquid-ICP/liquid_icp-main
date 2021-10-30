import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger)



export const addGLFModel = (
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    gltfModelPath: string,
    canvasQuerySelector?: string) => {


    //============================ ENV
    let envmapLoader = new THREE.PMREMGenerator(renderer)




    //============================ MESH AND GEOMETRY
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.3.6/');
    loader.setDRACOLoader(dracoLoader);


    new RGBELoader().setPath("/hdr_textures/").load("HDRI.hdr", (hdrmap: any) => {
        let envmap = envmapLoader.fromCubemap(hdrmap)

        const normalMapTexture = new THREE.TextureLoader().load('/textures/normals.jpg')
        const logoMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            roughness: 0.15,
            normalMap: normalMapTexture,
            normalScale: new THREE.Vector2(0.2, 0.2),
            emissive: 0x3357FA,
            emissiveIntensity: 0.005,
            envMap: envmap.texture,
            envMapIntensity: 10,
            side: THREE.DoubleSide,
        });

        loader.load(
            gltfModelPath,
            (gltf) => {
                scene.add(gltf.scene);
                gltf.scene.traverse((child: THREE.Object3D) => {
                    if ((child as THREE.Mesh).isMesh) {
                        (child as THREE.Mesh).material = logoMaterial;
                        (child as THREE.Mesh).castShadow = true;
                        (child as THREE.Mesh).receiveShadow = true;
                        gsap.to(child.children[0], {
                            x: 100,
                            duration: 10
                        })
                    }
                })
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                if (xhr.loaded > 9000 && canvasQuerySelector) {
                    (document.querySelector(canvasQuerySelector) as HTMLElement).style.backgroundImage = "none";
                }
                console.log(xhr.loaded);
            },
            (error) => {
                console.error('An error happened');
                console.error(error);
            }
        );
    })
}