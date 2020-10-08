import { Balanza, Electrometro, Termometro } from "./herramientas";
import jQuery from "jquery";
window.$ = window.jQuery = $ = jQuery;

class Main {
  constructor() {
    this.active_tools = [];
    this.available_tools = [
      new Balanza(),
      new Electrometro(),
      new Termometro(),
    ];


    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext("2d");

    // this.mamografo = 
    // this.panel_control = 


    this.available_tools.forEach((tool) => {
      let r = $(`<button title= "AD." class="herrams-boton"> </button>`)
        .append('<img src="https://static.reol.cl/reol.png" width=64><br>')
        .append(`${tool.tipo}`);

      r.on("click", () => this.onClickTool(tool));
      r.appendTo("#herramientas-express");
    });
  }

  onClickTool(tool) {
    console.log(tool);
    const i = this.active_tools.indexOf(tool);
    if (i > -1) {
      this.active_tools.splice(i, 1);
    } else {
      this.active_tools.push(tool);
    }

    this.clearCanvas();
    this.active_tools.forEach(
      (t) => t.dibujar(this.ctx)
    )
    
  }

  // Esta función debería moverse a algun otro lugar 
  clearCanvas(){
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
  }

}

export let init = () => {
  console.log("Aqui estamoss");
  // var toolClick = this.bind(toolOnClick);
  new Main();
};
