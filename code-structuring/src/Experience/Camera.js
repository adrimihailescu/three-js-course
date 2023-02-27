import * as THREE from "three";
import Experience from "./Experience";

export default class Camera {
  //add this experience as parameter to the constructor to have access to it if this is used as parameter in Camera
  constructor() {
    // console.log("My camera");
    //access Experience class through global variable
    // this.experience = window.experience;
    // console.log(this.experience.sizes.width);
    //access Experience class from a parameter - 'this' added to the camera class in Experience class
    //   this.experience = experience;
    //   console.log(this.experience.sizes.width);

    //singleton option
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // console.log(this);
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
}
