import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// 1. Obtener el elemento canvas por su ID
const miCanvas = document.getElementById('mi-canvas-id');

const scene = new THREE.Scene();

const backgroundColor = 0x0b0c10; // Dark background color
scene.background = new THREE.Color( backgroundColor );

// 2. IMPORTANTE: Activar alpha: true para que el fondo de Three.js sea transparente
const renderer = new THREE.WebGLRenderer({ 
    canvas: miCanvas, 
    alpha: true 
});

// 3. Usar el tamaño estático (200x200) definido en tu HTML en lugar de window.innerWidth
const ancho = miCanvas.width;   // Tomará los 200 de tu HTML
const alto = miCanvas.height;   // Tomará los 200 de tu HTML

renderer.setSize(ancho, alto);

// 4. Asegurar que la cámara tenga la misma relación de aspecto cuadrada (200/200 = 1)
const camera = new THREE.PerspectiveCamera(75, ancho / alto, 0.1, 1000);
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 10, 300 );
pointLight.position.set( 6, 2, 0 );
scene.add( pointLight );
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, -1.5, 9 );
controls.update();

// Grid  Helper
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// Axes Helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate( time ) {
  renderer.render( scene, camera );
  controls.update();
}

// 2. Handle Responsive Resizing
function onWindowResize() {
  // Update camera aspect ratio based on the new container bounds
  camera.aspect = window.innerWidth / window.innerHeight;
  
  // Crucial: Update the projection matrix to apply changes
  camera.updateProjectionMatrix();

  // Update renderer size and pixel ratio
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// 3. Listen for the resize event
window.addEventListener('resize', onWindowResize);



// ************************************************
// **************** OBJ Loader ********************
  const objLoader = new OBJLoader();
  

   const mtlLoader = new MTLLoader();
  mtlLoader.load('./models/obj-mtl/avion.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('./models/obj-mtl/avion.obj', (root) => {
    scene.add(root);
  });
  });

// ************************************************
// **************** GLTF Loader ********************
   const gltfLoader = new GLTFLoader();
    const url = './models/gltf/avionAzul.gltf';
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        //scene.add(root);

        //root.position.set(0, 0, 8);
    });