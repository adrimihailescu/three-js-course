import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import Debug from "./Utils/Debug.js";
import sources from "./sources";

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
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    //this will serve as a parameter to have access to the experience
    // this.camera = new Camera(this);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
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
    this.renderer.resize();
  }
  update() {
    // console.log("update the experience");
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    //Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        //dispose of the geometry
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug?.ui?.destroy();
    }
  }
}
