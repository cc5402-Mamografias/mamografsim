import { BaseNula } from "./herramientas";
import { preloadImages, drawMam, drawPedal } from "./vista";

import { check_pos, hide_alerta_correcta, hide_alerta_incorrecta, hide_mesa } from "./main";
//import { setearParamsMamografo } from "./control-panel";

const alturaMax = 80;
const margenF = 0;
const margenAlt = 2;


//operacion Math.random con seed fijo
var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}


export default class Maquina {
  constructor(errors, ctx) {
    console.log(errors)
    this.herramienta = new BaseNula();
    //Errores
    this.errorKilovolt = parseInt(errors["errorkv"]);
    this.errorMiliamperios = parseInt(errors["errorma"]);
    this.errorFuerza = errors["errorf"];
    this.errorAltura = errors["erroralt"];
    this.errorVisor = errors["errorvis"];

    //dedicadas a los errores de rendimiento
    this.rangemargenmA = errors["errorrep"];
    this.errorLinealidad = errors["errorlin"];
    this.errorRendimiento = errors["errorrend"];

//const ponderacionmA = 1;

    this.alturaCompresor = 80;
    this.alturaEspesor = 25;
    this.fuerza = 0.0;
    this.fuerzamax = 15; 
    this.fuerzamaxManual = 30;
    //Movimiento compresor
    this.velocY = 0.8;
    this.velocYManual = 0.5;

    //Formula de compresión
    this.factorCompresiónini = 1;
    this.factorCompresion = this.factorCompresiónini;
    this.velocCompresion = 0.1;
    this.multCompresion  = 0.8;
    this.sumaCompresion = 10;
    this.sumaCompresionManual = 10;

    //NOSE SI COLOCAR VALORES POR DEFECTO EN EL CONSTRUCTOR
    this.kilovolt = null;
    this.miliamperios = null;
    this.modo = null;
    this.filtro = null;
    this.anodo = null;

    
    
    

    preloadImages().then(() => {
      drawMam(ctx, this.alturaDesplegada());
      drawPedal(ctx, false, false)});

    //setearParamsMamografo();
  }

  //operaciones con resultado entero
  mErrorInt(min, max) {
    return (Math.floor(random() * ((max+1) - min + 1) ) + min)
  }
  elevar (base, exp){
    return(Math.floor(Math.pow(base, exp)))
  }
  multiplicar (x1,x2){
    return(Math.floor(x1*x2))
  }



  construirEstado(isActivo) {
    //let errorF = rand(-this.errorFuerza,this.errorFuerza)
    let margenKV = 0;
    let margenmA = 0;
    if (isActivo == true) {
      margenmA = this.mErrorInt(-this.rangemargenmA,this.rangemargenmA)
    }
    //console.log(this.errorFuerza);
    //console.log(margenmA);
    return {
      altura: (this.alturaCompresor),
      /*
      fuerza:
        this.alturaCompresor == this.alturaMinima()
          ? ((this.fuerza + this.errorFuerza) * this.factorCompresion)
          : 0,

          */
         fuerza: this.factorCompresion > this.factorCompresiónini
         ? (this.fuerza+this.errorFuerza)
         : 0,
      kilovolt: (this.kilovolt),
      miliamperios: this.multiplicar((this.elevar((this.miliamperios),(1+this.errorLinealidad))+ margenmA),(1-this.errorRendimiento)),
      filtro: this.filtro,
      anodo: this.anodo,
      modo: this.modo,
      activo: isActivo,
    };
  }

  valoresMedidos() {

    return {
      altura: this.alturaCompresor == this.alturaMinima()
        ? (this.alturaCompresor + this.errorAltura) * 10
        : this.alturaCompresor < this.alturaEspesor
          ? (this.alturaCompresor) * 10
          : 0,
          fuerza: this.factorCompresion > this.factorCompresiónini
          ? (this.fuerza+this.errorFuerza)
          : 0
    };
  }

  alturaMinima() {
    return this.herramienta.getAltura();
  }

  alturaDesplegada() {
    return this.alturaCompresor * 2
  }


