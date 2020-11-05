import jQuery from "jquery";
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

import Habitacion from "./habitacion";
import Maquina from "./maquina";
import { Pedal } from "./pedal";
import { ClickeableObject } from "./utils";
import { getCompresorPosY } from "./vista";
import PanelResultados from "./panel-resultados";

window.$ = window.jQuery = $ = jQuery;

var m = null;

class Main {
  constructor(errors) {
    this.herramientas_hab = [new Barometro(), new Termometro()];
    this.herramientas_mam = [
      new Balanza(),
      new Slab_20mm(),
      new Slab_45mm(),
      new Slab_70mm(),
      new CintaMetrica(),
      new CamaraIonizacion(),
      new Electrometro(),
    ];

    this.c = document.getElementById("canvas");
    this.c.addEventListener("mousedown", (e) => this.onCanvasClick(e), false);
    this.c.addEventListener("mouseup", () => this.releaseCanvasClick(), false);

    this.ctx = this.c.getContext("2d");

    this.mamografo = new Maquina(errors, this.ctx);
    this.habitacion = new Habitacion();
    this.panelResultados = new PanelResultados();

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

    this.herramientas_mam.forEach((tool) => {
      crearHerramButton(tool, () => this.onClickTool(this.mamografo, tool))
    });

    this.herramientas_hab.forEach((tool) => {
      crearHerramButton(tool, () => this.onClickTool(this.habitacion, tool))
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
    //dibujar el mamografo
    // this.mamografo.actualizar(false, this.herr_activas);
    // dibujar en el canvas las herramientas nuevas
    this.pedalUp.dibujar(this.ctx);
    this.pedalDown.dibujar(this.ctx);
    this.mamografo.dibujar(this.ctx);
    this.habitacion.dibujar(this.ctx);

    // dibujar en el canvas las herramientas nuevas
    // this.herr_activas.forEach((t) => t.dibujar(this.ctx));

    //dibujar resultados
    //this.herr_activas.forEach((t) => t.dibujar_resultado(this.ctxres));
    console.log('dibujando resultados');
    this.panelResultados.limpiarResultados();
    try {
      this.panelResultados.registrarResultado(this.mamografo.getHerramienta().getResultado());
    } catch (error) {
      console.log(error);
    }
    try {
      this.panelResultados.registrarResultado(this.habitacion.getHerramienta().getResultado());
    } catch (error) {
      console.log(error);
    }
    this.panelResultados.dibujarResultados();
  }

  getMamografo() {
    console.log("Conseguimos mamografo");
    return this.mamografo;
  }

  onClickTool(herramientaHolder, tool) {
    herramientaHolder.setHerramienta(tool);
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

export const init = (errors) => {
  //console.log(errors);
  let errordict = {}
  errors.forEach((pair) => {
    errordict[pair[0]] = pair[1];

  });
  console.log(errordict);
  m = new Main(errordict);
  let elems;
  document.getElementById("herrams-mas").onclick = show_h;
  document.getElementById("herrams-menos").onclick = hide_h;


  // botones de herramientas en popup
  elems = document.getElementsByClassName("herrams-boton");
  for (let i = 0; i < elems.length; i++) {
    elems[i].onclick = hide_h;
  }
  document.getElementById("plantilla-abrir").onclick = show_p;
  document.getElementById("plantilla-cerrar").onclick = hide_p;
  document.getElementById("vista-desde-arriba").onclick = mostrar_mesa;
  document.getElementsByClassName("close")[0].onclick = cerrar_mesa;
  elems = document.getElementsByClassName("open-sim");
  for (let i = 0; i < elems.length; i++) {
    elems[i].onclick = show_sim;
  }


  let pruebas = ['compresion', 'rendimiento'];

  $('<h2> Seleccionar una prueba: </h2> <br>').appendTo("#contenedor-button")

  let r;
  for (let x of pruebas) {
    r = $(`<button id = "inicio-${x}" class="open-sim"><img src="icons/play.png" width=64><br>${x}</button>`);
    r.on("click", () => cargarPrueba(x));
    r.appendTo("#contenedor-button");
  }

  $("#volver").on('click', () => {
    $("#contenedor-button").show();
    $("#contenedor-sim").hide();
  })
  $("#loader").remove()

  console.log("Simulador inicializado");
};

function show_h() {
  let x = document.getElementById("herrams");
  x.style.display = "block";
}

function hide_h() {
  let x = document.getElementById("herrams");
  x.style.display = "none";
}

function show_p() {
  let x = document.getElementById("plantilla");
  x.style.display = "block";
}

function hide_p() {
  let x = document.getElementById("plantilla");
  x.style.display = "none";
}

//MOSTRAR MODAL DE VISTA DESDE ARRIBA DEL MAMOGRAFO
function mostrar_mesa(){
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

}

//ESCONDER MODAL DE VISTA DESDE ARRIBA DEL MAMOGRAFO
function cerrar_mesa(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function crearHerramButton(tool, onClickF) {

  let r = $(
    `<button title= "${tool.description}" class="herrams-boton her-b-s"> </button>`
  ).append(`<img src="icons/${tool.icon}" width=48><br>${tool.tipo}`);
  r.on("click", onClickF);
  r.appendTo("#herramientas-express");

  let r_col = $(`<div class="col-sm-2"></div>`);
  let r2 = r.clone().removeClass("her-b-s").addClass("her-b-l");
  r2.on("click", onClickF);
  r_col.append(r2);
  r_col.appendTo("#herrams-lista-completa");
}

function cargarPrueba(prueba) {
  console.log(`cargar prueba ${prueba}`);
  $("#container-pasos").load(`pasos/pasos_prueba_${prueba}.html`);
  $("#container-plantilla").load(`plantillas/plantilla_prueba_${prueba}.html`);
  $("#contenedor-sim").css('display', 'flex');
  $("#contenedor-button").hide();
};

//error: null has no properties
export let setear_params = (kv, ma, md, fltr, anod) => {
  m.getMamografo().setearParams(kv, ma, md, fltr, anod);
};

export let disparo = () => {
  console.log("Shoot2");
  m.getMamografo().activar();
  m.actualizar();
};
