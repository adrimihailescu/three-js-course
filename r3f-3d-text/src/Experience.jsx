import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState } from "react";

export default function Experience() {
  const [torusGeometry, setTorusGeometry] = useState();
  const [material, setMaterial] = useState();
  const [matCapTexture] = useMatcapTexture("46804D_CBE9AC_90B57C_95D38F", 256);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matCapTexture} />

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          sie={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelOffset={0}
          bevelSegments={5}
          bevelSize={0.02}
        >
          Hello R3F
          {/* <meshMatcapMaterial matcap={matCapTexture} /> */}
        </Text3D>
      </Center>
      {[...Array(100)].map((value, index) => (
        <mesh
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
