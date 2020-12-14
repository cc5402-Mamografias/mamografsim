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

    this.altura = 0;
  }

  actualizar(estado) {
    throw new TypeError("Do not call abstract method actualizar from child");
  }

  dibujar() {
    throw new TypeError("Do not call abstract method dibujar from child");
  }

  getResultado() {
    return {};
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
    // Undefined method
  }

  dibujar() {
    // Undefined method
  }
}

class Balanza extends AbstractTool {

  constructor() {
    super();
    this.toalla = false;
    this.tipo = "Balanza";
    this.icon = "balanza.png";
    this.altura = 5;
    this.estado = "inactivo";
    this.fuerza = 0;
    this.scale = 0.5;
    this.x = 152;
    this.y = 265;
    this.description = "Esta es una balanza.";
    this.notoalla = new Image();
    this.notoalla.src = 'img/balanza.svg';
    this.sitoalla = new Image();
    this.sitoalla.src = 'img/balanzatoalla.svg';

    this.balanza = this.notoalla
  }

  actualizar(estado) {
    if (estado.fuerza != 0) {
      this.fuerza = estado.fuerza;
      this.estado = "activo";
    } else {
      this.fuerza = 0;
      this.estado = "inactivo";
    }
  }

  dibujar(ctx) {
    ctx.drawImage(this.balanza, this.x, this.y, this.balanza.width * this.scale, this.balanza.height * this.scale);
  }

  getResultado() {
    if (this.toalla == false && this.fuerza != 0) {
      return { balanza: ["ADVERTENCIA: ¡Se está comprimiendo balanza sin toalla!"] };

    }
    else {
      return { balanza: ["Balanza: " + this.fuerza.toFixed(2) + " Kg."] };
    }

  }
}

class Toalla extends AbstractTool {
  constructor() {
    super();
    this.addon = true;
    this.tipo = "Toalla";
    this.icon = "towel.png";
    this.altura = 5;
    this.scale = 0.5;
    this.x = 152;
    this.y = 265;
    this.description = "Poner la toalla encima de la balanza.";

    //this.toalla = new Image();
    //this.toalla.src = 'img/balanzatoalla.svg';

  }

  action(maquina) {
    if (maquina.herramienta.tipo == "Balanza") {
      let balanza = maquina.herramienta
      if (!balanza.toalla) {
        //balanza.balanza = new Image();
        //balanza.balanza.src = 'img/balanzatoalla.svg';
        balanza.balanza = balanza.sitoalla;
        balanza.toalla = true;
      }
      else {
        //balanza.balanza = new Image();
        //balanza.balanza.src = 'img/balanza.svg';
        balanza.balanza = balanza.notoalla;
        balanza.toalla = false;
      }

      maquina.actualizar();
      console.log("balanza: ", balanza);
    }
  }
  actualizar(ctx) {
    //nada
  }
  dibujar(ctx) {
    //nada
  }

}

class Slab_20mm extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Slab(20 mm)";
    this.icon = "slabs.png";
    this.estado = "inactivo";
    this.fuerza = 0;
    this.description = "Estos son unos slabs.";
    this.altura = 2.0;

    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    this.slabs.src = 'img/slab20.svg';

  }

  actualizar(estado) {
    // nada
  }

  dibujar(ctx) {
    ctx.drawImage(this.slabs, this.x, this.y, this.slabs.width * this.scale, this.slabs.height * this.scale);
  }

  getResultado() {
    return { slab20: ["Altura Slabs: " + this.getAltura() * 10 + " mm."] };
  }
}
class Slab_45mm extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Slab(45 mm)";
    this.icon = "slabs.png";
    this.altura = 4.5;

    // pasar parametros a vista?
    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    //nuevo sprite aca
    this.slabs.src = 'img/slab45.svg';

  }

  actualizar(estado) {
    // nada
  }

  dibujar(ctx) {
    ctx.drawImage(this.slabs, this.x, this.y, this.slabs.width * this.scale, this.slabs.height * this.scale);
  }

  getResultado() {
    return { slab45: ["Altura Slabs: " + this.getAltura() * 10 + " mm."] };
  }
}

