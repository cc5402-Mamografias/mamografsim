export class ClickeableObject {
  constructor(callback, posicion, boundingBox, loopInterval = 200) {
    this.posicion = posicion;
    this.loopInterval = loopInterval;
    this.boundingBox = boundingBox;
    this.clicked = false;
    this.loop = null;

    this.callback = callback;
  }




  on_click() {
    this.clicked = true;
    this.callback();
    this.loop = setInterval(this.callback, this.loopInterval);
  }

  on_release() {
    this.clicked = false;
    clearInterval(this.loop);
  }

  insideBoundingBox(click) {
    return !(
      click[0] < this.posicion[0] ||
      click[0] > this.posicion[0] + this.boundingBox[0] ||
      click[1] < this.posicion[1] ||
      click[1] > this.posicion[1] + this.boundingBox[1]
    );
  }
}
