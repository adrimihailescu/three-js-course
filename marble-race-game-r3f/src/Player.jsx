import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  //create reference to the ball/marble so we can interact with it
  const ball = useRef();

  const jump = () => {
    //calculate the origin of the ball or how hight it is from the floor
    const origin = ball.current.translation();
    origin.y -= 0.31;
    //

    // console.log("yes,Jump!");
    ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 }); //make the ball jump
  };
  useEffect(() => {
    subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
  }, []);
  useFrame((state, delta) => {
    //get the keys
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 1 * delta;
    const torqueStrength = 1 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.z += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    ball.current.applyImpulse(impulse);
    ball.current.applyTorqueImpulse(torque);
  });
  return (
    <>
      <RigidBody
        ref={ball}
        position={[0, 1, 0]}
        colliders="ball"
        linearDamping={0.5} // this will help the ball to stop and easier to control with the keyboard
        angularDamping={0.5}
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
