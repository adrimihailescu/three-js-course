import { useGLTF } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   // console.log(loader);
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco/");
  //   loader.setDRACOLoader(dracoLoader);
  // });
  // console.log(model);
  const model = useGLTF("/hamburger.glb");
  return <primitive object={model.scene} scale={0.35} />;
}
