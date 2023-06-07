import { useEffect, useRef, useState  } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function MyThreeJSApp() {
  const containerRef = useRef(null);
  const boxCanvasRef = useRef(null);

  const box = useRef({
    params: {
      width: 27,
      widthLimits: [15, 70],
      length: 80,
      lengthLimits: [70, 120],
      depth: 45,
      depthLimits: [15, 70]
    },
    els: {
      group: new THREE.Group(),
      backHalf: {
        width: new THREE.Mesh(),
        length: new THREE.Mesh()
      },
      frontHalf: {
        width: new THREE.Mesh(),
        length: new THREE.Mesh()
      }
    },
    animated: {
      openingAngle: 0.02 * Math.PI
    }
  });

  useEffect(() => {
    let renderer, scene, camera, orbit;
    const axisTitles = [];

    function initScene() {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: boxCanvasRef.current
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        10,
        1000
      );
      camera.position.set(0.4, 0.4, 1.1).multiplyScalar(130);

      updateSceneSize();

      addAxesAndOrbitControls();

      scene.add(box.current.els.group);
      setGeometryHierarchy();

      const materials = [
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xff0000),
          wireframe: true
        }),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xdc00c9),
          wireframe: true
        }),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x008be4),
          wireframe: true
        }),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x006100),
          wireframe: true
        })
      ];
      box.current.els.frontHalf.width.material = materials[0];
      box.current.els.frontHalf.length.material = materials[1];
      box.current.els.backHalf.width.material = materials[2];
      box.current.els.backHalf.length.material = materials[3];

      createBoxElements();
      render();
    }

    function addAxesAndOrbitControls() {
      const loader = new FontLoader();
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      loader.load(
        "https://unpkg.com/three@0.138.0/examples/fonts/helvetiker_regular.typeface.json",
        (font) => {
          const textParams = {
            font: font,
            size: 1.5,
            height: 0.1,
            curveSegments: 2
          };
          {
            const textGeometry = new TextGeometry("axis X", textParams);
            axisTitles[0] = new THREE.Mesh(textGeometry, textMaterial);
            axisTitles[0].position.set(30, 1, 0);
          }
          {
            const textGeometry = new TextGeometry("axis Y", textParams);
            axisTitles[1] = new THREE.Mesh(textGeometry, textMaterial);
            axisTitles[1].position.set(1, 30, 0);
          }
          scene.add(axisTitles[0], axisTitles[1]);
        }
      );

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-1000, 0, 0),
          new THREE.Vector3(1000, 0, 0)
        ]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
      {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -1000, 0),
          new THREE.Vector3(0, 1000, 0)
        ]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }

      orbit = new OrbitControls(camera, boxCanvasRef.current);
      orbit.enableZoom = true;
      orbit.enableDamping = true;
      orbit.autoRotate = true;
      orbit.autoRotateSpeed = 0.25;
    }

    function render() {
      orbit.update();
      axisTitles.forEach((t) => {
        t.quaternion.copy(camera.quaternion);
      });
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function updateSceneSize() {
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }

    function setGeometryHierarchy() {
      box.current.els.group.add(
        box.current.els.frontHalf.width,
        box.current.els.frontHalf.length,
        box.current.els.backHalf.width,
        box.current.els.backHalf.length
      );
    }

    function createBoxElements() {
      for (let halfIdx = 0; halfIdx < 2; halfIdx++) {
        for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
          const half = halfIdx ? "frontHalf" : "backHalf";
          const side = sideIdx ? "width" : "length";

          const sideWidth = side === "width" ? box.current.params.width : box.current.params.length;
          box.current.els[half][side].geometry = new THREE.PlaneGeometry(
            sideWidth,
            box.current.params.depth
          );
        }
      }
      updatePanelsTransform();
    }

    function updatePanelsTransform() {
      // place width-sides aside of length-sides (not animated)
      box.current.els.frontHalf.width.position.x = 0.5 * box.current.params.length;
      box.current.els.backHalf.width.position.x = -0.5 * box.current.params.length;

      // rotate width-sides from 0 to 90 deg
      box.current.els.frontHalf.width.rotation.y = box.current.animated.openingAngle;
      box.current.els.backHalf.width.rotation.y = box.current.animated.openingAngle;

      // move length-sides to keep the box centered
      const cos = Math.cos(box.current.animated.openingAngle); // animates from 1 to 0
      box.current.els.frontHalf.length.position.x = -0.5 * cos * box.current.params.width;
      box.current.els.backHalf.length.position.x = 0.5 * cos * box.current.params.width;

      // move length-sides to define box inner space
      const sin = Math.sin(box.current.animated.openingAngle); // animates from 0 to 1
      box.current.els.frontHalf.length.position.z = 0.5 * sin * box.current.params.width;
      box.current.els.backHalf.length.position.z = -0.5 * sin * box.current.params.width;
    }

    function createControls() {
      const folderSlider = document.getElementById('folder-slider');
      folderSlider.min = 2;
      folderSlider.max = 50;
      folderSlider.value = 0;
      folderSlider.step = 1;

      folderSlider.addEventListener('input', function () {
        const value = parseInt(folderSlider.value);
        const openingAngle = (value / 100) * Math.PI;
        box.current.animated.openingAngle = openingAngle;
        updatePanelsTransform();
      });

      const widthSlider = document.getElementById('width-slider');
      widthSlider.min = box.current.params.widthLimits[0];
      widthSlider.max = box.current.params.widthLimits[1];
      widthSlider.value = box.current.params.width;
      widthSlider.step = 1;

      widthSlider.addEventListener('input', function () {
        const value = parseInt(widthSlider.value);
        box.current.params.width = value;
        createBoxElements();
        updatePanelsTransform();
      });

      const lengthSlider = document.getElementById('length-slider');
      lengthSlider.min = box.current.params.lengthLimits[0];
      lengthSlider.max = box.current.params.lengthLimits[1];
      lengthSlider.value = box.current.params.length;
      lengthSlider.step = 1;

      lengthSlider.addEventListener('input', function () {
        const value = parseInt(lengthSlider.value);
        box.current.params.length = value;
        createBoxElements();
        updatePanelsTransform();
      });

      const depthSlider = document.getElementById('depth-slider');
      depthSlider.min = box.current.params.depthLimits[0];
      depthSlider.max = box.current.params.depthLimits[1];
      depthSlider.value = box.current.params.depth;
      depthSlider.step = 1;

      depthSlider.addEventListener('input', function () {
        const value = parseInt(depthSlider.value);
        box.current.params.depth = value;
        createBoxElements();
        updatePanelsTransform();
      });
    }

    initScene();
    createControls();

    return () => {
      // Clean up Three.js scene and OrbitControls
      orbit.dispose();
      renderer.dispose();
      scene.remove(...scene.children);
    };
  }, []);


  //슬라이드 수정추가  
  const [folder, setFolder] = useState(2);
  const [width, setWidth] = useState(27);
  const [length, setLength] = useState(80);
  const [depth, setDepth] = useState(45);


