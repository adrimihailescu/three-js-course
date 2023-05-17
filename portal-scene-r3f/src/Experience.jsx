import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
// console.log(portalFragmentShader);

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {/**
         * mesh for pole light A
         */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffff5e" />
        </mesh>
        {/**
         * mesh for pole light B
         */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffff5e" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/**
           * tag made available through extend(), second option of adding a custom shader material
           */}
          <portalMaterial />
          {/**
           * first option for adding a shader material
           */}
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ffffff") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}
        </mesh>

        <Sparkles
          size={6}
          position-y={1}
          scale={(4, 2, 4)}
          speed={0.2}
          count={30}
        />
      </Center>
    </>
  );
}
