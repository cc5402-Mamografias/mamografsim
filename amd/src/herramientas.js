// Abstract Herramienta
"use strict";

var pyKerma_server = "http://localhost:5000";
//var pyKerma_server = "http://moodle2.cimt.cl/api";

//funciones aux
//operaciones con resultado entero
function mError(min, max) {
  return random() * (max - min) + min;
}
function elevar(base, exp) {
  return Math.pow(base, exp);
}

//operacion Math.random con seed fijo
var seed = 1;
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

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
    this.prueba = null;
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
    this.description = "Balanza de contrapeso.";
    this.longdescription = "Balanza de contrapeso que se utiliza para medir la compresión real del compresor del mamógrafo. Mide la fuerza en kilogramos.";
    this.notoalla = new Image();
    this.notoalla.src = "img/balanza.svg";
    this.sitoalla = new Image();
    this.sitoalla.src = "img/balanzatoalla.svg";

    this.balanza = this.notoalla;
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
    ctx.drawImage(
      this.balanza,
      this.x,
      this.y,
      this.balanza.width * this.scale,
      this.balanza.height * this.scale
    );
  }

  getResultado() {
    if (this.toalla == false && this.fuerza != 0) {
      return {
        balanza: [
          "<span style='color:red'>ADVERTENCIA:</span> ¡Se está comprimiendo balanza sin toalla!",
        ],
      };
    } else {
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
    this.description = "Toalla para cubrir balanza.";
    this.longdescription = "Toalla que se utiliza para cubrir la balanza antes de que sea comprimida, para evitar daños tanto en la balanza como en el mamñografo.";
  }

  action(maquina) {
    if (maquina.herramienta.tipo == "Balanza") {
      let balanza = maquina.herramienta;
      if (!balanza.toalla) {
        balanza.balanza = balanza.sitoalla;
        balanza.toalla = true;
      } else {
        balanza.balanza = balanza.notoalla;
        balanza.toalla = false;
      }

      maquina.actualizar();
    }
  }
  actualizar(ctx) {
    //nada
  }
  dibujar(ctx) {
    //nada
  }
}

class PlacaExt extends AbstractTool {
  constructor() {
    super();
    this.mesa = true;//se trata de una heeramienta encima de la mesa receptora
    this.tipo = "Placa";
    this.icon = "placa.png";
    this.placa = new Image();
    this.placa.src = "img/placalone.svg";
    this.altura = 0;
    this.scale = 0.5;
    this.x = 130;
    this.y = 230;
    this.description = "Placa protectora de aluminio.";
    this.longdescription = "Placa protectora de aluminio para evitar que el exceso de radiación provocado por la toma de imágenes pueda causar artefactos.";

  }

  actualizar(ctx) {
    //nada
  }
  dibujar(ctx) {
    ctx.drawImage(
      this.placa,
      this.x,
      this.y,
      this.placa.width * this.scale,
      this.placa.height * this.scale
    );
  }
  getResultado() {
    return { placa: [""] };
  }
}

class FiltroAl_03 extends AbstractTool {
  constructor() {
    super();
    this.addon = true;
    this.tipo = "F. Aluminio (0.3 mm)";
    this.icon = "aluminio.png";
    this.altura = 0;
    this.scale = 0.5;
    this.x = 152;
    this.y = 265;
    this.description = "Filtro de aluminio de 0.3 [mm].";
    this.longdescription = "Conjunto apilado de 3 filtros de aluminio de 0.1 [mm] para cubrir el volumen activo del detector de radiación.";

  }

  action(maquina) {
    if (maquina.herramienta.tipo == "Detector de Radiación") {
      let detector = maquina.herramienta;
      if (detector.placa) {
        if ((!detector.filtro) || (detector.filtro && detector.filtroesp != 0.3)) {
          detector.sprite = detector.siplacasifiltro03;
          detector.filtro = true;
          detector.filtroesp = 0.3;
        } else {
          detector.sprite = detector.noplaca;
          detector.filtro = false;
          detector.filtroesp = 0;
        }
      }
      maquina.actualizar();
    }

  }
  actualizar(ctx) {
    //nada
  }
  dibujar(ctx) {
    //nada

  }
}

