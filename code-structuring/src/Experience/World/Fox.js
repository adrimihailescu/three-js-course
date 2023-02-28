import Experience from "../Experience";
import * as THREE from "three";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    // console.log(this.resources);

    //Setup
    this.resource = this.resources.items.foxModel;
    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    // console.log(this.model);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.action = this.animation.mixer.clipAction(
      this.resource.animations[0] //use the first animation
    );
    this.animation.action.play();
    // console.log(this.animation);
  }

  update() {
    // console.log("updating the fox");
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
