import {
  Balanza,
  Barometro,
  CamaraIonizacion,
  CintaMetrica,
  Electrometro,
  Termometro,
} from "./herramientas";

import Maquina  from "./maquina";
import jQuery from "jquery";

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
    
    this.mamografo = new Maquina(0,0,0);
    this.c = document.getElementById("canvas");
    this.c.addEventListener('click',() => this.onCanvasClick() , false);
    this.ctx = this.c.getContext("2d");
    this.cres = document.getElementById("canvRes");
    this.ctxres = this.cres.getContext("2d");
   
    
    
    // this.panel_control =
    
    console.log("dibujar iconos");
    this.herr_disponibles.forEach((tool) => {
      let r = $(`<button title= "AD." class="herrams-boton"> </button>`).append(
        `<img src="icons/${tool.icon}" width=64><br>${tool.tipo}`
      );

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
      console.log("dibujar 1");
    });
    
    this.actualizar();
   
  }

  actualizar() {
    console.log("Update");
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctxres.clearRect(0, 0, this.c.width, this.c.height);
    //dibujar el mamografo
    this.mamografo.actualizar();
    // dibujar en el canvas las herramientas nuevas
    this.herr_activas.forEach((t) => t.dibujar(this.ctx));
    
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
    this.mamografo.bajarCompresor();
    this.actualizar();
   
  }

  // Este método se levanta cada vez que hay un click en el canvas
  // Checkea que se haya clickeado
  onCanvasClick() {
    
    console.log("click on canvas");
    
   this.mamografo.subirCompresor();
   this.actualizar();
  }

  onCanvasReleaseClick(e) {}
}

export let init = () => {
 let m = new Main();
console.log("Simulador inicializado");
};