class FiltroAl_04 extends AbstractTool {
  constructor() {
    super();
    this.addon = true;
    this.tipo = "F. Aluminio (0.4 mm)";
    this.icon = "aluminio.png";
    this.altura = 0;
    this.scale = 0.5;
    this.x = 152;
    this.y = 265;
    this.description = "Filtro de aluminio de 0.4 [mm].";
    this.longdescription = "Conjunto apilado de 4 filtros de aluminio de 0.1 [mm] para cubrir el volumen activo del detector de radiación.";


  }

  action(maquina) {
    if (maquina.herramienta.tipo == "Detector de Radiación") {
      let detector = maquina.herramienta;
      if (detector.placa) {
        if ((!detector.filtro) || (detector.filtro && detector.filtroesp != 0.4)) {
          detector.sprite = detector.siplacasifiltro04;
          detector.filtro = true;
          detector.filtroesp = 0.4;
        } else {
          detector.sprite = detector.noplaca;
          detector.filtro = false;
          detector.filtroesp = 0;
        }
      }
      maquina.actualizar();
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
    this.tipo = "Slab (20 mm)";
    this.icon = "slabs.png";
    this.altura = 2.0;
    this.estado = "inactivo";

    this.parametros = false;
    this.presionado = false;
    this.prueba = null;
    this.miliamperios_auto = 12;

    this.description = "Bloque de PMMA de 20 [mm].";
    this.longdescription = "Conjunto de bloques de PMMA que alineados suman 20 [mm] de altura.";
    

    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    this.slabs.src = "img/slab20.svg";
  }

  actualizar(estado) {
    this.prueba = estado.prueba;
    //comprobamos parametros correctos para disparo
    if ((parseInt(estado.kilovolt) === 27) && (estado.modo == "autotime")){
      this.parametros = true;
    } else {
      this.parametros = false;
    }
    //leemos miliamperios auto de la maquina
    //this.miliamperios_auto = estado.miliamperios_auto_dgm -10;
    //comprobamos altura correcta pa disparo
    if (6 <= parseInt(estado.fuerza) && parseInt(estado.fuerza) <= 10) {
      this.presionado = true;
    } else {
      this.presionado = false;
    }
    this.estado = estado.activo ? "activo" : "inactivo";

  }

  dibujar(ctx) {
    ctx.drawImage(
      this.slabs,
      this.x,
      this.y,
      this.slabs.width * this.scale,
      this.slabs.height * this.scale
    );
  }

  getResultado() {
    var result = null;

    if (this.estado == "activo") {
      if (this.parametros && this.presionado) {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";
        result += "mAs Autotime: " + parseInt(mError(this.miliamperios_auto-2, this.miliamperios_auto+2))+ " mAs.";

      } else {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";

        if (!this.presionado) {
          result +=
            "<span style='color:red'>¡Error de Presión!</span> Debe presionar el fantoma entre 6 y 10 kg.<br>";
        }

        if (!this.parametros) {
          result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije kV en 27 y Modo en Autotime.<br>";
        }
        if (result === "") {
          result += "Error de Posición.";
        }
      }
    } else {
      result = "Altura Slabs: " + this.getAltura() * 10 + " mm.";
    }
    return { slab20: [result] };
  }
}
class Slab_45mm extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Slab (45 mm)";
    this.icon = "slabs.png";
    this.altura = 4.5;
    this.estado = "inactivo";

    this.parametros = false;
    this.presionado = false;
    this.prueba = null;
    this.miliamperios_auto = 60;

