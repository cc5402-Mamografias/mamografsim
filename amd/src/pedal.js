import { ClickeableObject } from "./utils";
export class Pedal extends ClickeableObject{
  constructor(callback, posicion = [200, 400]) {
    
    super(callback, posicion, [30, 60], 200);
    this.loop = null;
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
}
