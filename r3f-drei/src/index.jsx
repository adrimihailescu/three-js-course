import "./style.css";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Sky, Cloud } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
  >
    {/* <Suspense fallback={null}>
      <Cloud position={[-3, -2, -25]} opacity={1} />
      <Cloud position={[4, 2, -15]} opacity={0.5} />
      <Cloud position={[-4, 2, -10]} opacity={1} />
      <Cloud position={[4, -2, -5]} opacity={0.5} />
      <Cloud position={[4, 2, 0]} opacity={0.75} />
    </Suspense> */}
    <Sky
      azimuth={-45}
      turbidity={20}
      rayleigh={0.558}
      inclination={0.6}
      distance={1000}
    />
    <Experience />
  </Canvas>
);
