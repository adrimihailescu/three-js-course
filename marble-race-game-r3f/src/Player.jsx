import { RigidBody } from "@react-three/rapier";

export default function Player() {
  return (
    <>
      <RigidBody
        position={[0, 1, 0]}
        colliders="ball"
        friction={1}
        restitution={0.2}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
