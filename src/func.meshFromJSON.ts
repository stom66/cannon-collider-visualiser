import * as THREE from 'three'

import { Collider } from './interface.Collider'
import { material_box, material_mesh, material_sphere } from './materials'

// Main JSON -> mesh parser
export function meshFromJSON(
	colliders: Collider[],
	scene: THREE.Scene
): void {

	// Loop through each collider in the array and create the appropriate shape
	colliders.forEach((collider, index) => {


		// ██████╗  ██████╗ ██╗  ██╗
		// ██╔══██╗██╔═══██╗╚██╗██╔╝
		// ██████╔╝██║   ██║ ╚███╔╝ 
		// ██╔══██╗██║   ██║ ██╔██╗ 
		// ██████╔╝╚██████╔╝██╔╝ ██╗
		// ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
		//

		if (collider.shape == "BOX" && collider.dimensions && collider.rotation) {

			// Create a box
			const geometry = new THREE.BoxGeometry(collider.dimensions[0], collider.dimensions[1], collider.dimensions[2]);

			// Create a mesh with it
			const mesh = new THREE.Mesh(geometry, material_box);

			// Set the position
			mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

			// Set the rotation: note this is a quaternion
			const quat = new THREE.Quaternion(collider.rotation[0], collider.rotation[1], collider.rotation[2], collider.rotation[3]);
			mesh.rotation.setFromQuaternion(quat)

			// Add to scene
			scene.add(mesh)
		}


		// ███████╗██████╗ ██╗  ██╗███████╗██████╗ ███████╗
		// ██╔════╝██╔══██╗██║  ██║██╔════╝██╔══██╗██╔════╝
		// ███████╗██████╔╝███████║█████╗  ██████╔╝█████╗  
		// ╚════██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
		// ███████║██║     ██║  ██║███████╗██║  ██║███████╗
		// ╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
		//

		if (collider.shape == "SPHERE" && collider.radius) {

			// Create a sphere - pretty simple
			const geometry = new THREE.SphereGeometry(collider.radius);

			// Create a mesh it
			const mesh = new THREE.Mesh(geometry, material_sphere);

			// Set the position (no rotation needs, cause sphere)
			mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

			// Add to scene
			scene.add(mesh)
		}


		// ███╗   ███╗███████╗███████╗██╗  ██╗
		// ████╗ ████║██╔════╝██╔════╝██║  ██║
		// ██╔████╔██║█████╗  ███████╗███████║
		// ██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
		// ██║ ╚═╝ ██║███████╗███████║██║  ██║
		// ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
		//

		if (collider.shape == "MESH" && collider.vertices && collider.indices) {

			// Create a geometry buffer
			const geometry = new THREE.BufferGeometry();

			// Set vertice positions
			geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(collider.vertices), 3));

			// Set faces (indices)
			geometry.setIndex(collider.indices);

			// Create a mesh using the geometry buffer
			const mesh = new THREE.Mesh(geometry, material_mesh);

			// Set the position (ignore rotation, already accounted for by exporter)
			mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);

			// Computer vertex normals so that flat shading works correctly
			mesh.geometry.computeVertexNormals();

			// Add to scene
			scene.add(mesh);
		}
	});
}
