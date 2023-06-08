import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const Editor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fabric.js 초기화
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      renderOnAddRemove: false, // Disable auto-rendering on object add/remove
      skipOffscreen: false // Enable rendering even if canvas is offscreen
    });

    // 사각형 추가
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 10,
      top: 10
    });
    fabricCanvas.add(rect);

    // 캔버스 렌더링
    fabricCanvas.renderAll();

    // Cleanup 함수
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Editor;
