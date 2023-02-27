import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";

let instance = null;
export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    //Global access
    window.experience = this;

    this.canvas = canvas;
    // console.log(this.canvas);
    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    //this will serve as a parameter to have access to the experience
    // this.camera = new Camera(this);
    this.camera = new Camera();
    this.renderer = new Renderer();
    // console.log(devicePixelRatio);
    //Sizes resize event
    this.sizes.on("resize", () => {
      // console.log("i heard a resize");
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    // console.log("a resize has ocurred");
    this.camera.resize();
  }
  update() {
    // console.log("update the experience");
    this.camera.update();
  }
}
