import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    // dpr={[1, 2]} //set the pixel ratio for all devices by limiting them, this is the default value set by R3F
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
    // orthographic
  >
    <Experience />
  </Canvas>
);
