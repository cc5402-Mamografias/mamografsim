import {
  Balanza,
  Barometro,
  CamaraIonizacion,
  CintaMetrica,
  Electrometro,
  Termometro,
} from "./herramientas";
import jQuery from "jquery";
import {drawMam} from "./vista";
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
    

    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    // this.mamografo =
    // this.panel_control =
    //

    this.herr_disponibles.forEach((tool) => {
      let r = $(`<button title= "AD." class="herrams-boton"> </button>`)
        .append(`<img src="icons/${tool.icon}" width=64><br>${tool.tipo}`)

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
    });
  }

  update() {
    console.log("Update");
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    drawMam();
    // dibujar en el canvas las herramientas nuevas
    this.herr_activas.forEach((t) => t.dibujar(this.ctx));
    //dibujar el mamografo
    
    
    
  }

  onClickTool(tool) {
    console.log(tool);
    const i = this.herr_activas.indexOf(tool);
    if (i > -1) {
      this.herr_activas.splice(i, 1);
    } else {
      this.herr_activas.push(tool);
    }
    this.update();
  }
}

export let init = () => {
 let m = new Main();
  m.update();
  console.log("Simulador inicializado");
};
