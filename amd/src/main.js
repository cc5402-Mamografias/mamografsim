import {
  Balanza,
  Barometro,
  CamaraIonizacion,
  CintaMetrica,
  Electrometro,
  Termometro,
  Slab_20mm,
  Slab_45mm,
  Slab_70mm
} from "./herramientas";

import Maquina from "./maquina";
import jQuery from "jquery";
//import { checkBoundingBoxClick } from "./utils";

import { Pedal } from "./pedal";
import { ClickeableObject } from "./utils";
import { getCompresorPosY } from "./vista";

window.$ = window.jQuery = $ = jQuery;

let m = null;

class Main {
  constructor() {
    this.herr_activas = [];

    this.herr_disponibles = [
      new Balanza(),
      new Slab_20mm(),
      new Slab_45mm(),
      new Slab_70mm(),
      new Barometro(),
      new CamaraIonizacion(),
      new CintaMetrica(),
      new Electrometro(),
      new Termometro(),
    ];

    this.c = document.getElementById("canvas");
    this.c.addEventListener("mousedown", (e) => this.onCanvasClick(e), false);
    this.c.addEventListener("mouseup", () => this.releaseCanvasClick(), false);

    this.ctx = this.c.getContext("2d");
    this.cres = document.getElementById("canvRes");
    this.ctxres = this.cres.getContext("2d");

    this.mamografo = new Maquina(0, 0, 0, 0.5, this.ctx);

    // pedal derecho sube el compresor
    this.pedalUp = new Pedal(() => {
      this.mamografo.subirCompresor();
      this.actualizar();
    }, [230, 500]);

    // pedal izquierdo baja el compresor
    this.pedalDown = new Pedal(() => {
      this.mamografo.bajarCompresor();
      this.actualizar();
    }, [140, 500]);

    // perilla derecha sube el compresor
    this.perrillaUp = new ClickeableObject(
      () => {
        this.mamografo.subirCompresorPerilla();
        this.actualizar();
      },
      [230, getCompresorPosY()],
      [50, 50],
      200
    );

    // perilla izqueirda baja el compresor
    this.perrillaDown = new ClickeableObject(
      () => {
        this.mamografo.bajarCompresorPerilla();
        this.actualizar();
        console.log("se clickeo la perilla Abajo");
      },
      [140, getCompresorPosY()],
      [50, 50],
      200
    );

    this.herr_disponibles.forEach((tool) => {
      let r = $(`<button title= "${tool.description}" class="herrams-boton"> </button>`).append(
        `<img src="icons/${tool.icon}" width=48><br>${tool.tipo}`
      );

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
    });

    this.clickeableOnCanvas = [
      this.pedalUp,
      this.pedalDown,
      this.perrillaDown,
      this.perrillaUp,
    ];
    this.clicked = null;

    this.actualizar();
  }

  actualizar() {


    // Debemos actualizar la posición de la perilla
    this.perrillaUp.posicion = [
      this.perrillaUp.posicion[0],
      getCompresorPosY(),
    ];
    this.perrillaDown.posicion = [
      this.perrillaDown.posicion[0],
      getCompresorPosY(),
    ];

    // actualizar significa que vamos a dibujar
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctxres.clearRect(0, 0, this.c.width, this.c.height);

    //dibujar el mamografo
    // this.mamografo.actualizar(false, this.herr_activas);
    // dibujar en el canvas las herramientas nuevas
    this.pedalUp.dibujar(this.ctx);
    this.pedalDown.dibujar(this.ctx);
    this.mamografo.dibujar(this.ctx);

    // dibujar en el canvas las herramientas nuevas
    this.herr_activas.forEach((t) => t.dibujar(this.ctx));

    //dibujar resultados
    //this.herr_activas.forEach((t) => t.dibujar_resultado(this.ctxres));
    try {
      this.mamografo.getHerramienta().dibujar_resultado(this.ctxres);
    } catch (error) {
      //console.log(error);
    }
  }

  getMamografo() {
    return this.mamografo;
  }

  onClickTool(tool) {
    console.log(tool);
    this.mamografo.setHerramienta(tool);
    /*const i = this.herr_activas.indexOf(tool);
    if (i > -1) {
      this.herr_activas.splice(i, 1);
    } else {
      this.herr_activas.push(tool);

    }*/
    this.actualizar();
  }

  // Este método se levanta cada vez que hay un click en el canvas
  // Checkea que se haya clickeado
  onCanvasClick(e) {
    let click = [e.layerX, e.layerY];

    for (let index = 0; index < this.clickeableOnCanvas.length; index++) {
      let elemento = this.clickeableOnCanvas[index];
      if (elemento.isClicked(click)) {
        this.clicked = elemento;
        elemento.on_click();
        break;
      }
    }
  }
  // Checkea que se elementó se clickeo y activa su callback
  releaseCanvasClick(e) {
    if (this.clicked !== null) {
      this.clicked.on_release();
      this.clicked = null;
      this.actualizar();
    }
  }
}

export let init = () => {
  m = new Main();
  console.log("Simulador inicializado");
};

export function show_h() {
  let x = document.getElementById("herrams");
  x.style.display = "block";
}

export function hide_h() {
  let x = document.getElementById("herrams");
  x.style.display = "none";
}

export function show_p() {
  let x = document.getElementById("plantilla");
  x.style.display = "block";
}

export function hide_p() {
  let x = document.getElementById("plantilla");
  x.style.display = "none";
}

export function show_sim() {
  let x = document.getElementById("contenedor-sim");
  x.style.display = "block";
  let y = document.getElementById("contenedor-button");
  y.style.display = "none";
}

export let setear_params = (kv, ma, md, fltr, anod) => {
  m.getMamografo().setearParams(kv, ma, md, fltr, anod);
};