import React, { useEffect, useRef, useState } from 'react';

let fabric;

const shapes = [
  { id: 1, type: 'rectangle', width: 100, height: 50, fill: 'red' },
  { id: 2, type: 'circle', radius: 20, fill: 'purple' },
  // Add more shapes here if needed
];

function CanvasComponent() {
  const canvasRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    import('fabric').then(fabricModule => {
      fabric = fabricModule.fabric;

      const canvasInstance = new fabric.Canvas(canvasRef.current);

      setCanvas(canvasInstance);
    });
  }, []);

  useEffect(() => {
    if (canvas) {
      const handleSelectionCreated = () => {
        deleteBtnRef.current.style.display = 'inline-block';
      };

      const handleSelectionCleared = () => {
        deleteBtnRef.current.style.display = 'none';
      };

      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:cleared', handleSelectionCleared);

      const handleDeleteClick = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      };

      deleteBtnRef.current.removeEventListener('click', handleDeleteClick);
      deleteBtnRef.current.addEventListener('click', handleDeleteClick);

      const handleKeyUp = (e) => {
        if (
          e.keyCode == 46 ||
          e.key == 'Delete' ||
          e.code == 'Delete' ||
          e.key == 'Backspace'
        ) {
          const activeObject = canvas.getActiveObject();
          if (activeObject && !activeObject.isEditing) {
            canvas.remove(activeObject);
          }
        }
      };

      window.removeEventListener('keyup', handleKeyUp);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keyup', handleKeyUp);
        deleteBtnRef.current.removeEventListener('click', handleDeleteClick);
        canvas.off('selection:created', handleSelectionCreated);
        canvas.off('selection:cleared', handleSelectionCleared);
      };
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas && selectedShape) {
      let shape;
      if (selectedShape.type === 'rectangle') {
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: selectedShape.fill,
          width: selectedShape.width,
          height: selectedShape.height,
          selectable: true, // Set selectable to true
        });
      } else if (selectedShape.type === 'circle') {
        shape = new fabric.Circle({
          left: 250,
          top: 100,
          fill: selectedShape.fill,
          radius: selectedShape.radius,
          selectable: true, // Set selectable to true
        });
      }
      if (shape) {
        canvas.add(shape);
      }
    }
  }, [selectedShape, canvas]);

  return (
    <div>
      <h4>Select a shape to add</h4>
      <select onChange={e => setSelectedShape(shapes.find(shape => shape.id === Number(e.target.value)))}>
        <option value="">--Please choose a shape--</option>
        {shapes.map(shape => <option key={shape.id} value={shape.id}>{shape.type}</option>)}
      </select>
      <h4>Or select an object</h4>
      <div tabIndex="1000" id="canvasWrapper">
        <canvas id="c" width="600" height="200" ref={canvasRef} />
      </div>
      <input type="button" id="delete" value="Delete selection" ref={deleteBtnRef} />
    </div>
  );
}

export default CanvasComponent;
