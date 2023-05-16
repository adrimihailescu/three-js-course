import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [matCapTexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
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
          <meshMatcapMaterial matcap={matCapTexture} />
        </Text3D>
      </Center>
      {[...Array(100)].map((value, index) => (
        <mesh
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <torusGeometry args={[1, 0.6, 16, 32]} />
          <meshMatcapMaterial matcap={matCapTexture} />
        </mesh>
      ))}
    </>
  );
}
