import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

//ways of changing the background
/**
 *
 * with setClearColor from gl
 */
// const created = ({ gl }) => {
//   //   console.log("created");
//   gl.setClearColor("#ff0000");
// };

/**
 *
 * with the scene background
 */
// const created = ({ scene }) => {
//   //   console.log("created");
//   scene.background = new THREE.Color("#ff0000");
// };

/**
 * with R3F color
 */
// create a color tag inside the canvas

root.render(
  <Canvas
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    // onCreated={created}
  >
    <color args={["red"]} attach="background" />
    <Experience />
  </Canvas>
);
