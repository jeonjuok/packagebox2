import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

import { useEffect } from 'react';

const Box = () => {
  let container;
  let boxCanvas;

  let box = {
    params: {
      width: 27,
      widthLimits: [15, 70],
      length: 80,
      lengthLimits: [70, 120],
      depth: 45,
      depthLimits: [15, 70],
      thickness: 0.6,
      thicknessLimits: [0.1, 1],
      fluteFreq: 5,
      fluteFreqLimits: [3, 7],
      flapGap: 1,
      copyrightSize: [27, 10],
    },
    els: {
      group: new THREE.Group(),
      backHalf: {
        width: {
          top: new THREE.Mesh(),
          side: new THREE.Mesh(),
          bottom: new THREE.Mesh(),
        },
        length: {
          top: new THREE.Mesh(),
          side: new THREE.Mesh(),
          bottom: new THREE.Mesh(),
        },
      },
      frontHalf: {
        width: {
          top: new THREE.Mesh(),
          side: new THREE.Mesh(),
          bottom: new THREE.Mesh(),
        },
        length: {
          top: new THREE.Mesh(),
          side: new THREE.Mesh(),
          bottom: new THREE.Mesh(),
        },
      },
    },
    animated: {
      openingAngle: 0.02 * Math.PI,
      flapAngles: {
        backHalf: {
          width: {
            top: 0,
            bottom: 0,
          },
          length: {
            top: 0,
            bottom: 0,
          },
        },
        frontHalf: {
          width: {
            top: 0,
            bottom: 0,
          },
          length: {
            top: 0,
            bottom: 0,
          },
        },
      },
    },
  };

  let renderer, scene, camera, orbit, lightHolder, rayCaster, mouse, copyright;

  useEffect(() => {
    initScene();
    createControls();
    window.addEventListener('resize', updateSceneSize);

    return () => {
      window.removeEventListener('resize', updateSceneSize);
    };
  }, []);

  const initScene = () => {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: boxCanvas,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      10,
      1000
    );
    camera.position.set(40, 90, 110);

    rayCaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(0, 0);

    updateSceneSize();

    scene.add(box.els.group);
    setGeometryHierarchy();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    lightHolder = new THREE.Group();
    const topLight = new THREE.PointLight(0xffffff, 0.5);
    topLight.position.set(-30, 300, 0);
    lightHolder.add(topLight);
    const sideLight = new THREE.PointLight(0xffffff, 0.7);
    sideLight.position.set(50, 0, 150);
    lightHolder.add(sideLight);
    scene.add(lightHolder);

    scene.add(box.els.group);
    setGeometryHierarchy();

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x9c8d7b),
      side: THREE.DoubleSide,
    });
    box.els.group.traverse((c) => {
      if (c.isMesh) c.material = material;
    });

    orbit = new OrbitControls(camera, boxCanvas);
    orbit.enableZoom = false;
    orbit.enablePan = false;
    orbit.enableDamping = true;
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 0.25;

    createCopyright();
    createBoxElements();
    createFoldingAnimation();
    createZooming();

    render();
  };

  const render = () => {
    orbit.update();
    lightHolder.quaternion.copy(camera.quaternion);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  const updateSceneSize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  const setGeometryHierarchy = () => {
    box.els.group.add(
      box.els.frontHalf.width.side,
      box.els.frontHalf.length.side,
      box.els.backHalf.width.side,
      box.els.backHalf.length.side
    );
    box.els.frontHalf.width.side.add(
      box.els.frontHalf.width.top,
      box.els.frontHalf.width.bottom
    );
    box.els.frontHalf.length.side.add(
      box.els.frontHalf.length.top,
      box.els.frontHalf.length.bottom
    );
    box.els.backHalf.width.side.add(
      box.els.backHalf.width.top,
      box.els.backHalf.width.bottom
    );
    box.els.backHalf.length.side.add(
      box.els.backHalf.length.top,
      box.els.backHalf.length.bottom
    );
  };

  const createBoxElements = () => {
    for (let halfIdx = 0; halfIdx < 2; halfIdx++) {
      for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
        const half = halfIdx ? 'frontHalf' : 'backHalf';
        const side = sideIdx ? 'width' : 'length';

        const sideWidth = side === 'width' ? box.params.width : box.params.length;
        const flapWidth = sideWidth - 2 * box.params.flapGap;
        const flapHeight = 0.5 * box.params.width - 0.75 * box.params.flapGap;

        const sidePlaneGeometry = new THREE.PlaneGeometry(
          sideWidth,
          box.params.depth,
          Math.floor(5 * sideWidth),
          Math.floor(0.2 * box.params.depth)
        );
        const flapPlaneGeometry = new THREE.PlaneGeometry(
          flapWidth,
          flapHeight,
          Math.floor(5 * flapWidth),
          Math.floor(0.2 * flapHeight)
        );

        const sideGeometry = createSideGeometry(
          sidePlaneGeometry,
          [sideWidth, box.params.depth],
          [true, true, true, true],
          false
        );
        const topGeometry = createSideGeometry(
          flapPlaneGeometry,
          [flapWidth, flapHeight],
          [false, false, true, false],
          true
        );
        const bottomGeometry = createSideGeometry(
          flapPlaneGeometry,
          [flapWidth, flapHeight],
          [true, false, false, false],
          true
        );

        topGeometry.translate(0, 0.5 * flapHeight, 0);
        bottomGeometry.translate(0, -0.5 * flapHeight, 0);

        box.els[half][side].top.geometry = topGeometry;
        box.els[half][side].side.geometry = sideGeometry;
        box.els[half][side].bottom.geometry = bottomGeometry;

        box.els[half][side].top.position.y = 0.5 * box.params.depth;
        box.els[half][side].bottom.position.y = -0.5 * box.params.depth;
      }
    }

    updatePanelsTransform();
  };

  const createSideGeometry = (
    baseGeometry,
    size,
    folds,
    hasMiddleLayer
  ) => {
    const geometriesToMerge = [];
    geometriesToMerge.push(
      getLayerGeometry((v) => -0.5 * box.params.thickness + 0.01 * Math.sin(box.params.fluteFreq * v))
    );
    geometriesToMerge.push(
      getLayerGeometry((v) => 0.5 * box.params.thickness + 0.01 * Math.sin(box.params.fluteFreq * v))
    );
    if (hasMiddleLayer) {
      geometriesToMerge.push(
        getLayerGeometry((v) => 0.5 * box.params.thickness * Math.sin(box.params.fluteFreq * v))
      );
    }

    function getLayerGeometry(offset) {
      const layerGeometry = baseGeometry.clone();
      const positionAttr = layerGeometry.attributes.position;
      for (let i = 0; i < positionAttr.count; i++) {
        const x = positionAttr.getX(i);
        const y = positionAttr.getY(i);
        let z = positionAttr.getZ(i) + offset(x);
        z = applyFolds(x, y, z);
        positionAttr.setXYZ(i, x, y, z);
      }
      return layerGeometry;
    }

    function applyFolds(x, y, z) {
      let modifier = (c, s) => 1.0 - Math.pow(c / (0.5 * s), 10);
      if ((x > 0 && folds[1]) || (x < 0 && folds[3])) {
        z *= modifier(x, size[0]);
      }
      if ((y > 0 && folds[0]) || (y < 0 && folds[2])) {
        z *= modifier(y, size[1]);
      }
      return z;
    }

    const mergedGeometry = mergeBufferGeometries(geometriesToMerge, false);
    mergedGeometry.computeVertexNormals();

    return mergedGeometry;
  };

  const updatePanelsTransform = () => {
    box.els.frontHalf.width.side.position.x = 0.5 * box.params.length;
    box.els.backHalf.width.side.position.x = -0.5 * box.params.length;

    box.els.frontHalf.width.side.rotation.y = box.animated.openingAngle;
    box.els.backHalf.width.side.rotation.y = box.animated.openingAngle;

    const cos = Math.cos(box.animated.openingAngle);
    box.els.frontHalf.length.side.position.x =
      -0.5 * cos * box.params.width;
    box.els.backHalf.length.side.position.x = 0.5 * cos * box.params.width;

    const sin = Math.sin(box.animated.openingAngle);
    box.els.frontHalf.length.side.position.z = 0.5 * sin * box.params.width;
    box.els.backHalf.length.side.position.z = -0.5 * sin * box.params.width;

    box.els.frontHalf.width.top.rotation.x =
      -box.animated.flapAngles.frontHalf.width.top;
    box.els.frontHalf.length.top.rotation.x =
      -box.animated.flapAngles.frontHalf.length.top;
    box.els.frontHalf.width.bottom.rotation.x =
      box.animated.flapAngles.frontHalf.width.bottom;
    box.els.frontHalf.length.bottom.rotation.x =
      box.animated.flapAngles.frontHalf.length.bottom;

    box.els.backHalf.width.top.rotation.x =
      box.animated.flapAngles.backHalf.width.top;
    box.els.backHalf.length.top.rotation.x =
      box.animated.flapAngles.backHalf.length.top;
    box.els.backHalf.width.bottom.rotation.x =
      -box.animated.flapAngles.backHalf.width.bottom;
    box.els.backHalf.length.bottom.rotation.x =
      -box.animated.flapAngles.backHalf.length.bottom;

    copyright.position.copy(box.els.frontHalf.length.side.position);
    copyright.position.x +=
      0.5 * box.params.length - 0.5 * box.params.copyrightSize[0];
    copyright.position.y -=
      0.5 * (box.params.depth - box.params.copyrightSize[1]);
    copyright.position.z += box.params.thickness;
  };

  const createFoldingAnimation = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.page',
        start: '0% 0%',
        end: '100% 100%',
        scrub: true,
      },
      onUpdate: () => {
        updatePanelsTransform();
        checkCopyrightIntersect();
      },
    })
      .to(box.animated, {
        duration: 1,
        openingAngle: 0.5 * Math.PI,
        ease: 'power1.inOut',
      })
      .to(
        [
          box.animated.flapAngles.backHalf.width,
          box.animated.flapAngles.frontHalf.width,
        ],
        {
          duration: 0.6,
          bottom: 0.6 * Math.PI,
          ease: 'back.in(3)',
        },
        0.9
      )
      .to(box.animated.flapAngles.backHalf.length, {
        duration: 0.7,
        bottom: 0.5 * Math.PI,
        ease: 'back.in(2)',
      }, 1.1)
      .to(box.animated.flapAngles.frontHalf.length, {
        duration: 0.8,
        bottom: 0.49 * Math.PI,
        ease: 'back.in(3)',
      }, 1.4)
      .to(
        [
          box.animated.flapAngles.backHalf.width,
          box.animated.flapAngles.frontHalf.width,
        ],
        {
          duration: 0.6,
          top: 0.6 * Math.PI,
          ease: 'back.in(3)',
        },
        1.4
      )
      .to(box.animated.flapAngles.backHalf.length, {
        duration: 0.7,
        top: 0.5 * Math.PI,
        ease: 'back.in(3)',
      }, 1.7)
      .to(box.animated.flapAngles.frontHalf.length, {
        duration: 0.9,
        top: 0.49 * Math.PI,
        ease: 'back.in(4)',
      }, 1.8);
  };

  const createZooming = () => {
    const zoomInBtn = document.querySelector('#zoom-in');
    const zoomOutBtn = document.querySelector('#zoom-out');

    let zoomLevel = 1;
    const limits = [0.4, 2];

    zoomInBtn.addEventListener('click', () => {
      zoomLevel *= 1.3;
      applyZoomLimits();
    });

    zoomOutBtn.addEventListener('click', () => {
      zoomLevel /= 1.3;
      applyZoomLimits();
    });

    function applyZoomLimits() {
      zoomLevel = Math.min(Math.max(zoomLevel, limits[0]), limits[1]);
      camera.position.set(40 * zoomLevel, 90 * zoomLevel, 110 * zoomLevel);
    }
  };

  const createControls = () => {
    const gui = new GUI();

    const params = box.params;

    const widthFolder = gui.addFolder('Width');
    widthFolder
      .add(params, 'width', ...params.widthLimits)
      .onChange(updateGeometry);

    const lengthFolder = gui.addFolder('Length');
    lengthFolder
      .add(params, 'length', ...params.lengthLimits)
      .onChange(updateGeometry);

    const depthFolder = gui.addFolder('Depth');
    depthFolder
      .add(params, 'depth', ...params.depthLimits)
      .onChange(updateGeometry);

    const thicknessFolder = gui.addFolder('Thickness');
    thicknessFolder
      .add(params, 'thickness', ...params.thicknessLimits)
      .onChange(updateGeometry);

    const fluteFreqFolder = gui.addFolder('Flute Frequency');
    fluteFreqFolder
      .add(params, 'fluteFreq', ...params.fluteFreqLimits)
      .onChange(updateGeometry);

    function updateGeometry() {
      scene.remove(box.els.group);
      box.els.group.traverse((c) => {
        if (c.isMesh) {
          c.geometry.dispose();
          c.material.dispose();
        }
      });
      box.els.group = new THREE.Group();
      box = { ...box, ...createBoxParams() };
      box.els.group.add(
        box.els.frontHalf.width.side,
        box.els.frontHalf.length.side,
        box.els.backHalf.width.side,
        box.els.backHalf.length.side
      );
      box.els.frontHalf.width.side.add(
        box.els.frontHalf.width.top,
        box.els.frontHalf.width.bottom
      );
      box.els.frontHalf.length.side.add(
        box.els.frontHalf.length.top,
        box.els.frontHalf.length.bottom
      );
      box.els.backHalf.width.side.add(
        box.els.backHalf.width.top,
        box.els.backHalf.width.bottom
      );
      box.els.backHalf.length.side.add(
        box.els.backHalf.length.top,
        box.els.backHalf.length.bottom
      );
      scene.add(box.els.group);

      updatePanelsTransform();
    }

    function createBoxParams() {
      const width = params.width;
      const length = params.length;
      const depth = params.depth;
      const thickness = params.thickness;
      const fluteFreq = params.fluteFreq;
      const flapGap = 1;
      const openingAngle = 0.02 * Math.PI;

      const boxParams = {
        params: {
          width,
          widthLimits: params.widthLimits,
          length,
          lengthLimits: params.lengthLimits,
          depth,
          depthLimits: params.depthLimits,
          thickness,
          thicknessLimits: params.thicknessLimits,
          fluteFreq,
          fluteFreqLimits: params.fluteFreqLimits,
          flapGap,
        },
        els: {
          group: new THREE.Group(),
          backHalf: {
            width: {
              top: new THREE.Mesh(),
              side: new THREE.Mesh(),
              bottom: new THREE.Mesh(),
            },
            length: {
              top: new THREE.Mesh(),
              side: new THREE.Mesh(),
              bottom: new THREE.Mesh(),
            },
          },
          frontHalf: {
            width: {
              top: new THREE.Mesh(),
              side: new THREE.Mesh(),
              bottom: new THREE.Mesh(),
            },
            length: {
              top: new THREE.Mesh(),
              side: new THREE.Mesh(),
              bottom: new THREE.Mesh(),
            },
          },
        },
        animated: {
          openingAngle,
          flapAngles: {
            backHalf: {
              width: {
                top: 0,
                bottom: 0,
              },
              length: {
                top: 0,
                bottom: 0,
              },
            },
            frontHalf: {
              width: {
                top: 0,
                bottom: 0,
              },
              length: {
                top: 0,
                bottom: 0,
              },
            },
          },
        },
      };

      return boxParams;
    }
  };

  const createRayCaster = () => {
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(
      scene.children,
      true
    );
    return intersects.length > 0;
  };

  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    createRayCaster();
  };

  const onTouchMove = (event) => {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    createRayCaster();
  };

  const createCanvasRef = (ref) => {
    container = ref;
  };

  return (
    <div
      className="container"
      ref={createCanvasRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      <canvas ref={(ref) => (boxCanvas = ref)} />
    </div>
  );
};

export default Box;
