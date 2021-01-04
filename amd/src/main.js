import jQuery from "jquery";
import {
  Balanza,
  Barometro,
  DetectRad,
  Termometro,
  Slab_20mm,
  Slab_45mm,
  Slab_70mm,
  Toalla,
  Fantoma
} from "./herramientas";

import Habitacion from "./habitacion";
import Maquina from "./maquina";
import { ClickeableObject } from "./utils";
import { setDragAndDrop } from "./drag-drop-receptor";
import {
  getCompresorPosY,
  drawPedal
} from "./vista";

import {
  PlantillaCompresion,
  PlantillaRendimiento,
  PlantillaImagen
}
from "./plantillas";

// import
//  PlantillaRendimiento
// from "./plantillas";

// import
//  PlantillaImagen
// from "./plantillas";


import PanelResultados from "./panel-resultados";
import MesaTopDown from "./vista-top-down";

import { getError } from "./valor-errores";

import VisorImagen from "./visor-imagen";
import { inicializarPasos } from "./botones-pasos";
import { drawReceptor } from "./vista";
window.$ = window.jQuery = $ = jQuery;

var m = null;
class Main {
  constructor(errors) {

    this.c = document.getElementById("canvas");
    this.c.addEventListener("mousedown", (e) => this.onCanvasClick(e), false);
    this.c.addEventListener("mouseup", () => this.releaseCanvasClick(), false);
    this.c.addEventListener("mousemove", (e)=>this.onMouseMove(e),false);
    this.ctx = this.c.getContext("2d");
    // Errores - parametros del simulador
    errors.errorf = getError("errorFuerzaEjercida", errors.errorf);
    errors.erroralt = getError("errorAltura", errors.erroralt);
    errors.errorvis = getError("errorFuerzaMedida", errors.errorvis);
    errors.errorrep = getError("errorRepetibilidad", errors.errorrep);
    errors.errorlin = getError("errorLinealidad", errors.errorlin);
    errors.errorrend = getError("errorRendimiento", errors.errorrend);
    errors.errorimglin = getError("errorImagenLineas", errors.errorimglin);
    errors.errorimgsp = getError("errorImagenRuido", errors.errorimgsp);
    errors.errorvmp = getError("errorContraste", errors.errorvmp);

    this.errordict = errors;

    // Instanciar componentes de la simulación
    this.mamografo = new Maquina(errors, this.ctx);
    this.habitacion = new Habitacion();
    this.panelResultados = new PanelResultados();
    this.mesaTopDown = new MesaTopDown(this.mamografo);
    this.visor = new VisorImagen(() => { this.actualizar() });

    // Instanciar Herramientas
    this.herramientas_hab = [new Barometro(), new Termometro()];
    this.herramientas_mam = [
      new Balanza(),
      new Toalla(),
      new Slab_20mm(),
      new Slab_45mm(),
      new Slab_70mm(),
      new DetectRad(),
      new Fantoma(this.visor),
    ];


    this.receptor = new Image();
    this.receptor.src = "img/receptor2.svg";

    this.receptor2 = new Image();
    this.receptor2.src = "img/receptor_con_fantoma2.svg";

    // pedal derecho sube el compresor
    this.pedalUp = new ClickeableObject(() => {
      this.mamografo.subirCompresor();
      this.actualizar();
    }, 
    [220, 500],
    [50, 55],
    20
    );

    // pedal izquierdo baja el compresor
    this.pedalDown = new ClickeableObject(() => {
      this.mamografo.bajarCompresor();
      this.actualizar();
    }, 
    [130, 500],
    [50, 55],
    20
    );

    // perilla derecha sube el compresor
    this.perrillaUp = new ClickeableObject(
      () => {
        this.mamografo.subirCompresorPerilla();
        this.actualizar();
      },
      [220, getCompresorPosY()],
      [25, 35],
      20
    );

    // perilla izqueirda baja el compresor
    this.perrillaDown = new ClickeableObject(
      () => {
        this.mamografo.bajarCompresorPerilla();
        this.actualizar();
      },
      [160, getCompresorPosY()],
      [25, 35],
      20
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
    // dibujar en el canvas las herramientas nuevas
    drawPedal(this.ctx, this.pedalDown.getState(), this.pedalUp.getState());
    this.mamografo.dibujar(this.ctx);
    this.habitacion.dibujar(this.ctx);

    this.panelResultados.limpiarResultados();
    try {
      this.panelResultados.registrarResultado(this.mamografo.getHerramienta().getResultado());
    } catch (error) {
      //console.log(error);
    }
    try {
      this.panelResultados.registrarResultado(this.habitacion.getHerramienta().getResultado());
    } catch (error) {
      //console.log(error);
    }
    this.panelResultados.escribirResultados();
    //actualizamos parametros de mesa top-down aca
    this.mesaTopDown.change_divs();
    setDragAndDrop();


  }

  getMamografo() {
    //console.log("Conseguimos mamografo");
    return this.mamografo;
  }

  onClickTool(herramientaHolder, tool) {
    if (tool.addon) {
      herramientaHolder.setHerramienta(tool, true);
    }
    else {
      herramientaHolder.setHerramienta(tool);
    }

    this.actualizar();
  }

  // Este método se levanta cada vez que hay un click en el canvas
  // Checkea que se haya clickeado
  
  onCanvasClick(e) {
    let click = [e.layerX, e.layerY];

    for (let index = 0; index < this.clickeableOnCanvas.length; index++) {
      let elemento = this.clickeableOnCanvas[index];
      if (elemento.insideBoundingBox(click)) {
        this.clicked = elemento;
        elemento.on_click();
        break;
      }
    }
  }
  onMouseMove(e) { 
    let pointer = false;
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    let hover = [canvasX,canvasY];
    for (let index = 0; index < this.clickeableOnCanvas.length; index++) {
      let elemento = this.clickeableOnCanvas[index];
      if (elemento.insideBoundingBox(hover)) {
        $("#canvas").css("cursor","pointer");
        pointer = true
        break;
      }

    }
    if(pointer === false){
      $("#canvas").css("cursor","default");
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

export const init = (errors, pruebas2) => {
  var errordict = {}
  errors.forEach((pair) => {
    errordict[pair[0]] = pair[1];

  });
  m = new Main(errordict);
  let elems;
  document.getElementById("herrams-mas").onclick = show_h;
  document.getElementById("herrams-menos").onclick = hide_h;


  // botones de herramientas en popup
  elems = document.getElementsByClassName("herrams-btn");
  for (let i = 0; i < elems.length; i++) {
    elems[i].onclick = hide_h;
  }
  document.getElementById("plantilla-abrir").onclick = show_p;
  document.getElementById("plantilla-cerrar").onclick = hide_p;
  document.getElementById("vista-desde-arriba").onclick = show_mesa;
  document.getElementById("Guardar-pos").onclick = () => m.mesaTopDown.check_pos();
  document.getElementById("Guardar-pos-2").onclick = () => m.mesaTopDown.check_pos();
  document.getElementById("cerrar_alerta_posicion_incorrecta").onclick = () => m.mesaTopDown.hide_alerta_incorrecta();
  document.getElementById("cerrar_alerta_posicion_incorrecta-2").onclick = () => m.mesaTopDown.hide_alerta_incorrecta();
  document.getElementById("cerrar_alerta_posicion_correcta").onclick = () => m.mesaTopDown.hide_alerta_correcta();
  document.getElementById("cerrar_alerta_posicion_correcta-2").onclick = () => m.mesaTopDown.hide_alerta_correcta();
  document.getElementById("cerrar-vista-desde-arriba").onclick = () => m.mesaTopDown.hide_mesa();
  document.getElementById("cerrar-vista-desde-arriba-2").onclick = () => m.mesaTopDown.hide_mesa();
  elems = document.getElementsByClassName("open-sim");
  for (let i = 0; i < elems.length; i++) {
    elems[i].onclick = show_sim;
  }



// Selector de pruebas

selector(pruebas2);

// drag-drop-receptor
setDragAndDrop(m);
  
  
 
};
function selector(pruebas2){
  let pruebas = [];
  pruebas2.forEach((prueba) => {
    if (prueba[0] !== "") {
      pruebas.push([prueba[0],prueba[1]]);
    }
  });


  // Plantillas de pruebas
  var plantilla_prueba = {};
  plantilla_prueba["compresion"] = new PlantillaCompresion(m.errordict);
  plantilla_prueba["rendimiento"] = new PlantillaRendimiento(m.errordict);
  plantilla_prueba["imagen"] = new PlantillaImagen(m.errordict);


  let prueba_index = 0;
  let max_pruebas = pruebas.length - 1;
  //Botón izquierdo
  $("#left").on('click', () => {
    if (prueba_index > 0) {
      prueba_index--;
      if (prueba_index === 0) {
        $("#left").prop('disabled', true);
      }
      else {
        $("#left").prop('disabled', false);
      }
      if (prueba_index === max_pruebas) {
        $("#right").prop('disabled', true);
      }
      else {
        $("#right").prop('disabled', false);
      }
    }


    let r = $(`<button id = "inicio-${pruebas[prueba_index][0]}" class="open-sim container-flex p-2">${pruebas[prueba_index][1]}</button>`);
    r.on("click", () => {cargarPrueba(pruebas[prueba_index][0]);
    plantilla_prueba[pruebas[prueba_index][0]].setFeedback();});

    $("#prueba-button").html(r);
  });
  //Botón derecho
  $("#right").on('click', () => {
    if (prueba_index < max_pruebas) {
      prueba_index++;

      if (prueba_index === 0) {
        $("#left").prop('disabled', true);
      }
      else {
        $("#left").prop('disabled', false);
      }
      if (prueba_index === max_pruebas) {
        $("#right").prop('disabled', true);
      }
      else {
        $("#right").prop('disabled', false);
      }
    }
    let r = $(`<button id = "inicio-${pruebas[prueba_index][0]}" class="open-sim  container-flex p-2">${pruebas[prueba_index][1]}</button>`);
    r.on("click", () => {cargarPrueba(pruebas[prueba_index][0]);
    plantilla_prueba[pruebas[prueba_index][0]].setFeedback();});

    $("#prueba-button").html(r);
  });

    // Prueba seleccionada por defecto.
    let r;
    r = $(`<button id = "inicio-${pruebas[prueba_index][0]}" class="open-sim container-flex p-2">${pruebas[prueba_index][1]}</button>`);
    r.on("click", () => {cargarPrueba(pruebas[prueba_index][0]);
    plantilla_prueba[pruebas[prueba_index][0]].setFeedback();});

    $("#prueba-button").html(r);

    if(prueba_index===0){
      $("#left").prop('disabled',true);
    }
    else{
      $("#left").prop('disabled',false);
    }
    if(prueba_index===max_pruebas){
      $("#right").prop('disabled',true);
    }
    else{
      $("#right").prop('disabled',false);
    }

  $("#volver-menu").on('click', () => {
    $("#contenedor-button").show();
    $("#contenedor-sim").hide();
  });

  $("#loader").remove();
  $("#selector").show();
  $("body").on("click", "#volver", function () {

    $("#modal-volver").modal("show");

    //Appending modal background inside the contenedor-main div
    $('.modal-backdrop').appendTo('#contenedor-sim');

    //Remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
    $('body').removeClass("modal-open");
    $('body').css("padding-right", "");
  });
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

function show_mesa() {
  if (m.mamografo.getHerramienta().getTipo() === "Detector de Radiación") {
    show_mesa_camara()
  }
  else if (m.mamografo.getHerramienta().getTipo() === "Fantoma") {
    show_mesa_fantoma()
  }
}


function show_mesa_camara() {
  let x = document.getElementById("vista-arriba-receptor");
  x.style.display = "block";
  var cr = document.getElementById("canvasReceptor");
  cr.style.display = "block";
  var ctxr = cr.getContext("2d");
  ctxr.clearRect(0, 0, cr.width, cr.height);
  var scale = 1.0;

  ctxr.drawImage(m.receptor, 155, -30, m.receptor.width * scale * 0.8, m.receptor.height * scale * 0.8)

}
function show_mesa_fantoma() {
  //console.log("muestrateimagen")
  let x = document.getElementById("vista-arriba-receptor-2");
  x.style.display = "block";
  var cr = document.getElementById("canvasReceptor-2");
  cr.style.display = "block";
  var ctxr = cr.getContext("2d");
  ctxr.clearRect(0, 0, cr.width, cr.height);
  var scale = 1.0;

  ctxr.drawImage(m.receptor2, 155, -30, m.receptor2.width * scale * 0.8, m.receptor2.height * scale * 0.8)

}


// FIN VISTA CAMARA DE IONIZACION


function crearHerramButton(tool, onClickF) {

  let r = $(
    `<button title= "${tool.description}" class="herrams-btn btn btn-outline-secondary button-without-border her-b-s"> </button>`
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
  //console.log(`cargar prueba ${prueba}`);
  $("#container-pasos").load(`pasos/pasos_prueba_${prueba}.html`);
  $("#container-plantilla").load(`plantillas/plantilla_prueba_${prueba}.html`, () => inicializarPasos());
  $("#contenedor-sim").css('display', 'flex');
  $("#contenedor-button").hide();
};

//error: null has no properties
export let setear_params = (kv, ma, md, fltr, anod) => {
  m.getMamografo().setearParams(kv, ma, md, fltr, anod);
};

//disparo mamografo apretando boton shoot
export let disparo = () => {
  //console.log("Shoot2");
  m.getMamografo().activar();
  m.actualizar();
  console.log("SHOOT")
  $("#shoot").css("brightness", 0);
};
