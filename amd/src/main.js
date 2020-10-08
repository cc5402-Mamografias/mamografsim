import { Balanza, Electrometro, Termometro } from "./herramientas";
import jQuery from "jquery";
window.$ = window.jQuery = $ = jQuery;

class Main {
  constructor() {
    this.herr_activas = [];
    this.herr_disponibles = [
      new Balanza(),
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
        .append('<img src="https://static.reol.cl/reol.png" width=64><br>')
        .append(`${tool.tipo}`);

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
    });
  }

  update(){

    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    // dibujar en el canvas las herramientas nuevas
    this.herr_activas.forEach(
      (t) => t.dibujar(this.ctx)
    )
    //dibujar el mamografo
    // 
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
  new Main();
  console.log("Simulador inicializado");
};
