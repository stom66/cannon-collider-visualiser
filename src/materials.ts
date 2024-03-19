import * as THREE from 'three'

// Setup materials for the scene
export const material_box    = new THREE.MeshStandardMaterial({ color: '#ff0000', side: THREE.FrontSide, wireframe: false });
export const material_mesh   = new THREE.MeshStandardMaterial({ color: '#00ff00', side: THREE.FrontSide, wireframe: false, flatShading: true });
export const material_sphere = new THREE.MeshStandardMaterial({ color: '#0000ff', side: THREE.FrontSide, wireframe: false });