// 슬라이드 수정추가
  useEffect(() => {
    // Update boxParams when width, length, or depth changes
    setFolder(Math.max(2, Math.min(50, folder))); // Clamp width value between 15 and 70   
    setWidth(Math.max(15, Math.min(70, width))); // Clamp width value between 15 and 70
    setLength(Math.max(70, Math.min(120, length))); // Clamp length value between 70 and 120
    setDepth(Math.max(15, Math.min(70, depth))); // Clamp depth value between 15 and 70
  }, [folder, width, length, depth]);

  function handleFolderChange(e) {
    setFolder(parseInt(e.target.value));
  }  

  function handleWidthChange(e) {
    setWidth(parseInt(e.target.value));
  }

  function handleLengthChange(e) {
    setLength(parseInt(e.target.value));
  }

  function handleDepthChange(e) {
    setDepth(parseInt(e.target.value));
  }





  return (
    <div className="page">
      <div className="container" ref={containerRef}>
        <canvas id="box-canvas" ref={boxCanvasRef}></canvas>

        <div className="ui-controls">
          <div>Scroll ⬇ To Animate</div>
{/* 
          <input
            type="range"
            id="folder-slider"
            min="0"
            max="50"
            value="0"
            step="1"
          /> */}

           {/* 슬라이드 수정 추가 */}
        <div className="ui-controls">
          <label htmlFor="folder-slider">Folder:</label>
          <input
            type="range"
            id="folder-slider"
            min="0"
            max="50"
            step="1"
            value={folder}
            onChange={handleFolderChange}
          />
          <input 
            type="number" 
            id="folder-input" 
            min="0" 
            max="50" 
            step="1" 
            value={folder} 
            onChange={handleFolderChange} />
        </div>       

          {/* <div className="slider-container">
            <label htmlFor="width-slider">Width:</label>
            <input type="range" id="width-slider" min="15" max="70" step="1" value="27" />
            <input type="number" id="width-input" min="15" max="70" step="1" value="27" />
          </div> */}

        {/* 슬라이드 수정 추가 */}
        <div className="slider-container">
          <label htmlFor="width-slider">Width:</label>
          <input
            type="range"
            id="width-slider"
            min="15"
            max="70"
            step="1"
            value={width}
            onChange={handleWidthChange}
          />
          <input 
            type="number"
            id="width-input"
            min="15"
            max="70"
            step="1"
            value={width}
            onChange={handleWidthChange} 
          />
        </div>



          {/* <div className="slider-container">
            <label htmlFor="length-slider">Length:</label>
            <input type="range" id="length-slider" min="70" max="120" step="1" value="80" />
            <input type="number" id="length-input" min="70" max="120" step="1" value="80" />
          </div> */}
        <div className="slider-container">
          <label htmlFor="length-slider">Length:</label>
          <input
            type="range"
            id="length-slider"
            min="70"
            max="120"
            step="1"
            value={length}
            onChange={handleLengthChange}
          />
          <input
            type="number"
            id="length-input"
            min="70"
            max="120"
            step="1"
            value={length}
            onChange={handleLengthChange}
          />
        </div>



          {/* <div className="slider-container">
            <label htmlFor="depth-slider">Depth:</label>
            <input type="range" id="depth-slider" min="15" max="70" step="1" value="45" />
            <input type="number" id="depth-input" min="15" max="70" step="1" value="45" />
          </div> */}
        <div className="slider-container">
          <label htmlFor="depth-slider">Depth:</label>
          <input type="range" id="depth-slider" min="15" max="70" step="1" value={depth} onChange={handleDepthChange} />
          <input type="number" id="depth-input" min="15" max="70" step="1" value={depth} onChange={handleDepthChange} />
        </div>


        </div>
      </div>
    </div>
  );
}
