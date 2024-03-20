import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui'

import { meshFromJSON } from './func.meshFromJSON';
import { material_box, material_mesh, material_sphere } from './materials'

/*
This file mostly just sets up the threejs environment, camera, etc.
The logic for parsing the JSON to meshes is located in func.meshFromJSON.ts

The JSON is imported and passed to the meshFromJSON func in this file, around line 69
*/


// ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗
// ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝
// ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗
// ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║
// ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║
// ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
//

export const ui_settings = {
	fov              : 75,
	wireframe        : false,
	box_color        : '#ff0000',
	mesh_color       : '#00ff00',
	sphere_color     : '#0000ff',
	ambient_intensity: 12,
	direct_intensity : 42,
};



// ███████╗ ██████╗███████╗███╗   ██╗███████╗
// ██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝
// ███████╗██║     █████╗  ██╔██╗ ██║█████╗
// ╚════██║██║     ██╔══╝  ██║╚██╗██║██╔══╝
// ███████║╚██████╗███████╗██║ ╚████║███████╗
// ╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═══╝╚══════╝
//

const scene = new THREE.Scene();
const stats = new Stats()
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container: HTMLElement | null = document.getElementById('app');

// Attach renderer to DOM
if (container != null) {
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.shadowMap.enabled = true
	container.appendChild(renderer.domElement);
	container.appendChild(stats.dom)
}



//  ██████╗ ██████╗ ██╗     ██╗     ██╗██████╗ ███████╗██████╗ ███████╗
// ██╔════╝██╔═══██╗██║     ██║     ██║██╔══██╗██╔════╝██╔══██╗██╔════╝
// ██║     ██║   ██║██║     ██║     ██║██║  ██║█████╗  ██████╔╝███████╗
// ██║     ██║   ██║██║     ██║     ██║██║  ██║██╔══╝  ██╔══██╗╚════██║
// ╚██████╗╚██████╔╝███████╗███████╗██║██████╔╝███████╗██║  ██║███████║
//  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
//

import colliderJSON from './colliders.json'
meshFromJSON(colliderJSON, scene)



//  ██████╗ █████╗ ███╗   ███╗███████╗██████╗  █████╗
// ██╔════╝██╔══██╗████╗ ████║██╔════╝██╔══██╗██╔══██╗
// ██║     ███████║██╔████╔██║█████╗  ██████╔╝███████║
// ██║     ██╔══██║██║╚██╔╝██║██╔══╝  ██╔══██╗██╔══██║
// ╚██████╗██║  ██║██║ ╚═╝ ██║███████╗██║  ██║██║  ██║
//  ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
//

// Add the perspective camera and set its position
const camera = new THREE.PerspectiveCamera(ui_settings.fov, (container.clientWidth / container.clientHeight), 0.1, 1000);
camera.position.set(-16, 16, -16);

// Setup camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(8, 0, 8);
controls.update();

// Add axes helper
const axesHelper = new THREE.AxesHelper(16);
scene.add(axesHelper);



// ██╗     ██╗ ██████╗ ██╗  ██╗████████╗███████╗
// ██║     ██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝
// ██║     ██║██║  ███╗███████║   ██║   ███████╗
// ██║     ██║██║   ██║██╔══██║   ██║   ╚════██║
// ███████╗██║╚██████╔╝██║  ██║   ██║   ███████║
// ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
//

const light_ambient = new THREE.AmbientLight(0x404040, ui_settings.ambient_intensity)
light_ambient.position.set(1, 5, 1)
scene.add(light_ambient)

const light_dir = new THREE.DirectionalLight(0x404040, ui_settings.direct_intensity)
light_dir.castShadow = true
light_dir.shadow.camera.near = 1;
light_dir.shadow.camera.far = 10;
light_dir.position.set(1, 5, 1);
scene.add(light_dir);



// ██╗   ██╗██╗
// ██║   ██║██║
// ██║   ██║██║
// ██║   ██║██║
// ╚██████╔╝██║
//  ╚═════╝ ╚═╝
//

const gui = new GUI()

const vFolder = gui.addFolder('View')
vFolder.open()
vFolder.add(ui_settings, 'fov', 40, 120)
	.name('Field of View')
	.onChange(function (value) {
		camera.fov = value;
		camera.updateProjectionMatrix();
	}
	);

const wfFolder = gui.addFolder('Meshes')
wfFolder.open();

// Add a boolean controller to toggle wireframe
wfFolder.add(ui_settings, 'wireframe')
	.name('Wireframe')
	.onChange(function (value) {
		material_mesh.wireframe = value;
		material_box.wireframe = value;
		material_sphere.wireframe = value;
	}
	);

// Add a color controller for each material
wfFolder.addColor(ui_settings, 'box_color')
	.name('Box Color')
	.onChange(function (value) {
		material_box.color.set(value);
	}
	);

wfFolder.addColor(ui_settings, 'mesh_color')
	.name('Mesh Color')
	.onChange(function (value) {
		material_mesh.color.set(value);
	}
	);

wfFolder.addColor(ui_settings, 'sphere_color')
	.name('Sphere Color')
	.onChange(function (value) {
		material_sphere.color.set(value);
	}
	);

const lFolder = gui.addFolder('Lighting');
lFolder.open();

lFolder.add(ui_settings, 'ambient_intensity', 0, 100)
	.name('Ambient Intensity')
	.onChange(function (value) {
		light_ambient.intensity = value;
	}
	);

lFolder.add(ui_settings, 'direct_intensity', 0, 100)
	.name('Direct Intensity')
	.onChange(function (value) {
		light_dir.intensity = value;
	}
	);



// ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗     ██╗      ██████╗  ██████╗ ██████╗
// ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗    ██║     ██╔═══██╗██╔═══██╗██╔══██╗
// ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝    ██║     ██║   ██║██║   ██║██████╔╝
// ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗    ██║     ██║   ██║██║   ██║██╔═══╝
// ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║    ███████╗╚██████╔╝╚██████╔╝██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝
//

const animate = function () {
	requestAnimationFrame(animate);

	controls.update();
	stats.update();
	renderer.render(scene, camera);

};

animate();
