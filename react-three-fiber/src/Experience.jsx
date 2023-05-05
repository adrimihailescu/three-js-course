import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";

extend({ OrbitControls });
export default function Experience() {
  //we use ref so we can target the element we want to rotate, add it to the mesh and add the rotation in the useFrame hook
  const cubeRef = useRef();
  const groupRef = useRef();

  const { camera, gl } = useThree();
  // console.log(camera, gl);
  useFrame((state, delta) => {
    // console.log(state.camera);
    // console.log(state.clock.elapsedTime);

    // //change camera position to rotate , but deactivate orbitControls
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0); //this will tell the camera to look at the centre of the scene

    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta; //this will rotate the group
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="salmon" />
        </mesh>

        <mesh
          ref={cubeRef}
          scale={1.5}
          position-x={2}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial args={[{ color: "red" }]} />
          {/* <torusKnotGeometry />
        <meshNormalMaterial /> */}
        </mesh>
      </group>

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        // ref={planeRef}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
}
