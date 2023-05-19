import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import {
  Debug,
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
} from "@react-three/rapier";
import * as THREE from "three";

export default function Experience() {
  const [hitSound] = useState(() => new Audio("./hit.mp3"));
  console.log(hitSound);
  const cubeRef = useRef();
  const twister = useRef();

  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state) => {
    //rotate on each frame
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    //position on a circle
    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = () => {
    // console.log("collision");
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  const cubeJump = () => {
    const mass = cubeRef.current.mass();
    // console.log("jump");
    cubeRef.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }); //this will make the cube jump on the y axis
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
      <Physics gravity={[0, -9.81, 0]}>
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
        <RigidBody
          position={[1.5, 2, 0]}
          ref={cubeRef}
          friction={0}
          colliders={false}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={}
          // onSleep={}
          // onWake={}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh scale={[0.4, 0.4, 3]} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 4, 0]} colliders={false}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>
      </Physics>
    </>
  );
}
