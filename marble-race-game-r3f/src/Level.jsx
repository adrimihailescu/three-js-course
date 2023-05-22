import * as THREE from "three";

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

export default function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
    </>
  );
}