    this.description = "Bloque de PMMA de 45 [mm].";
    this.longdescription = "Conjunto de bloques de PMMA que alineados suman 45 [mm] de altura.";
    

    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    this.slabs.src = "img/slab45.svg";
  }

  actualizar(estado) {
    this.prueba = estado.prueba;
    //comprobamos parametros correctos para disparo
    if ((parseInt(estado.kilovolt) === 27) && (estado.modo == "autotime")){
      this.parametros = true;
    } else {
      this.parametros = false;
    }
    //leemos miliamperios auto de la maquina
    //this.miliamperios_auto = estado.miliamperios_auto_dgm;
    //comprobamos altura correcta pa disparo
    if (6 <= parseInt(estado.fuerza) && parseInt(estado.fuerza) <= 10) {
      this.presionado = true;
    } else {
      this.presionado = false;
    }
    this.estado = estado.activo ? "activo" : "inactivo";

  }

  dibujar(ctx) {
    ctx.drawImage(
      this.slabs,
      this.x,
      this.y,
      this.slabs.width * this.scale,
      this.slabs.height * this.scale
    );
  }

  getResultado() {
    var result = null;

    if (this.estado == "activo") {
      if (this.parametros && this.presionado) {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";
        result += "mAs Autotime: " + parseInt(mError(this.miliamperios_auto-2, this.miliamperios_auto+2))+ " mAs.";

      } else {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";

        if (!this.presionado) {
          result +=
            "<span style='color:red'>¡Error de Presión!</span> Debe presionar el fantoma entre 6 y 10 kg.<br>";
        }

        if (!this.parametros) {
          result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije kV en 27 y Modo en Autotime.<br>";
        }
        if (result === "") {
          result += "Error de Posición.";
        }
      }
    } else {
      result = "Altura Slabs: " + this.getAltura() * 10 + " mm.";
    }
    return { slab45: [result] };
  }
}


class Slab_70mm extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Slab (70 mm)";
    this.icon = "slabs.png";
    this.altura = 7.0;
    this.estado = "inactivo";

    this.parametros = false;
    this.presionado = false;
    this.prueba = null;
    this.miliamperios_auto = 140;

    this.description = "Bloque de PMMA de 70 [mm].";
    this.longdescription = "Conjunto de bloques de PMMA que alineados suman 70 [mm] de altura.";
    

    this.scale = 0.5;
    this.x = 152;
    this.y = 250;

    this.slabs = new Image();
    this.slabs.src = "img/slab70.svg";
  }

  actualizar(estado) {
    this.prueba = estado.prueba;
    //comprobamos parametros correctos para disparo
    if ((parseInt(estado.kilovolt) === 27) && (estado.modo == "autotime")){
      this.parametros = true;
    } else {
      this.parametros = false;
    }
    //leemos miliamperios auto de la maquina
    //this.miliamperios_auto = estado.miliamperios_auto_dgm +10;
    //comprobamos altura correcta pa disparo
    if (6 <= parseInt(estado.fuerza) && parseInt(estado.fuerza) <= 10) {
      this.presionado = true;
    } else {
      this.presionado = false;
    }
    this.estado = estado.activo ? "activo" : "inactivo";

  }

  dibujar(ctx) {
    ctx.drawImage(
      this.slabs,
      this.x,
      this.y,
      this.slabs.width * this.scale,
      this.slabs.height * this.scale
    );
  }

  getResultado() {
    var result = null;

    if (this.estado == "activo") {
      if (this.parametros && this.presionado) {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";
        result += "mAs Autotime: " + parseInt(mError(this.miliamperios_auto-2, this.miliamperios_auto+2))+ " mAs.";

      } else {
        result = "Altura Slabs: " + this.getAltura() * 10 + " mm.<br>";

        if (!this.presionado) {
          result +=
            "<span style='color:red'>¡Error de Presión!</span> Debe presionar el fantoma entre 6 y 10 kg.<br>";
        }

        if (!this.parametros) {
          result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije kV en 27 y Modo en Autotime.<br>";
        }
        if (result === "") {
          result += "Error de Posición.";
        }
      }
    } else {
      result = "Altura Slabs: " + this.getAltura() * 10 + " mm.";
    }
    return { slab70: [result] };
  }
}

