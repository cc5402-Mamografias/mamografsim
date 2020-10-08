// Abstract Herramienta
"use strict";
class AbstractTool {
  constructor() {
    if (this.constructor === AbstractTool) {
      throw new TypeError("Cannot construct abstract class");
    }
    if (this.actualizar === AbstractTool.prototype.actualizar) {
      throw new TypeError("Please implement abstract method actualizar");
    }
    if (this.dibujar === AbstractTool.prototype.dibujar) {
      throw new TypeError("Please implement abstract method dibujar");
    }
  }

  actualizar(estado) {
    throw new TypeError("Do not call abstract method actualizar from child");
  }

  dibujar() {
    throw new TypeError("Do not call abstract method dibujar from child");
  }

  getTipo() {
    return this.tipo;
  }
}

class BaseNula extends AbstractTool {
  constructor() {
    super();
    this.tipo = "null";
  }

  actualizar(estado) {
    console.log("haha BaseNula go brrrr");
  }

  dibujar() {
    console.log("dibujar go brrr");
  }
}

class Balanza extends AbstractTool {
  constructor() {
    super();
    this.tipo = "balanza";
    this.icon = "box.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Balanza go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(160, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

class CamaraIonizacion extends AbstractTool {
  constructor() {
    super();
    this.tipo = "camIonizacion";
    this.icon = "ionizador.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Camara de Ionizacion go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(95, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();
  }
}

class Electrometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "electrometro";
    this.icon = "box.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Electrometro go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(200, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();
  }
}

class Termometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "termometro";
    this.icon = "thermometer.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Termometro go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(95, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();
  }
}

class Barometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "barometro";
    this.icon = "barometer.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Barometro go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(95, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "purple";
    ctx.fill();
  }
}

class CintaMetrica extends AbstractTool {
  constructor() {
    super();
    this.tipo = "cinta";
    this.icon = "tape.png";
  }

  actualizar(estado) {
    // TODO
    console.log("haha CintaMetrica go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    ctx.arc(95, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

export {
  BaseNula,
  Balanza,
  Barometro,
  CamaraIonizacion,
  CintaMetrica,
  Electrometro,
  Termometro,
};
