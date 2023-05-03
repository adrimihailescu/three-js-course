import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  useFrame(() => {
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="salmon" />
      </mesh>

      <mesh
        ref={cubeRef}
        scale={1.5}
        position-x={2}
        rotation-y={Math.PI * 0.25}
      >
        <boxGeometry scale={1.5} />
        <meshBasicMaterial args={[{ color: "red" }]} />
        {/* <torusKnotGeometry />
        <meshNormalMaterial /> */}
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
