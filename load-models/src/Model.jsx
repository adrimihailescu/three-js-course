import { useGLTF, Clone } from "@react-three/drei";
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
  //loading only when the component renders for the first time
  const model = useGLTF("/hamburger-draco.glb");
  return (
    //CLone component will duplicate/clone the object
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}

//this will preload the model
useGLTF.preload("/hamburger-draco.glb");
