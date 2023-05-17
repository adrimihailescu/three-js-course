import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();
  // const donutGroup = useRef();
  const donuts = useRef([]);
  const [matCapTexture] = useMatcapTexture("46804D_CBE9AC_90B57C_95D38F", 256);

  useEffect(() => {
    matCapTexture.encoding = THREE.sRGBEncoding;
    matCapTexture.needsUpdate = true;
    material.matcap = matCapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    // console.log(delta);
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matCapTexture} /> */}

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
      {/* <group ref={donutGroup}> */}
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => (donuts.current[index] = element)}
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
      {/* </group> */}
    </>
  );
}
