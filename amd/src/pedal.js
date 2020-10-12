export class Pedal {
  constructor(hook, posicion = [200, 400], tipo = "up") {
    this.hook = hook;
    this.posicion = posicion;
    this.boundingBox = [30, 60];
    this.clicked = false;
    this.loop = null;
  }

  on_click() {
    this.clicked = true;
    this.hook();
    this.loop = setInterval(this.hook, 200);
  }

  on_release() {
    this.clicked = false;
    clearInterval(this.loop);
  }

  dibujar(ctx) {
    ctx.fillStyle = "blue";

    if (this.clicked) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.posicion[0],
      this.posicion[1],
      this.boundingBox[0],
      this.boundingBox[1]
    );
  }

  isClicked(click) {
    console.log(
      `check if clicked: ${click} - ${this.posicion} - ${this.boundingBox}`
    );
    return !(
      click[0] < this.posicion[0] ||
      click[0] > this.posicion[0] + this.boundingBox[0] ||
      click[1] < this.posicion[1] ||
      click[1] > this.posicion[1] + this.boundingBox[1]
    );
  }
}
