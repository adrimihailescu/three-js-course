import Robot from "./Robot";
export default class FlyingRobot extends Robot {
  constructor(name, legs) {
    super(name, legs);
  }
  sayHi() {
    console.log(`Hello! My name is ${this.name}`);
  }
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }
  land() {
    console.log(`Welcome back! ${this.name}`);
  }
}
