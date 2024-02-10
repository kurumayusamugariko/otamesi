const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 80) {
  collisionsMap.push(collisions.slice(i, 80 + i));
}

class Boundary {
  static width = 48.2;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 20;
  }
	//当たり判定の描画
  draw() {
    c.fillStyle = rgba(255, 0, 0, 0);//透明
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: -544,
  y: -1480,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

//map画像objを作成
const image = new Image();
image.src = "./public/metamon/metown.png";

//player画像objを作成
const playerImage = new Image();
playerImage.src = "./public/metamon/player/playerDown.png";

//画像を読み込んだら描画

//playerのアニメーション
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

//playerの初期位置
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const moveables = [background, ...boundaries];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();

	let moving = true;
  //playerの移動。まぁ動かしてるのは背景だけど
  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
      //player当たり判定
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x,
							y: boundary.position.y + 3
						}
				}
        })
      ) {
        console.log("colliding!");
				moving = false;
				break;
      }
    }

	if (moving)
    moveables.forEach((moveable) => {
      moveable.position.y += 3;
    });
  } else if (keys.a.pressed && lastKey === "a") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
      //player当たり判定
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x + 3,
							y: boundary.position.y
						}
				}
        })
      ) {
        console.log("colliding!");
				moving = false;
				break;
      }
    }

	if (moving)
    moveables.forEach((moveable) => {
      moveable.position.x += 3;
    });
  } else if (keys.s.pressed && lastKey === "s") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
      //player当たり判定
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x,
							y: boundary.position.y - 3
						}
				}
        })
      ) {
        console.log("colliding!");
				moving = false;
				break;
      }
    }

	if (moving)
    moveables.forEach((moveable) => {
      moveable.position.y -= 3;
    });
  } else if (keys.d.pressed && lastKey === "d") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
      //player当たり判定
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
						...boundary, 
						position: {
							x: boundary.position.x - 3,
							y: boundary.position.y
						}
				}
        })
      ) {
        console.log("colliding!");
				moving = false;
				break;
      }
    }

	if (moving)
    moveables.forEach((moveable) => {
      moveable.position.x -= 3;
    });
  }
}
animate();

let lastKey = "";

//キーボード操作
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      keys.w.pressed = false;
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = false;
      break;
    case "ArrowDown":
    case "s":
      keys.s.pressed = false;
      break;
    case "ArrowRight":
    case "d":
      keys.d.pressed = false;
      break;
  }
});
