# Cannon Collider Visualiser

This repo uses ThreeJS to visualise the colliders in a JSON file exported by the Blender plugin: Decentraland Toolkit: Cannon Colliders.

## Getting Started

To run this demo locally in a WSL environment using VS Code, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/stom66/cannon-collider-example.git
    ```

2. Navigate to the project directory and run the following:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npx vite
    ```

    This will start a development server using Vite, and you should see the demo running in your browser at `http://localhost:8101`.

## Switching colliders

At current, the JSON file is hardcoded to `src/colliders.json`. To use your own colliders either overwrite this file with your own.

ToDo: add drop-in file support?

### Sources

Some code in this repository comes from: https://sbcode.net/threejs/physics-cannonDebugrenderer/
