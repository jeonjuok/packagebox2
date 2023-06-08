import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Editor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Three.js 초기화
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // 텍스처 로드
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('quality.png');

    // 육면체 생성
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 카메라 위치 설정
    camera.position.z = 5;

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);

      // 육면체 회전
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Three.js 렌더링
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup 함수
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default Editor;
