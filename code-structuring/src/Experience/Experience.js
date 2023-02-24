import Sizes from "./Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    window.experience = this;

    this.canvas = canvas;
    // console.log(this.canvas);
    this.sizes = new Sizes();
    // console.log(devicePixelRatio);
    this.sizes.on("resize", () => {
      // console.log("i heard a resize");
      this.resize();
    });
  }
  resize() {
    console.log("a resize has ocurred");
  }
}
