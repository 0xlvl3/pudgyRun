import Sprite from "./classes/Sprite.js";
import Player from "./classes/Player.js";
import Platform from "./classes/Platform.js";
import SmallPlatform from "./classes/SmallPlatform.js";
import GenericObject from "./classes/GenericObject.js";

export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");

//16*9
canvas.width = 1024;
canvas.height = 576;

const image = new Image();
image.onload = () => {
  animate();
};
image.src = "../img/background.png";

// function createImage(imageSrc) {
//   const image = new Image();
//   image.src = imageSrc;
//   return image;
// }

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let player = new Player();

let platforms = [];

let smallPlatforms = [];

let genericObjects = [];

let scrollOffset = 0;

function init() {
  player = new Player();

  platforms = [new Platform({ x: 0, y: 470 })];

  smallPlatforms = [
    new SmallPlatform({
      x: 400,
      y: 270,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
    }),
  ];

  scrollOffset = 0;
}

init();
function animate() {
  //recursive loop
  requestAnimationFrame(animate);

  //   c.fillStyle = "white";
  //   c.fillRect(0, 0, canvas.width, canvas.height);
  c.drawImage(image, 0, 0);

  genericObjects.forEach((object) => {
    object.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  smallPlatforms.forEach((small) => {
    small.draw();
  });

  player.update();

  //player movement
  if (keys.right.pressed && player.position.x <= 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    //illuision of moving background, scrolling platform
    if (keys.right.pressed) {
      //code that goes agaisnt other statements to stop things from moving
      scrollOffset += player.speed;

      //keeps platform from moving player moving forward
      platforms.forEach((platform) => {
        platform.draw();

        platform.position.x -= player.speed;
      });

      //keeps platform from moving player moving forwards
      smallPlatforms.forEach((small) => {
        small.draw();

        small.position.x -= player.speed;
      });

      //parallex scroll
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
      //else if below stops us from moving off the left side of screen at start
    } else if (keys.left.pressed && scrollOffset > 0) {
      //code that goes agaisnt other statements to stop things from moving
      scrollOffset -= player.speed;

      //keeps platform from moving player moving backwards
      platforms.forEach((platform) => {
        platform.draw();

        platform.position.x += player.speed;
      });

      //keeps small platform from moving player moving backwards
      smallPlatforms.forEach((small) => {
        small.draw();

        small.position.x += player.speed;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }

    //win condition
    if (scrollOffset > image.width * 4 + 1300) {
      console.log("you win");
    }

    //lose condition
    if (player.position.y > canvas.height) {
      console.log("You lose :(");
      init();
    }
  }

  console.log(scrollOffset);

  //platform collision detection
  platforms.forEach((platform) => {
    platform.draw();

    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  //smalll platform collision detection
  smallPlatforms.forEach((small) => {
    small.draw();

    if (
      player.position.y + player.height <= small.position.y &&
      player.position.y + player.height + player.velocity.y >=
        small.position.y &&
      player.position.x + player.width >= small.position.x &&
      player.position.x <= small.position.x + small.width
    ) {
      player.velocity.y = 0;
    }
  });
}

addEventListener("keydown", ({ key }) => {
  key.toLowerCase();
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = true;
      break;
    case "s":
      console.log("down");
      break;
    case "d":
      keys.right.pressed = true;
      break;
    case "w":
      player.velocity.y -= 25;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  key.toLowerCase();
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = false;
      break;
    case "s":
      console.log("down");
      break;
    case "d":
      keys.right.pressed = false;
      break;
    case "w":
      player.velocity.y = 0;
      break;
  }
});
