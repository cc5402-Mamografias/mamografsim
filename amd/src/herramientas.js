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

  dibujar_resultado(){
    throw new TypeError("Do not call abstract method dibujar_resultados from child");
  }

  getTipo() {
    return this.tipo;
  }

  getAltura() {
    return this.altura;
  }
}

class BaseNula extends AbstractTool {
  constructor() {
    super();
    this.tipo = "null";
    this.estado = "null";
    this.altura = 0;
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
    this.altura = 5;
    this.estado = "inactivo";
    this.fuerza = 0;
  }

  actualizar(estado) {
    if (estado.fuerza != 0) {
      this.fuerza = estado.fuerza;
      this.estado = "activo";
    } else {
      this.fuerza = 0;
      this.estado = "inactivo"
    }
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
  
  dibujar_resultado(ctx) {
    if (this.estado = "activo"){
      ctx.font = "30px Arial";
      ctx.fillText(fuerza.toString(), 10, 50);
    }
  } 
}

class CamaraIonizacion extends AbstractTool {
  constructor() {
    super();
    this.tipo = "camIonizacion";
    this.icon = "ionizador.png";
    this.estado = "inactivo";
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
    ctx.fillStyle = "yellow";
    ctx.fill();
  }

  dibujar_resultado(ctx) {

  }
}

class Electrometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "electrometro";
    this.icon = "box.png";
    this.estado = "inactivo";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Electrometro go brrrr");
  }

  dibujar(ctx) {
    //var img =
    //ctx.drawImage(img, 10, 10);
    /*ctx.beginPath();
    ctx.arc(200, 50, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();*/
  }

  dibujar_resultado(ctx) {
    
  }
}

class Termometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "termometro";
    this.image = new Image();
    this.image.src = "icons/thermometer.png";
    this.icon = "thermometer.png";
    this.estado = "inactivo";
  }

  actualizar(estado) {
    // TODO
    console.log("haha Termometro go brrrr");
  }

  dibujar(ctx) {
    // var img = obtener imagen de la herramienta
    // ctx.drawImage(img, 10, 10);
    ctx.beginPath();
    // ctx.arc(95, 50, 20, 0, 2 * Math.PI);
    ctx.drawImage(this.image, 95, 50, 50, 50);
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();
  }

  dibujar_resultado(ctx) {
    
  }
}

class Barometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "barometro";
    this.icon = "barometer.png";
    this.estado = "inactivo";
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

  dibujar_resultado(ctx) {
    
  }
}

class CintaMetrica extends AbstractTool {
  constructor() {
    super();
    this.tipo = "cinta";
    this.icon = "tape.png";
    this.estado = "inactivo";
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

  dibujar_resultado(ctx) {
    
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
