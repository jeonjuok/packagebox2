import React, { useEffect, useRef, useState } from 'react';

let fabric;

function CanvasComponent() {
  const canvasRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    import('fabric').then(fabricModule => {
      fabric = fabricModule.fabric;

      const canvas = new fabric.Canvas(canvasRef.current);

      canvas.on('object:selected', () => {
        deleteBtnRef.current.style.display = 'inline-block';
      });

      canvas.on('before:selection:cleared', () => {
        deleteBtnRef.current.style.display = 'none';
      });

      deleteBtnRef.current.addEventListener('click', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          setShapes(prevShapes => prevShapes.filter(shape => shape.id !== activeObject.id));
        }
      });

      canvasWrapperRef.current.addEventListener('keyup', (e) => {
        if (
          e.keyCode === 46 ||
          e.key === 'Delete' ||
          e.code === 'Delete' ||
          e.key === 'Backspace'
        ) {
          const activeObject = canvas.getActiveObject();
          if (activeObject && !activeObject.isEditing) {
            canvas.remove(activeObject);
            setShapes(prevShapes => prevShapes.filter(shape => shape.id !== activeObject.id));
          }
        }
      });

      setShapes(prevShapes => [
        ...prevShapes,
        {
          id: 'rect',
          shape: new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 100,
            height: 50,
          })
        },
        {
          id: 'rect2',
          shape: new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'purple',
            width: 100,
            height: 50,
          })
        },

        {
          id: 'circle',
          shape: new fabric.Circle({
            left: 250,
            top: 100,
            radius: 20,
            fill: 'purple',
          })
        },
        {
          id: 'circle2',
          shape: new fabric.Circle({
            left: 250,
            top: 100,
            radius: 20,
            fill: 'red',
          })
        }


      ]);

      canvasRef.current = canvas;
    });
  }, []);

  const handleShapeSelect = (shape) => {
    const canvas = canvasRef.current;
    const clonedShape = fabric.util.object.clone(shape.shape);
    clonedShape.set({ top: 0, left: 0 });
    canvas.add(clonedShape);
    canvas.setActiveObject(clonedShape);
    canvas.renderAll();
  };

  return (

    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Select a shape
          </h1> 

          <div
            tabIndex="1000"
            id="canvasWrapper"
            ref={canvasWrapperRef}
          >
            <canvas id="c" width="1000" height="800" ref={canvasRef} />
          </div>
          <div>
            {shapes.map(shape => (
              <button key={shape.id} onClick={() => handleShapeSelect(shape)} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                {shape.id}
              </button>
            ))}
          </div>
          <input type="button" id="delete" value="Delete selection" ref={deleteBtnRef} style={{ display: 'none' }} />

        </div>

        {/* 
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          
<button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Projects</button>

        </div> */}




      </div>
    </section>



  );
}

export default CanvasComponent;
