import * as THREE from 'three';

import * as CANNON from 'cannon-es'
import CannonUtils from './util.cannonUtils'
import CannonDebugRenderer from './util.cannonDebugRenderer'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { loadCollidersFromJSON } from './func.loadCollidersFromJSON';
import { loadMeshFromJSON } from './func.loadMeshFromJSON';

import { GUI } from 'dat.gui'
import { material_box, material_mesh, material_sphere } from './materials'

// Setup scene
const h_w = window.innerWidth
const h_h = window.innerHeight
const scene    = new THREE.Scene();
const stats    = new Stats()
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container: HTMLElement | null = document.getElementById('app');

if (container != null) {
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.shadowMap.enabled = true
	container.appendChild(renderer.domElement);
	container.appendChild(stats.dom)
}


// Build the GUI
export const ui_settings = {
	wireframe        : false,
	box_color        : '#ff0000',
	mesh_color       : '#00ff00',
	sphere_color     : '#0000ff',
	ambient_intensity: 12,
	direct_intensity : 42, 
};


// Lights
const light_ambient = new THREE.AmbientLight(0x404040, ui_settings.ambient_intensity)
light_ambient.position.set(1, 5, 1)
scene.add(light_ambient)

const light_dir = new THREE.DirectionalLight(0x404040, ui_settings.direct_intensity)
light_dir.castShadow = true
light_dir.shadow.camera.near = 1;
light_dir.shadow.camera.far = 10;
light_dir.position.set(1, 5, 1)
scene.add(light_dir)



// Build the GUI
const gui = new GUI()
const wfFolder = gui.addFolder('View')
wfFolder.open()

// Add a boolean controller to toggle wireframe
wfFolder.add(ui_settings, 'wireframe').name('Wireframe').onChange(function(value) {
	material_mesh.wireframe   = value;
	material_box.wireframe    = value;
	material_sphere.wireframe = value;
});

// Add a color controller for each material
wfFolder.addColor(ui_settings, 'box_color').name('Box Color').onChange(function(value) { material_box.color.set(value); });
wfFolder.addColor(ui_settings, 'mesh_color').name('Mesh Color').onChange(function(value) { material_mesh.color.set(value); });
wfFolder.addColor(ui_settings, 'sphere_color').name('Sphere Color').onChange(function(value) { material_sphere.color.set(value); });

const lFolder = gui.addFolder('Lighting')
lFolder.open()

lFolder.add(ui_settings, 'ambient_intensity', 0, 100).name('Ambient Intensity').onChange(function(value) {
	light_ambient.intensity = value;
});
lFolder.add(ui_settings, 'direct_intensity', 0, 100).name('Direct Intensity').onChange(function(value) {
	light_dir.intensity = value;
});


// Setup camera orbit controls
//const camera   = new THREE.OrthographicCamera(-h_w, h_w, h_h, -h_h, 0.001, 1000);
const camera   = new THREE.PerspectiveCamera(75, (h_w / h_h), 0.1, 1000);
camera.position.set( 16, 8, -8 );


const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(8, 0, 8)
controls.update();


// Add axes helper
const axesHelper = new THREE.AxesHelper( 16 );
scene.add( axesHelper );

// Setup cannon world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Load cannon colliders as MESH from JSON
loadMeshFromJSON(scene)

// Render loop
const animate = function () {
	requestAnimationFrame(animate);

	controls.update();
	stats.update();
	renderer.render(scene, camera);

};

animate();
