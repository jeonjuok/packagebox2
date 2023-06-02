import css from "../styles/Projects.module.css";
import { Canvas } from "@react-three/fiber";
import Box from "../components/projects/Box";
import OrbitControls from "../components/projects/OrbitControls";
import LightBulb from "../components/projects/LightBulb";
import Floor from "../components/projects/Floor";
import Draggable from "../components/projects/Draggable";

export default function Projects() {
  return (
    <div className={css.scene}>
      <Canvas
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
    </div>
  );
}
