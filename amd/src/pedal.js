import { ClickeableObject } from "./utils";
export class Pedal extends ClickeableObject{
  constructor(callback, posicion = [190, 400]) {
    
    super(callback, posicion, [50, 55], 20);
    this.loop = null;
  }

  getState() {
    return this.clicked;
  }

  // funcion para depurar
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
}