class Slab_70mm extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Slab(70 mm)";
    this.icon = "slabs.png";
    this.altura = 7.0;

    // pasar parametros a vista?
    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    //nuevo sprite aca
    this.slabs.src = 'img/slab70.svg';

  }

  actualizar(estado) {
    // nada
  }

  dibujar(ctx) {
    ctx.drawImage(this.slabs, this.x, this.y, this.slabs.width * this.scale, this.slabs.height * this.scale);
  }

  getResultado() {
    return { slab70: ["Altura Slabs: " + this.getAltura() * 10 + " mm."] };
  }
}

class DetectRad extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Detector de Radiación";
    this.icon = "ionizador.png";
    this.estado = "inactivo";
    this.description = "Esta es una camara de ionizacion.";
    this.colocada = false;
    this.kerma = null;
    this.result = [
      "Detector de Radiación",
      "NADA"
    ];

    this.scale = 0.5;
    this.x = 130;
    this.y = 230;
    this.sprite = new Image();
    this.sprite.src = 'img/detector.svg';
  }
  colocar(bool) {
    this.colocada = bool;
  }


  actualizar(estado) {

    if (estado.activo && this.colocada) {

      let request = {
        "kvp": estado.kilovolt,
        "mas": estado.miliamperios,
        "anodo": estado.anodo,
        "filtro": estado.filtro,
      };

      $.ajax({
        url: "http://moodle2.cimt.cl/api/kerma",
        type: "get",
        data: request,
        async: false,
        success: (data) => {
          this.kerma = data.kerma;
        }
      });
    }

    this.estado = estado.activo ? "activo" : "inactivo";
  }

  actualizar_default() {
    this.kerma = null;
  }

  dibujar(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.scale, this.sprite.height * this.scale);
  }
  getResultado() {

    if (this.colocada == true && this.estado == "activo") {
      return {
        detector: [
          "Detector de Radiación",
          "\t\t\tKerma: " + this.kerma.toFixed(2) + " mGy"
        ]
      }
    }
    else if (!this.colocada && this.estado) {
      return {
        camara: ["Detector de Radiación",
          "NADA"
        ]
      }
    }

    else {
      this.actualizar_default();
      return {
        camara: this.result
      }
    }
  }

  estaColocada() {
    return this.colocada;
  }
}

class Termometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Termómetro";
    this.icon = "thermometer.png";
    this.estado = "inactivo";
    this.description = "Este es un termometro.";
    this.termometro = new Image();
    this.termometro.src = 'img/thermometer.svg';
    this.x = 10;
    this.y = 10;
    this.scale = 0.18;
    this.temperatura = 22;
  }

  actualizar(estado) {
    this.temperatura = estado.temperatura;
  }

  dibujar(ctx) {
    ctx.drawImage(this.termometro, this.x, this.y, this.termometro.width * this.scale, this.termometro.height * this.scale);
  }

  getResultado() {
    return { termometro: ["Temperatura: " + this.temperatura + " °C"] };
  }

}

class Barometro extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Barómetro";
    this.icon = "barometer.png";
    this.estado = "inactivo";
    this.description = "Este es un barometro.";
    this.barometro = new Image();
    this.barometro.src = "img/barometer.svg";
    this.scale = 0.15;
    this.x = 33;
    this.y = 13;
    this.presion = 1013;
  }

  actualizar(estado) {
    this.presion = estado.presion;
  }

  dibujar(ctx) {
    ctx.drawImage(this.barometro, this.x, this.y, this.barometro.width * this.scale, this.barometro.height * this.scale);
  }

  getResultado() {
    return { barometro: ["Presión: " + this.presion + " hPa"] };
  }
}

class Fantoma extends AbstractTool {

  constructor(visor) {
    super();
    this.tipo = "Fantoma";
    this.icon = "fantoma.png";
    this.estado = "inactivo";
    this.description = "Este es un fantoma.";
    this.parametros = false;
    this.colocada = false;
    this.presionado = false;

    this.altura = 4.5;
    this.result = [
      "Ver Imagen",
      "Error de Posición",
      "Error de Parámetros",
      "Error de Presión",
      "Imagen no disponible",
      "Error de Posición y Parámetros",
      "Error de Posición y Presión",
      "Error de Parámetros y Presión",
      "Error de Posición, Parámetros y Presión"
    ];
    this.scale = 0.5;
    this.x = 152;
    this.y = 250;
    this.sprite = new Image();
    this.sprite.src = 'img/fantoma45_contraste.svg';
    this.visor = visor;
    this.last_result = null;
  }

