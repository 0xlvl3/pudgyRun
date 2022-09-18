import Sprite from "./Sprite.js";

export default class Platform extends Sprite {
  constructor(position = { x: 0, y: 0 }) {
    super({ position }, "../img/platform.png");

    this.position = position;

    this.width = 580;
    this.height = 125;
  }
}
//   draw() {
//     // if (!this.image.complete) return;
//     // c.fillStyle = "blue";
//     // c.fillRect(this.position.x, this.position.y, this.width, this.height);
//     // c.drawImage(this.image, this.position.x, this.position.y);
//   }

// constructor() {
//     super({ x, y, imageSrc }, (frames = { max: 1 }), (offset = { x: 0, y: 0 }));

//     this.position = {
//         x,
//         y,
//     };

//     this.image = imageSrc;
// }
