import {
  Float,
  Text,
  Html,
  PivotControls,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            occlude={[sphereRef, cubeRef]}
          >
            That's a sphere!
          </Html>
        </mesh>
      </PivotControls>
      <TransformControls object={cubeRef} mode="translate" />
      <mesh position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Float speed={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          position-y={2}
          color="salmon"
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  );
}
