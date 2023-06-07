import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const MyCanvas = () => {
  const canvasRef = useRef(null);
  const imgElement = useRef(null);

  useEffect(() => {
    var totalLength;
    var totalWidth;
    var boxHeight = 200;
    var boxWidth = 60;
    var boxDepth = 80;
    var foldHeight = 20;

    var canvas = new fabric.Canvas(canvasRef.current);

    // Here, we define the initialCanvas function
    function initialCanvas(initX, initY, boxHeight, insertingFoldHeight, boxWidth, boxDepth, foldCuttingSize) {
      totalLength = 2 * boxDepth + 2 * boxHeight + insertingFoldHeight + 100;
      totalWidth = 5 * boxWidth;
      // Here you should define what the function actually does with the parameters
    }

    initialCanvas(80, 225, boxHeight, foldHeight, boxWidth, boxDepth, 2);

    // ... Rest of the code

  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="myCanvas" tabindex="1" ></canvas>
      <img ref={imgElement} id="my-image" src="quality.png" style={{ display: 'none' }} />
    </>
  );
}

export default MyCanvas;
