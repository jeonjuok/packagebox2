import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const App = () => {
  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100));
  const [scene, setScene] = useState(new THREE.Scene());
  const [renderer, setRenderer] = useState(new THREE.WebGLRenderer());

  useEffect(() => {
    // Create a camera.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    setCamera(camera);

    // Create a scene.
    const scene = new THREE.Scene();
    setScene(scene);

    // Create a renderer.
    const renderer = new THREE.WebGLRenderer();
    setRenderer(renderer);

    // Add a camera to the scene.
    scene.add(camera);

    // Add a glTF model to the scene.
    const gltf = useGLTF("https://threejs.org/examples/models/suzanne.gltf");
    scene.add(gltf.scene);

    // Set the camera position.
    camera.position.z = 500;

    // Set the renderer size.
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the DOM.
    ReactDOM.render(<canvas ref={ref => setCanvas(ref)} />, document.getElementById("app"));

    // Render the scene.
    requestAnimationFrame(render);
  }, []);

  function render(t) {
    // Update the camera position.
    camera.rotation.x += 0.01;

    // Render the scene.
    renderer.render(scene, camera);

    // Request another render.
    requestAnimationFrame(render);
  }

  return (
    <div id="app">
      <canvas ref={ref => setCanvas(ref)} />
    </div>
  );
};

export default App;