class DetectRad extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Detector de Radiación";
    this.icon = "ionizador.png";
    this.estado = "inactivo";
    this.description = "Este es un detector de radiación.";
    this.longdescription = "Es un detector de estado sólido que se utiliza para registrar y calcular el kerma en el aire del haz del disparo del mamógrafo. No requiere de un electrómetro y se encuentra a la altura adecuada gracias a que incluye un soporte.";
    //flags estado
    this.colocada = false;
    this.parametros = false;
    this.alturacorrecta = false;
    this.suplementos = false;
    this.placa = false;
    this.filtro = false;
    this.filtroesp = 0;
    this.kerma = null;

    this.scale = 0.5;
    this.x = 130;
    this.y = 230;
    this.errores = {};
    this.noplaca = new Image();
    this.noplaca.src = "img/detector.svg";
    this.siplacasifiltro03 = new Image();
    this.siplacasifiltro03.src = "img/detectorplacayfiltro.svg";
    this.siplacasifiltro04 = new Image();
    this.siplacasifiltro04.src = "img/detectorplacayfiltro04.svg";

    this.sprite = this.noplaca;
  }
  colocar(bool) {
    this.colocada = bool;
  }

  actualizar(estado) {
    this.prueba = estado.prueba;

    //cargamos errores
    this.errores["rep"] = estado.errores.errorrep[0];
    this.errores["lin"] = estado.errores.errorlin[0];
    this.errores["rend"] = estado.errores.errorrend[0];

    this.errores["hem"] = estado.errores.errorhem[0];
    this.errores["dgm"] = estado.errores.errordgm[0];

    if ((parseInt(estado.kilovolt) === 28 || parseInt(estado.kilovolt) === 27)  && estado.modo === "manual") {
      this.parametros = true;
    } else {
      this.parametros = false;
    }

    if (30 <= parseInt(estado.altura) && parseInt(estado.altura) <= 50) {
      this.alturacorrecta = true;
    } else {
      this.alturacorrecta = false;
    }
    //si la placa esta colocada
    this.placa = estado.placa;

    //DISPARO CORRECTO
    if (estado.activo) {
      //blur();
      let request = {
        kvp: estado.kilovolt,
        mas: estado.miliamperios,
        anodo: estado.anodo,
        filtro: estado.filtro,
      };

      $.ajax({
        url: pyKerma_server + "/kerma",
        type: "get",
        data: request,
        async: false,
        success: (data) => {
          this.kerma = data.kerma;
        },
      });

    }

    this.estado = estado.activo ? "activo" : "inactivo";
  }

  actualizar_default() {
    this.kerma = null;
  }

  dibujar(ctx) {
    ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.sprite.width * this.scale,
      this.sprite.height * this.scale
    );
  }
  getResultado() {
    var result = null;
    //DEPENDIENDO DE LA PRUEBA, SE VAN A PEDIR DISTINTOS REQUISITOS ANTES DE DISPARAR, Y SE APLICAN
    //DISTINTOS ERRORES

    //PRUEBA RENDIMIENTO
    if (this.prueba == "rendimiento") {
      if (this.estado == "activo") {
        if (this.colocada) {
          //Primero aplicamos errores al kerma si es que existen
          let kermalin = elevar(this.kerma, 1 + this.errores["lin"]);
          let kermarep =
            kermalin +
            mError(-this.errores["rep"] * kermalin, this.errores["rep"] * kermalin);
          let kermamod = kermarep * (1 - this.errores["rend"]);

          return {
            camara: [
              "Detector de Radiación",
              "\t\t\tKerma: " + kermamod.toFixed(3) + " mGy",
            ],
          }
        }else {
          result = "";
          if (!this.colocada) {
          result +=
            "<span style='color:red'>¡Error de Posición!</span> Coloque el detector adecuadamente.<br>";
          return { camara: ["Detector de Radiación ", result] }
        }
        }
      };
      this.actualizar_default();
      return {
        camara: ["Detector de Radiación", "\t\t\tKerma: " + "-- " + " mGy"],
      };
    }
    //PRUEBA HEMIRREDUCTOR

    if (this.prueba == "hemirreductor") {
      if (this.estado == "activo") {
        if (this.colocada && this.alturacorrecta && this.parametros && this.placa) {
          let kermamod = null;
          if (this.filtroesp === 0.3){
            kermamod = (this.kerma*0.55)*this.errores["hem"];
          }
          else if (this.filtroesp === 0.4){
            kermamod = (this.kerma*0.45)*this.errores["hem"];
          }
          else {
            kermamod = this.kerma;
          }
          let kermamod2= kermamod + mError(-0.05 * kermamod, 0.05 * kermamod)

          return {
            camara: [
              "Detector de Radiación",
              "\t\t\tKerma: " + kermamod2.toFixed(3) + " mGy",
            ],
          }
        }else {
          result = "";
          if (!this.colocada) {
            result +=
            "<span style='color:red'>¡Error de Posición!</span> Coloque el detector adecuadamente.<br>";
          }
          if (!this.alturacorrecta) {
            result +=
            "<span style='color:red'>¡Error de Altura!</span> Desplaze el compresor a una altura adecuada.<br>";
          }
          if (!this.parametros) {
            result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije el Panel de Control kV en 28 y en modo manual.<br>";
          }
          if (!this.placa) {
            result +=
            "<span style='color:red'>¡Error de Placa!</span> Debe colocarse la placa de aluminio antes de disparar.<br>";
          }
          return { camara: ["Detector de Radiación ", result] }
        }
      };
      this.actualizar_default();
      return {
        camara: ["Detector de Radiación", "\t\t\tKerma: " + "-- " + " mGy"],
      };
    }
    //PRUEBA KERMADGM
    if (this.prueba == "kermadgm") {
      if (this.estado == "activo") {
        if (this.colocada  && this.parametros && this.placa) {
          let kermamod = null;
          
          kermamod = this.kerma;
          
          let kermamod2= kermamod + mError(-0.05 * kermamod, 0.05 * kermamod);

          let kermamod3 = this.errores["dgm"]*kermamod2;

          return {
            camara: [
              "Detector de Radiación",
              "\t\t\tKerma: " + kermamod3.toFixed(3) + " mGy",
            ],
          }
        }else {
          result = "";
          if (!this.colocada) {
            result +=
            "<span style='color:red'>¡Error de Posición!</span> Coloque el detector adecuadamente.<br>";
          }
          if (!this.parametros) {
            result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije el Panel de Control kV en 27 y en modo manual.<br>";
          }
          if (!this.placa) {
            result +=
            "<span style='color:red'>¡Error de Placa!</span> Debe colocarse la placa de aluminio antes de disparar.<br>";
          }
          return { camara: ["Detector de Radiación ", result] }
        }
      };
      this.actualizar_default();
      return {
        camara: ["Detector de Radiación", "\t\t\tKerma: " + "-- " + " mGy"],
      };
    }

  };
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
    this.description = "Termómetro de vidrio.";
    this.longdescription = "Termómetro de vidrio que se utiliza para registrar la temperatura del cuarto.";
    this.termometro = new Image();
    this.termometro.src = "img/thermometer.svg";
    this.x = 10;
    this.y = 10;
    this.scale = 0.18;
    this.temperatura = 22;
  }

  actualizar(estado) {
    this.temperatura = estado.temperatura;
  }

  dibujar(ctx) {
    ctx.drawImage(
      this.termometro,
      this.x,
      this.y,
      this.termometro.width * this.scale,
      this.termometro.height * this.scale
    );
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
    this.description = "Barómetro de mercurio.";
    this.longdescription = "Barómetro de mercurio que se utiliza para registrar la presión del cuarto.";
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
    ctx.drawImage(
      this.barometro,
      this.x,
      this.y,
      this.barometro.width * this.scale,
      this.barometro.height * this.scale
    );
  }

  getResultado() {
    return { barometro: ["Presión: " + this.presion + " hPa"] };
  }
}

