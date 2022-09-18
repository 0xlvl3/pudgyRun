import Sprite from "./Sprite.js";

export default class GenericObject extends Sprite {
  constructor(position = { x: 0, y: 0 }) {
    super({ position }, "../img/hills.png");

    this.position = position;

    this.width = 100;
    this.height = 100;
  }
}
