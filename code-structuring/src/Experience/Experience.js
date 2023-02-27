import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class Experience {
  constructor(canvas) {
    window.experience = this;

    this.canvas = canvas;
    // console.log(this.canvas);
    this.sizes = new Sizes();
    this.time = new Time();
    // console.log(devicePixelRatio);
    this.sizes.on("resize", () => {
      // console.log("i heard a resize");
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  update() {
    // console.log("update the experience");
  }
  resize() {
    console.log("a resize has ocurred");
  }
}
