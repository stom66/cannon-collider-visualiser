import * as THREE from 'three'

import { Collider } from './interface.Collider'
import colliderJSON from './colliders-basic.json'

import { material_box, material_mesh, material_sphere } from './materials'


export function loadMeshFromJSON(
	scene: THREE.Scene
): void {

	// Parse the JSON file as an array of Collider objects
	const colliderData: Collider[] = colliderJSON as Collider[];

	// Loop through each collider in the array and create the appropriate shape
	colliderData.forEach((collider, index) => {

		// Handle the various possible shapes:

		// BOX Collider
		if (collider.shape == "BOX" && collider.dimensions && collider.rotation) {

			// Create a box.
            const geometry = new THREE.BoxGeometry(collider.dimensions[0], collider.dimensions[1], collider.dimensions[2]);

            // Create a mesh using the geometry and material
            const mesh = new THREE.Mesh(geometry, material_box);

            // Set the position and rotation
            mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

            const euler = new THREE.Euler(collider.rotation[0], collider.rotation[1], collider.rotation[2], 'ZYX');
            mesh.rotation.copy(euler)
            console.log(mesh.rotation)

            // Add the box to the scene
            scene.add(mesh)
		}

		// Handle SPHERE collider
		else if (collider.shape == "SPHERE" && collider.radius) {

			// Create a sphere - pretty simple.
            const geometry = new THREE.SphereGeometry(collider.radius);

            // Create a mesh using the geometry and material
            const mesh = new THREE.Mesh(geometry, material_sphere);

            // Set the position and rotation
            mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

            // Add the box to the scene
            scene.add(mesh)
		}

		// Handle MESH colliders
		else if (collider.shape == "MESH" && collider.vertices && collider.indices) {

            // Create a custom geometry
            const geometry = new THREE.BufferGeometry();

            // Set vertices
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(collider.vertices), 3));
           
            // Set faces (indices)
            geometry.setIndex(collider.indices);

            // Create a mesh using the custom geometry and material
            const mesh = new THREE.Mesh(geometry, material_mesh);

            // Set the position (ignore rotation, already accounted for)
            mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

            mesh.geometry.computeVertexNormals(); 

            // Add the mesh to the scene
            scene.add(mesh);
		}
	});
}
