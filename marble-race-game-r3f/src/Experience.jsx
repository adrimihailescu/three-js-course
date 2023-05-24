// import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import { Physics, Debug } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });
  const blockSeed = useGame((state) => {
    return state.blockSeed;
  });
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