class CintaMetrica extends AbstractTool {
  constructor() {
    super();
    this.tipo = "Cinta métrica";
    this.icon = "tape.png";
    this.estado = "inactivo";
    this.description = "Cinta métrica extendible.";
    this.longdescription = "Cinta métrica extendible para medir la altura en la que se encuentra la compresión. La línea roja de este indica aproximadamente la mitad de la altura máxima.";
    this.cinta = new Image();
    this.cinta.src = "img/regla.svg";
    this.x = 250;
    this.y = 195;
    this.scale = 0.09;
    this.alturamedida = null;
  }

  actualizar(estado) {
    this.alturamedida = (estado.altura*10);
  }

  dibujar(ctx) {
    ctx.drawImage(
      this.cinta,
      this.x,
      this.y,
      this.cinta.width * this.scale,
      this.cinta.height * this.scale
    );
  }

  getResultado() {
    return { cinta: [""] };
  }
}

class Fantoma extends AbstractTool {
  constructor(visor) {
    super();
    this.tipo = "Fantoma";
    this.icon = "fantoma.png";
    this.estado = "inactivo";
    this.description = "Fantoma con objeto de contraste.";
    this.longdescription = "Fantoma de 45 [mm] que simula la mama de un paciente. Incluye un objeto de contraste que corresponde a un disco de PMMA de 1 mm de espesor y 25 mm de diámetro.";
    this.parametros = false;
    this.colocada = false;
    this.presionado = false;
    this.miliamperios_auto = null;

    this.altura = 4.5;
    this.scale = 0.5;
    this.x = 152;
    this.y = 250;
    this.sprite = new Image();
    this.sprite.src = "img/fantoma45_contraste.svg";
    this.visor = visor;
    this.last_result = null;
  }

