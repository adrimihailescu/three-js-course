import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import {
  Debug,
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
} from "@react-three/rapier";

export default function Experience() {
  const cubeRef = useRef();

  const cubeJump = () => {
    // console.log("jump");
    cubeRef.current.applyImpulse({ x: 0, y: 5, z: 0 }); //this will make the cube jump on the y axis
    cubeRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics>
        <Debug />
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        > */}
        {/* <CuboidCollider args={[1.5, 1.5, 0.5]} /> */}
        {/* <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 15, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        <RigidBody position={[1.5, 2, 0]} ref={cubeRef}>
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
