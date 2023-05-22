import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

//deactivate legacyMode on Three.js to set the same encoding for R3F
THREE.ColorManagement.legacyMode = false;

//create geometry outside of the component
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//create material outside of the component
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/**
       * Floor
       */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}
function BLockSpinner({ position = [0, 0, 0] }) {
  //create reference to the obstacle we want to animate
  const obstacle = useRef();
  //save speed in state
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1) //prevent the speed from being too slow; make rotation go both ways
  );

  //update the animation on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });
  return (
    <group position={position}>
      {/**
       * Floor
       */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
      {/**
       * moving obstacle
       */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
function BlockLimbo({ position = [0, 0, 0] }) {
  //create reference to the obstacle we want to animate
  const obstacle = useRef();
  // console.log(obstacle);
  //save speed in state
  const [timeOffset] = useState(
    () => Math.random() * Math.PI * 2 //prevent the speed from being too slow; make rotation go both ways
  );

  //update the animation on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });
  return (
    <group position={position}>
      {/**
       * Floor
       */}
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        receiveShadow
        scale={[4, 0.2, 4]}
      />
      {/**
       * moving obstacle
       */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 8]} />
      <BLockSpinner position={[0, 0, 4]} />
      <BlockLimbo position={[0, 0, 0]} />
    </>
  );
}
