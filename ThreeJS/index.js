import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'https://cdn.skypack.dev/gsap'

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 13

const scene = new THREE.Scene();
let allay;
let mixer;

const loader = new GLTFLoader();
loader.load('/allay_redesigned.glb',
    function (gltf) {
        allay = gltf.scene;
        allay.position.y = -0.5;
        allay.rotation.y = 1.4;
        scene.add(allay)

        mixer = new THREE.AnimationMixer(allay);
        mixer.clipAction(gltf.animations[1]).play();
        // console.log(gltf.animations)
    }, function (xhr) {

    }, function (error) {

    }
)

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3d').appendChild(renderer.domElement)

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight)

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);

const rerender3D = () => {
    requestAnimationFrame(rerender3D);
    renderer.render(scene, camera)
    if (mixer) mixer.update(0.02)
}
rerender3D();

//position
let state = [
    { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    { position: { x: 0, y: 0, z: -3 }, rotation: { x: 0, y: 0, z: 0 } },
    { position: { x: 0, y: 0, z: 3 }, rotation: { x: 0, y: 0, z: 0 } }
]
let index = 0
function animationCustom(){
    gsap.to(allay.position, {
        x: state[index].position.x,
        y: state[index].position.y,
        z: state[index].position.z,
        duration:1,
        ease:"power1.out"
    }
)
gsap.to(allay.rotation, {
    x: state[index].rotation.x,
    y: state[index].rotation.y,
    z: state[index].rotation.z,
    duration:1,
    ease:"power1.out"
}
)
index++;
if(index==state.length)
    index=0;
}

setInterval(() => {
    animationCustom()
}, 4000)