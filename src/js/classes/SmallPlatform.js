import Sprite from "../classes/Sprite.js";

export default class SmallPlatform extends Sprite {
  constructor() {
    super(
      (position = { x: 0, y: 0 }),
      imageSrc,
      (frames = { max: 1 }),
      (offset = { x: 0, y: 0 })
    );
    this.position = {
      x,
      y,
    };

    this.width = image.width;
    this.height = image.height;
  }
}

// export default class Enemy extends Sprite {
//     constructor({ position = { x: 0, y: 0 } }) {
//       super(
//         {
//           position,
//         },
//         "/img/orc.png",
//         {
//           max: 7,
//         }
//       );
