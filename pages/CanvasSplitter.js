import React, { useState, useRef, useEffect } from "react";

import css from "../styles/Projects.module.css";
import { Canvas } from "@react-three/fiber";
import Box from "../components/projects/Box";
import OrbitControls from "../components/projects/OrbitControls";
import LightBulb from "../components/projects/LightBulb";
import Floor from "../components/projects/Floor";
import Draggable from "../components/projects/Draggable";

import { fabric } from 'fabric';

const CanvasSplitter = () => {
  const [dividerPosition, setDividerPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({width: null, height: null});

  const MENU_HEIGHT = 100;  // 상단 메뉴의 높이
  const FOOTER_HEIGHT = 80;  // 하단의 높이

  const leftCanvasRef = useRef();
  const rightCanvasRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({width: window.innerWidth, height: window.innerHeight - MENU_HEIGHT - FOOTER_HEIGHT});
      setDividerPosition(window.innerWidth / 2);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (typeof window !== "undefined") {
      setDividerPosition(window.innerWidth / 2);
      setWindowDimensions({width: window.innerWidth, height: window.innerHeight - MENU_HEIGHT - FOOTER_HEIGHT});
      window.addEventListener('resize', handleResize);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  const onMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setDividerPosition(e.clientX);
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }


  useEffect(() => {
    // Fablic.js 코드 작성
    const canvas = new fabric.Canvas('canvas');

    const rectangle = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 200,
      height: 200
    });

    canvas.add(rectangle);
  }, []);


  return (
    <div
      onMouseMove={onMouseMove}
      style={{
        width: windowDimensions.width,
        height: windowDimensions.height,
        display: "flex",
        justifyContent: "space-between",
        position: "relative"
      }}
    >
      {dividerPosition !== null && windowDimensions.width !== null && windowDimensions.height !== null ? (
        <>
           <canvas
            id="canvas"
            ref={leftCanvasRef}
            width={dividerPosition}
            height={windowDimensions.height}
            style={{border: "5px solid black"}}
          />
          
          <Canvas
            id="canvas"          
            ref={rightCanvasRef}
            width={windowDimensions.width - dividerPosition}
            height={windowDimensions.height}
            style={{border: "5px solid black"}}
            shadows
            className={css.canvas}
            camera={{
              position: [-6, 7, 7],
            }}
          >

            <ambientLight color={"white"} intensity={0.3} />
            <LightBulb position={[0, 3, 0]} />
            <Draggable>
              <Box rotateX={3} rotateY={0.2} />
            </Draggable>

            <OrbitControls />
            <Floor position={[0, -1, 0]} />

          </Canvas>

          <div
            onMouseDown={onMouseDown}
            style={{
              width: '10px',
              height: '100%',
              backgroundColor: 'transparent',
              cursor: 'col-resize',
              position: 'absolute',
              left: dividerPosition,
              transform: 'translateX(-50%)',
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default CanvasSplitter;


// import React, { useState, useRef, useEffect } from "react";


// import css from "../styles/Projects.module.css";
// import { Canvas } from "@react-three/fiber";
// import Box from "../components/projects/Box";
// import OrbitControls from "../components/projects/OrbitControls";
// import LightBulb from "../components/projects/LightBulb";
// import Floor from "../components/projects/Floor";
// import Draggable from "../components/projects/Draggable";


// const CanvasSplitter = () => {
//   const [dividerPosition, setDividerPosition] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [windowDimensions, setWindowDimensions] = useState({width: null, height: null});

//   const leftCanvasRef = useRef();
//   const rightCanvasRef = useRef();

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowDimensions({width: window.innerWidth, height: window.innerHeight});
//       setDividerPosition(window.innerWidth / 2);
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//     };

//     if (typeof window !== "undefined") {
//       setDividerPosition(window.innerWidth / 2);
//       setWindowDimensions({width: window.innerWidth, height: window.innerHeight});
//       window.addEventListener('resize', handleResize);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener('resize', handleResize);
//         document.removeEventListener('mouseup', handleMouseUp);
//       }
//     };
//   }, []);

//   const onMouseMove = (e) => {
//     if (isDragging) {
//       e.preventDefault();
//       setDividerPosition(e.clientX);
//     }
//   };

//   const onMouseDown = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   }

//   return (
//     <div
//       onMouseMove={onMouseMove}
//       style={{
//         width: windowDimensions.width,
//         height: windowDimensions.height,
//         display: "flex",
//         justifyContent: "space-between",
//         position: "relative"
//       }}
//     >
//       {dividerPosition !== null && windowDimensions.width !== null && windowDimensions.height !== null ? (
//         <>
//           <canvas
//             ref={leftCanvasRef}
//             width={dividerPosition}
//             height={windowDimensions.height}
//             style={{border: "1px solid black"}}
//           />
          
//           <Canvas
//             ref={rightCanvasRef}
//             width={windowDimensions.width - dividerPosition}
//             height={windowDimensions.height}
//             style={{border: "1px solid black"}}
//             shadows
//             className={css.canvas}
//             camera={{
//               position: [-6, 7, 7],
//             }}
//           >

//             <ambientLight color={"white"} intensity={0.3} />
//             <LightBulb position={[0, 3, 0]} />
//             <Draggable>
//               <Box rotateX={3} rotateY={0.2} />
//             </Draggable>

//             <OrbitControls />
//             <Floor position={[0, -1, 0]} />

//           </Canvas>


//           <div
//             onMouseDown={onMouseDown}
//             style={{
//               width: '10px',
//               height: '100%',
//               backgroundColor: 'transparent',
//               cursor: 'col-resize',
//               position: 'absolute',
//               left: dividerPosition,
//               transform: 'translateX(-50%)',
//             }}
//           />
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default CanvasSplitter;
