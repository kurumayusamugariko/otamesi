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
    c.fillStyle = "rgba(255, 0, 0, 0)";//透明
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}