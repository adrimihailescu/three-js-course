import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame";

export default function Player() {
  //state to help with lerping(linear interpolation)
  //the 10, 10, 10 values will add a nice animation
  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10)); // will be created just once
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());

  //selector
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  //world variable contains an abstraction of the actual Rapier world
  const { rapier, world } = useRapier();
  // console.log(rapier);
  // console.log(world);
  //the original/native rapier world needed for ray casting
  const rapierWorld = world.raw();
  // console.log(rapierWorld);

  //create reference to the ball/marble so we can interact with it
  const ball = useRef();

  const jump = () => {
    //calculate the origin of the ball or how hight it is from the floor
    const origin = ball.current.translation();
    origin.y -= 0.31; // the sphere radius is 0.3 ; below the ball

    //direction
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    // console.log(hit);
    if (hit?.toi < 0.15) {
      ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 }); //make the ball jump
      // console.log("yes,Jump!");
    }
  };

  //this will reset the game
  const reset = () => {
    ball.current.setTranslation({ x: 0, y: 1, z: 0 });
    ball.current.setLinvel({ x: 0, y: 0, z: 0 });
    ball.current.setAngvel({ x: 0, y: 0, z: 0 });
  };
  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        // console.log("phase changed to", value);
        if (value === "ready") reset();
      }
    );
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    //cleaning up the events
    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    };
  }, []);

  useFrame((state, delta) => {
    //Controls
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

    //Camera
    //retrieve the ball position with translation()
    const ballPosition = ball.current.translation();
    //create the camera and copy the marble position so that the camera moves with the marble
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    //create a camera target, slightly above the marble so we can see the whole level (lookAt())
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    //lerping/linear interpolation- camera will become more realistic and smoother
    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);
    //tell the camera to copy the camera position and to look at above the marble
    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);

    /**
     * Phases
     */
    //check if we've reached the end of the level-checking on each frame
    if (ballPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }
    //if the ball falls outside the level, it will restart
    if (ballPosition.y < -4) {
      // console.log("restart");
      restart();
    }
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
