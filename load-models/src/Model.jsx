import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function Model() {
  const model = useLoader(
    GLTFLoader,
    "./FlightHelmet/glTF/FlightHelmet.gltf",
    (loader) => {
      // console.log(loader);
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );
  console.log(model);
  return <primitive object={model.scene} scale={5} position-y={-1} />;
}
