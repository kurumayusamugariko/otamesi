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
	name: "Draggle"
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
	animate: true,
	name: "Emby"
});
const renderedSprites = [draggle, emby];
function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

	renderedSprites.forEach(sprite => {
		sprite.draw();
	});
}
// animate();
animateBattle();

//our event listeners for our buttons(attack)
document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", (e) => {
		const selectedAttack = attacks[e.currentTarget.innerHTML];
		emby.attack({
			attack: selectedAttack,
			recipient: draggle,
			renderedSprites
		});
	});
});

document