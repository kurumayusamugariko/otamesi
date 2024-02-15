const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
let flag = 0;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 80) {
  collisionsMap.push(collisions.slice(i, 80 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 80) {
  battleZonesMap.push(battleZonesData.slice(i, 80 + i));
}

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 80) {
  charactersMap.push(charactersMapData.slice(i, 80 + i));
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

const characters = [];
const villagerImg = new Image();
villagerImg.src = "./public/metamon/chara/Idle.png";
const oldmanImg = new Image();
oldmanImg.src = "./public/metamon/chara/oldman.png";
const whoImg = new Image();
whoImg.src = "./public/metamon/player/playerDown.png";
const itemImg = new Image();
itemImg.src = "./public/metamon/chara/kira.png";
const metamonImg = new Image();
metamonImg.src = "./public/metamon/chara/toumetamon.png";

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //1026は牧場主
    if (symbol === 1026) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          animate: true,
          dialogue: [
            "メタモンを探している？すまないが、いまは探し物で忙しいんだ。\n草むらを歩いているときに落としてしまったのか？",
            "本当に見つからない！いったいどこで落としたんだ。\n釣り小屋に行った時には確かにあったのに...",
            "それは僕の大事な「かわらずのいし」！！君が見つけてくれたのか！ありがとう！！\nああ、もうこんな時間か。気を付けておうちに帰るんだよ",
          ],
        })
      );
      //1031は老人
    } else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: oldmanImg,
          frames: {
            max: 4,
            hold: 150,
          },
          scale: 3,
          dialogue: [
            "良い釣り日和だ。I LOVE コイキング",
            "牧場主さん？彼なら僕と話した後、北西の花畑に行ってたよ。落とし物見つかるといいね",
            "さて今日はここまでかな。帰って飯の支度でもするか",
          ],
          animate: true,
        })
      );
    } else if (symbol === 1099) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: whoImg,
          frames: {
            max: 4,
            hold: 80,
          },
          scale: 1,
          dialogue: ["...?", "...?", "...?"],
        })
      );
    } else if (symbol === 1001) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: itemImg,
          frames: {
            max: 4,
            hold: 80,
          },
          scale: 3,
					animate: true,
          dialogue: [
            "牧場主の落とし物を拾った",
            "牧場主の落とし物を拾った",
            "牧場主の落とし物を拾った",
          ],
        })
      );
    } else if (symbol === 9999) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: metamonImg,
          frames: {
            max: 1,
            hold: 80,
          },
          scale: 1,
          dialogue: [
            "",
            "",
            "めためたもんもん",
          ],
        })
      );
    }

    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

const metamon = boundaries[494];
if(!flag==2){
	characters[3].scale = 0;
}


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
    hold: 10,
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

 moveables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters,
];

const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground,
];

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  renderables.forEach((renderable) => {
    renderable.draw();
  });

  let moving = true;
  player.animate = false;

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
        Math.random() < 0.03 //3%の確率でバトルスタート
      ) {
        //deactivate a current animation loop
        window.cancelAnimationFrame(animationId);

        audio.Map.stop();
        audio.initBattle.play();
        audio.Battle.play();

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
                initBattle();
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

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
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

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 },
    });

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

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 },
    });

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

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 },
    });

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

let lastKey = "";
//キーボード操作
window.addEventListener("keydown", (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case " ":
        // player.interactionAsset.dialogueIndex++;

        //会話切り替え

        // if (dialogueIndex <= dialogue.length - 1) {
        //   document.querySelector("#characterDialogueBox").innerHTML =
        //     player.interactionAsset.dialogue[dialogueIndex].replace(/\n/g, "<br>");
        //   return;
        // }

        //finish conversation
        player.isInteracting = false;
        // player.interactionAsset.dialogueIndex = 0;
        document.querySelector("#characterDialogueBox").style.display = "none";

        if (
          player.interactionAsset.dialogue[flag] === "牧場主の落とし物を拾った"
        ) {
          boundaries.splice(492, 1);
          characters[1].image.src = "";
          characters[1].dialogue = "";
          flag = 2;
        }
        if (player.interactionAsset.dialogue[flag].indexOf("それは")>=0) {
					characters[3].scale = 1;
        }

				if (player.interactionAsset.dialogue[flag]===("めためたもんもん")) {
					gsap.to("#clearscreen", {opacity:1, duration: 3});
					gsap.fromTo("#roll",{opacity:0,y:350},{opacity:1, y:220,duration: 3, delay: 3});
					gsap.to("#endimg", {autoAlpha: 1, duration: 5, delay: 9});
        }

        break;
    }
    return;
  }

  switch (e.key) {
    case " ":
      const { dialogue, id } = player.interactionAsset;
      if (!player.interactionAsset || player.interactionAsset.dialogue[flag] === "") return;
      //会話スタート
      let Message = player.interactionAsset.dialogue[flag].replace(
        /\n/g,
        "<br>"
      );
      document.querySelector("#characterDialogueBox").innerHTML = Message;
      document.querySelector("#characterDialogueBox").style.display = "flex";
      player.isInteracting = true;
      break;
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

//画面をクリックして音楽を再生
let clicked = false;
addEventListener("click", () => {
	gsap.to("#startscreen", {opacity:0, duration: 3});
	console.log("こんにちは")
	characters[3].scale = 0;
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
});
