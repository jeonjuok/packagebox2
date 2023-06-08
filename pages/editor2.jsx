import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { fabric } from 'fabric';

const Editor = () => {
  const fabricCanvasRef = useRef(null);
  const threeCanvasRef = useRef(null);

  useEffect(() => {
    // Fabric.js 초기화
    const fabricCanvas = new fabric.Canvas(fabricCanvasRef.current, {
      width: window.innerWidth / 2,
      height: window.innerHeight,
      renderOnAddRemove: false,
      skipOffscreen: false
    });

    // 이미지 추가
    const imageUrl = 'quality.png';
    fabric.Image.fromURL(imageUrl, (img) => {
      fabricCanvas.add(img);
      fabricCanvas.renderAll();
    });

    // Three.js 초기화
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);

    // Three.js 캔버스 요소에 렌더러 추가
    threeCanvasRef.current.appendChild(renderer.domElement);

    // 텍스처 생성 및 업데이트 함수
    const texture = new THREE.Texture(fabricCanvas.lowerCanvasEl);
    const updateTexture = () => {
      texture.needsUpdate = true;
    };

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

    // 크기 변경 시 Fabric.js 캔버스를 Three.js 텍스처에 업데이트
    fabricCanvas.on('object:modified', updateTexture);

    // Cleanup 함수
    return () => {
      fabricCanvas.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <canvas ref={fabricCanvasRef} style={{ width: '50%', height: '100%' }} />
      <div ref={threeCanvasRef} style={{ width: '50%', height: '100%' }} />
    </div>
  );
};

export default Editor;
