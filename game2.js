const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);

//map画像objを作成
const image = new Image();
image.src = './public/metamon/metown.png';

//player画像objを作成
const playerImage = new Image();
playerImage.src = './public/metamon/player/playerDown.png';

//画像を読み込んだら描画

//playerのアニメーション
class Sprite {
	constructor({position, velocity, image}){
		this.position = position;
		this.image = image;
	}

	draw(){
		c.drawImage(this.image, -544, -1450);
	}
}

const background = new Sprite({
	position: {x: -544, y: -1450},
	image: image,
});

const keys = {
	w:{
		pressed: false,
	},
	a:{
		pressed: false,
	},
	s:{
		pressed: false,
	},
	d:{
		pressed: false,
	},
};

function animate() {
	window.requestAnimationFrame(animate);
	background.draw();
	c.drawImage(
		playerImage,
		0,
		0,
		playerImage.width / 4,
		playerImage.height,
		canvas.width/2 - (playerImage.width/4)/2,
		canvas.height/2 - playerImage.height/2,
		playerImage.width / 4,
		playerImage.height
	)
}
animate();

//キーボード操作
window.addEventListener('keydown', (e) => {
	console.log(e)
	switch(e.key){
		case 'ArrowUp' || 'w':
			console.log('up');
			break;
		case 'ArrowDown' || 's':
			console.log('down');
			break;
		case 'ArrowLeft' || 'a':
			console.log('left');
			break;
		case 'ArrowRight' || 'd':
			console.log('right');
			break;
	};
});