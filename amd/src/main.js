import {
  Balanza,
  Barometro,
  CamaraIonizacion,
  CintaMetrica,
  Electrometro,
  Termometro,
} from "./herramientas";

import Maquina from "./maquina";
// import { drawMam } from "./vista";
import jQuery from "jquery";
import { checkBoundingBoxClick } from "./utils";

import { Pedal } from "./pedal";

window.$ = window.jQuery = $ = jQuery;

class Main {
  constructor() {
    this.herr_activas = [];

    this.herr_disponibles = [
      new Balanza(),
      new Barometro(),
      new CamaraIonizacion(),
      new CintaMetrica(),
      new Electrometro(),
      new Termometro(),
    ];

    this.mamografo = new Maquina(0, 0, 0);
    this.c = document.getElementById("canvas");
    this.c.addEventListener("mousedown", (e) => this.onCanvasClick(e), false);
    this.c.addEventListener("mouseup", () => this.releaseCanvasClick(), false);
    // releaseCanvasClick(e) {

    this.ctx = this.c.getContext("2d");
    this.cres = document.getElementById("canvRes");
    this.ctxres = this.cres.getContext("2d");

    // this.panel_control =

    this.pedalUp = new Pedal(() => {
      this.mamografo.subirCompresor();
      this.actualizar();
    }, [230, 500]);

    this.pedalDown = new Pedal(() => {
      this.mamografo.bajarCompresor();
      this.actualizar();
    }, [170, 500]);

    console.log("dibujar iconos");
    this.herr_disponibles.forEach((tool) => {
      let r = $(`<button title= "AD." class="herrams-boton"> </button>`).append(
        `<img src="icons/${tool.icon}" width=64><br>${tool.tipo}`
      );

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
      console.log("dibujar 1");
    });

    this.clickeableOnCanvas = [this.pedalUp, this.pedalDown];
    this.clicked = null;

    this.actualizar();
  }

  actualizar() {
    // actualizar significa que vamos a dibujar
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctxres.clearRect(0, 0, this.c.width, this.c.height);

    //dibujar el mamografo
    // this.mamografo.actualizar(false, this.herr_activas);
    // dibujar en el canvas las herramientas nuevas

    // dibujar en el canvas las herramientas nuevas
    this.herr_activas.forEach((t) => t.dibujar(this.ctx));

    this.pedalDown.dibujar(this.ctx);
    this.pedalUp.dibujar(this.ctx);
    this.pedalDown.dibujar(this.ctx);
    this.mamografo.dibujar(this.ctx);

    //dibujar resultados
    this.herr_activas.forEach((t) => t.dibujar_resultado(this.ctxres));
  }

  onClickTool(tool) {
    console.log(tool);
    const i = this.herr_activas.indexOf(tool);
    if (i > -1) {
      this.herr_activas.splice(i, 1);
    } else {
      this.herr_activas.push(tool);
    }

    this.actualizar();
  }

  // Este método se levanta cada vez que hay un click en el canvas
  // Checkea que se haya clickeado
  onCanvasClick(e) {
    console.log("click on canvas");
    // let rect = this.c.getBoundingClientRect();
    
    console.log(e);
    // let click = [e.pageX - this.c.offsetLeft, e.pageY - this.c.offsetLeft];
    let click = [e.layerX, e.layerY];

    for (let index = 0; index < this.clickeableOnCanvas.length; index++) {
      let elemento = this.clickeableOnCanvas[index];
      if (elemento.isClicked(click)) {
        console.log("pedal fue clickeado");
        this.clicked = elemento;
        elemento.on_click();
        break;
      }
    }
  }
  // Checkea que se elementó se clickeo y activa su callback
  releaseCanvasClick(e) {
    console.log("release canvas");
    if (this.clicked !== null) {
      this.clicked.on_release();
      this.clicked = null;
    }

    this.actualizar();
  }
}

export let init = () => {
  let m = new Main();
  console.log("Simulador inicializado");
};
