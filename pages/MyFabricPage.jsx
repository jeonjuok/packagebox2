import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const MyFabricPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    // Update canvas size on window resize
    const resizeHandler = () => {
      const container = canvas.wrapperEl.parentNode;
      const { width, height } = container.getBoundingClientRect();
      canvas.setDimensions({ width, height });
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); // Initialize canvas size

    // Event handler for shape click event
    const shapeClickHandler = (event) => {
      const shape = event.target;
      canvas.remove(shape);
    };

    // 10개의 도형 그리기
    for (let i = 0; i < 10; i++) {
      const left = Math.random() * canvas.width;
      const top = Math.random() * canvas.height;
      const width = Math.random() * 100 + 50;
      const height = Math.random() * 100 + 50;
      const fill = getRandomColor();

      const rectangle = new fabric.Rect({
        left: left,
        top: top,
        fill: fill,
        width: width,
        height: height
      });

      rectangle.on('mousedown', shapeClickHandler); // Attach click event handler to shape

      canvas.add(rectangle);
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <style jsx>{`
        canvas {
          width: 100%;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default MyFabricPage;