  actualizar(activo = false) {

    if (!activo) {
      this.herramienta.actualizar(this.construirEstado(activo));
    } else {

      let estado = this.construirEstado(activo);

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
          estado.kerma = data.kerma;
          this.herramienta.actualizar(estado);
        }
      });
    }

  }

  dibujar(ctx) {
    drawMam(
      ctx,
      this.alturaDesplegada(),
      [this.herramienta],
      this.valoresMedidos().fuerza.toFixed(2),
      this.valoresMedidos().altura
    );
  }

  // Setea los parametros del panel de control
  setearParams(kv, ma, md, fltr, anod) {

    console.log("seteo nuevos parametros");
    this.kilovolt = kv;
    this.miliamperios = ma;
    this.modo = md;
    this.filtro = fltr;
    this.anodo = anod;
  }

  // Selecciona una nueva herramienta o deselecciona la antigua
  setHerramienta(herram, addon = false) {
    if (this.factorCompresion != this.factorCompresiónini || this.alturaCompresor - 5 < herram.altura) {
      console.log(this.factorCompresion);
      console.log(this.factorCompresiónini);
      console.log(this.factorCompresion != this.factorCompresiónini);
      throw 'No se puede posicionar la herramienta con el compresor tan bajo';
      // return;
    }
    if (addon) {

      herram.action(this);

    }
    else {

      //La idea es que se compare con un arreglo de herramientas que permiten la vista desde arriba
      if (herram.getTipo() === "Detector de Radiación") {
        //MOSTRAR BOTON
        document.getElementById("vista-desde-arriba").style.display = "block";
        //CARGAR VISTA TOP DOWN
        //await Promise($("#container-vista-arriba").load(`configuraciones_top_down/top_down_rendimiento.html`));
        console.log("BOTON CONFIGURADO");
      }
      else {
        document.getElementById("vista-desde-arriba").style.display = "none";
      }
      if (this.herramienta.getTipo() == herram.getTipo()) {
        if (herram.getTipo() === "Detector de Radiación") {
          //OCULTAR BOTON
          document.getElementById("vista-desde-arriba").style.display = "none";

        }
        this.herramienta = new BaseNula();
      } else {
        this.herramienta = herram;
      }

      this.actualizar();
    }
  }

  getHerramienta() {
    return this.herramienta;
  }

  activar() {
    this.actualizar(true);
  }

  subirCompresor() {
    if (
      this.alturaCompresor + 1 > alturaMax
    ) {
      throw "compresor tope arriba";
    }
    if(this.factorCompresion == this.factorCompresiónini){
      this.alturaCompresor += this.velocY;
    }
    this.factorCompresion = Math.max(this.factorCompresion - this.velocCompresion * 10,this.factorCompresiónini);
    this.fuerza = Math.max(Math.log2(this.factorCompresion)*this.multCompresion + this.sumaCompresion,0);
    this.actualizar();
  }

  bajarCompresor() {
    
    if (this.alturaCompresor <= this.herramienta.altura) {
      //this.factorCompresion = Math.min(Math.log2(this.factorCompresion+1.05),this.factorCompMax);
      this.factorCompresion = this.factorCompresion + this.velocCompresion;
      this.fuerza = Math.max(Math.min(Math.log2(this.factorCompresion)*this.factorCompresion + this.sumaCompresion,this.fuerzamax),this.fuerza);
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - this.velocY, this.alturaMinima());
    }
    this.actualizar();
  }


  subirCompresorPerilla() {
    if (
      this.alturaCompresor + 1 > alturaMax
    ) {
      throw "compresor tope arriba";
    }
    if(this.factorCompresion == this.factorCompresiónini){
      this.alturaCompresor += this.velocYManual;
    }
    
    this.factorCompresion = Math.max(this.factorCompresion - this.velocCompresion * 10,this.factorCompresiónini);
    this.fuerza = Math.max(Math.log2(this.factorCompresion)*this.multCompresion + this.sumaCompresionManual,0);
    this.actualizar();
  }

  bajarCompresorPerilla() {
    
    if (this.alturaCompresor <= this.herramienta.altura) {
      //this.factorCompresion = Math.min(Math.log2(this.factorCompresion+1.05),this.factorCompMax);
      this.factorCompresion = this.factorCompresion + this.velocCompresion;
      this.fuerza = Math.max(Math.min(Math.log2(this.factorCompresion)*this.factorCompresion + this.sumaCompresionManual,this.fuerzamaxManual),this.fuerza);
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - this.velocYManual, this.alturaMinima());
    }
    this.actualizar();
  }


}