  colocar(bool) {
    this.colocada = bool;
  }

  actualizar(estado) {
    console.log(estado);

    //Se esta presionando al fantoma con una fuerza apropiada
    if (7 <= parseInt(estado.fuerza) && parseInt(estado.fuerza) <= 13) {
      this.presionado = true;
    }
    else {
      this.presionado = false;
    }

    //La configuracion en el panel de control es la adecuada
    if (parseInt(estado.kilovolt) === 28 && parseInt(estado.miliamperios_nom) === 100) {
      this.parametros = true;
    }
    else {
      this.parametros = false;
    }

    //Se ha disparado en el panel de control
    if (estado.activo) {
      this.visor.reset();
      this.img = null;
      this.last_result = null;
      this.estado = "activo";

      if (this.parametros && this.presionado && this.colocada) {
        let request = { // hay que ver la manera de que estos parametros cambien!
          "imagen": "objeto_contraste",
          "mancha": "2",
          "lineas": "4",
          "l_sentido": "ver",
          "ruido": "4"
        };

        $.ajax({
          url: "http://localhost:5000/prueba_imagen",
          type: "get",
          data: request,
          async: false,
          success: (data) => {
            this.img = data;
            this.visor.load_image(data);
          },
          error: (e) => {
            console.log(e)
          }
        });
      }
    }

    else {
      this.estado = "inactivo";
    }
  }

  dibujar(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.scale, this.sprite.height * this.scale);
  }

  getResultado() {
    var result = null;

    if (this.last_result !== null) {
      var p = this.visor.get_results();
      result = { fantoma: ["Fantoma: ", this.last_result] }

      if (p[0] !== null) {
        var circ1 = $(`<div style="color:red"> circulo 1 - VPM: ${p[0][0]} - std: ${p[0][1]} </div>`);
        circ1.on("click", () => { this.visor.show() })
        result = { ...result, circ1: circ1 }
      }

      if (p[1] !== null) {
        var circ2 = $(`<div style="color:blue"> circulo 2 - VPM: ${p[1][0]} - std: ${p[1][1]} </div>`);
        circ2.on("click", () => { this.visor.show() })
        result = { ...result, circ2: circ2 }
      }
      return result;
    }

    if (this.estado == "activo") {
      if (this.parametros && this.presionado && this.colocada) {

        if (this.img !== null) {
          var im = new Image(120, 160);
          im.src = this.img;
          im.style.display = "block";
          im.style.margin = "auto";
          im.onclick = () => { this.visor.show() };
          result = im;
          this.last_result = result;
        }
        else {
          this.last_result = null;
          throw "No se obtuvo la imagen";
        }
      }
      else {
        this.last_result = null;

        if (this.parametros && this.presionado && !this.colocada) {
          result = "Error de Posición";
        }
        else if (this.parametros && !this.presionado && this.colocada) {
          result = "Error de Presión";
        }
        else if (this.parametros && !this.presionado && !this.colocada) {
          result = "Error de Posición y Presión";
        }
        else if (!this.parametros && this.presionado && this.colocada) {
          result = "Error de Parámetros";
        }
        else if (!this.parametros && !this.presionado && this.colocada) {
          result = "Error de Parámetros y Presión";
        }
        else if (!this.parametros && this.presionado && !this.colocada) {
          result = "Error de Parámetros y Posición";
        }
        else if (!this.parametros && !this.presionado && !this.colocada) {
          result = "Error de Posición, Parámetros y Presión";
        }
      }
    }
    else {
      result = "Imagen no disponible";
    }

    return { fantoma: ["Fantoma: ", result] };
  }

  estaColocada() {
    return this.colocada;
  }
}

export {
  BaseNula,
  Balanza,
  Toalla,
  Barometro,
  DetectRad,
  Termometro,
  Slab_20mm,
  Slab_45mm,
  Slab_70mm,
  Fantoma
};
