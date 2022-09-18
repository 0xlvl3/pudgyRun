//position = { x: 0, y: 0 }
export default class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };

    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    // if (!this.image.complete) return;
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