  colocar(bool) {
    this.colocada = bool;
  }

  actualizar(estado) {
    //Se esta presionando al fantoma con una fuerza apropiada
    if (6 <= parseInt(estado.fuerza) && parseInt(estado.fuerza) <= 10) {
      this.presionado = true;
    } else {
      this.presionado = false;
    }

    //La configuracion en el panel de control es la adecuada
    this.miliamperios_auto = estado.miliamperios_auto;

    if (parseInt(estado.kilovolt) === 28 && estado.modo === "autotime") {
      this.parametros = true;
    } else {
      this.parametros = false;
    }

    //Se ha disparado en el panel de control
    if (estado.activo) {
      this.visor.reset();
      this.img = null;
      this.last_result = null;
      this.estado = "activo";
      //DISPARO CORRECTO
      if (this.parametros && this.presionado && this.colocada) {
        let lineas = estado.errores.errorimlin == "" ? 0 : 3;

        let request = {
          imagen: "objeto_contraste",
          mancha: "1",
          lineas: lineas,
          l_sentido: estado.errores.errorimglin[0],
          ruido: estado.errores.errorimgsp[0],
          contraste: estado.errores.errorvmp[0],
        };

        $.ajax({
          url: pyKerma_server + "/prueba_imagen",
          type: "get",
          data: request,
          async: false,
          success: (data) => {
            this.img = data;
            this.visor.load_image(data);
          },
        });
      }
    } else {
      this.estado = "inactivo";
    }
  }

  dibujar(ctx) {
    ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.sprite.width * this.scale,
      this.sprite.height * this.scale
    );
  }

  getResultado() {
    var result = null;

    if (this.last_result !== null) {
      var p = this.visor.get_results();
      result = { fantoma: ["Fantoma: ", this.last_result] };

      if (p[0] !== null) {
        var circ1 = $(
          `<div style="color:red"> circulo 1 - VPM: ${p[0][0]} - std: ${p[0][1]} </div>`
        );
        circ1.on("click", () => {
          this.visor.show();
        });
        result = { ...result, circ1: circ1 };
      }

      if (p[1] !== null) {
        var circ2 = $(
          `<div style="color:blue"> circulo 2 - VPM: ${p[1][0]} - std: ${p[1][1]} </div>`
        );
        circ2.on("click", () => {
          this.visor.show();
        });
        result = { ...result, circ2: circ2 };
      }
      var mas_auto = $(
        `<div style="color:black">mAs autotime = ${this.miliamperios_auto}</div>`
      );
      result = { ...result, mas_auto: mas_auto };
      return result;
    }

    if (this.estado == "activo") {
      if (this.parametros && this.presionado && this.colocada) {
        if (this.img !== null) {
          var im = new Image(120, 160);
          im.src = this.img;
          im.style.display = "block";
          im.style.margin = "auto";
          im.onclick = () => {
            this.visor.show();
          };
          result = im;
          this.last_result = result;
        } else {
          this.last_result = null;
          throw "No se obtuvo la imagen";
        }
      } else {
        this.last_result = null;
        result = "";
        if (!this.colocada) {
          result +=
            "<span style='color:red'>¡Error de Posición!</span> Coloque el objeto de contraste adecuadamente.<br>";
        }

        if (!this.presionado) {
          result +=
            "<span style='color:red'>¡Error de Presión!</span> Debe presionar el fantoma entre 6 y 10 kg.<br>";
        }

        if (!this.parametros) {
          result +=
            "<span style='color:red'>¡Error de Parámetros!</span> Fije kV en 28 y Modo en Autotime.";
        }
        if (result === "") {
          result += "Error de Posición.";
        }
      }
    } else {
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
  CintaMetrica,
  Slab_20mm,
  Slab_45mm,
  Slab_70mm,
  Fantoma,
  PlacaExt,
  FiltroAl_03,
  FiltroAl_04
};
