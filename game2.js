const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 80) {
  collisionsMap.push(collisions.slice(i, 80 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 80) {
  battleZonesMap.push(battleZonesData.slice(i, 80 + i));
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

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(battleZones);

//map画像objを作成
const image = new Image();
image.src = "./public/metamon/metown.png";

//map画像objを作成
const foregroundImage = new Image();
foregroundImage.src = "./public/metamon/foreground.png";

//player画像objを作成
const playerDownImage = new Image();
playerDownImage.src = "./public/metamon/player/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./public/metamon/player/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./public/metamon/player/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./public/metamon/player/playerRight.png";

//playerの初期位置
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
		hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
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

const moveables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;

  console.log(animationId);
  if (battle.initiated) return;
  //activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.1 //10%の確率でバトルスタート
      ) {
        //バトルスタートアニメーション
        console.log("battle start");

        //deactivate a current animation loop
        window.cancelAnimationFrame(animationId);
        battle.initiated = true;

        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete: () => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
							onComplete: () => {
								//activate a new animation loop
								animateBattle();
								gsap.to("#overlappingDiv", {
									opacity: 0,
									duration: 0.4,
								});
							},
            });

          },
        });
        break;
      }
    }
  }

  //playerの移動。まぁ動かしてるのは背景だけど
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;

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
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;

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
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;

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
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;

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
              y: boundary.position.y,
            },
          },
        })
      ) {
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
// animate();

const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./public/metamon/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

//敵の画像objを作成
const draggleImage = new Image();
draggleImage.src = "./public/metamon/monster/draggleSprite.png";
const draggle = new Sprite({
	position :{
		x: 800,
		y: 100,
	},
	image: draggleImage,
	frames: {
		max: 4,
		hold: 30
	},
	animate: true,
	isEnemy: true,
});

const embyImage = new Image();
embyImage.src = "./public/metamon/monster/embySprite.png";
const emby = new Sprite({
	position :{
		x: 280,
		y: 325,
	},
	image: embyImage,
	frames: {
		max: 4,
		hold: 30
	},
	animate: true
});

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
	draggle.draw();
	emby.draw();
}
// animate();
animateBattle();

document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", () => {
		emby.attack({
			attack: {
				name: "Tackle",
				damage: 10,
				type: "Normal",
			},
			recipient: draggle
		});
	});
});

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
