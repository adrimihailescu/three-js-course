import Experience from "../Experience";
import * as THREE from "three";
import Environment from "./Environment";
import Floor from "./Floor";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // console.log(this.resources);

    // console.log(this.scene);
    //test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    //wait for resources
    this.resources.on("ready", () => {
      // console.log("resources are ready");

      //we can use the resources when everything is loaded
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }
}
