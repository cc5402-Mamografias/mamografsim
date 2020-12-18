import { BaseNula } from "./herramientas";
import { preloadImages, drawMam, drawPedal } from "./vista";

const alturaMax = 80;

//operacion Math.random con seed fijo
var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}


export default class Maquina {
  constructor(errors, ctx) {
    this.errors = errors;
    this.herramienta = new BaseNula();
    //Errores
    
    this.errorFuerza = errors["errorf"][0];
    this.errorAltura = errors["erroralt"][0];
    this.errorVisor = errors["errorvis"][0];

    //dedicadas a los errores de rendimiento
    this.rangemargenmA = errors["errorrep"][0];
    this.errorLinealidad = errors["errorlin"][0];
    this.errorRendimiento = errors["errorrend"][0];

    this.alturaCompresor = 80;
    this.alturaEspesor = 25;
    this.fuerza = 0.0;

    this.fuerzamax = this.errorFuerza; 
    this.fuerzamaxManual = this.errorFuerza+10;
    console.log(this.fuerzamax)
    //Movimiento compresor
    this.velocY = 0.8;
    this.velocYManual = 0.5;
    this.multSubida = 15
    //Formula de compresión
    
    
    this.velocCompresion = 0.1;
    this.velocCompresionManual = 0.07;

    this.multCompresion = 2;
    this.sumaCompresion = this.fuerzamax/2;
    this.sumaCompresionManual = this.fuerzamaxManual/2;
    this.compresionExp = 2.5
    this.factorCompresiónini = Math.sqrt(this.compresionExp**(-this.sumaCompresion));
    this.factorCompresion = this.factorCompresiónini;

    //NOSE SI COLOCAR VALORES POR DEFECTO EN EL CONSTRUCTOR
    this.kilovolt = null;
    this.miliamperios = null;
    this.modo = null;
    this.filtro = null;
    this.anodo = null;


    preloadImages().then(() => {
      drawMam(ctx, this.alturaDesplegada());
      drawPedal(ctx, false, false)
    });
  }

  //operaciones con resultado entero
  mErrorInt(min, max) {

    return (Math.floor(random() * ((max+1) - min + 1) ) + min);
  }
  elevar (base, exp){
    return(Math.floor(Math.pow(base, exp)));
  }
  multiplicar (x1,x2){
    return(Math.floor(x1*x2));
  }


  construirEstado(isActivo) {

    return {
      altura: (this.alturaCompresor),
         fuerza: this.factorCompresion > this.factorCompresiónini
         ? (this.fuerza)
         : 0,
      kilovolt: (this.kilovolt),
      //para herramienta de fantoma
      miliamperios_nom : (this.miliamperios),
      miliamperios: this.multiplicar((this.elevar((this.miliamperios),(1+this.errorLinealidad))+ this.mErrorInt(-this.rangemargenmA,this.rangemargenmA)),(1-this.errorRendimiento)),


      filtro: this.filtro,
      anodo: this.anodo,
      modo: this.modo,
      activo: isActivo,
      errores: this.errors
      
    };
  }

  valoresMedidos() {

    return {
      altura: this.alturaCompresor === this.alturaMinima()
        ? (this.alturaCompresor + this.errorAltura) * 10
        : this.alturaCompresor < this.alturaEspesor
          ? (this.alturaCompresor) * 10
          : 0,
      fuerza: this.factorCompresion > this.factorCompresiónini
        ? Math.max(0,(this.fuerza + this.errorVisor))
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
    this.herramienta.actualizar(this.construirEstado(activo));
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
      throw 'No se puede posicionar la herramienta con el compresor tan bajo';
      // return;
    }
    if (addon) {

      herram.action(this);

    }
    else {

      //La idea es que se compare con un arreglo de herramientas que permiten la vista desde arriba
      if (herram.getTipo() === "Detector de Radiación" || herram.getTipo() === "Fantoma") {
        //MOSTRAR BOTON
        document.getElementById("vista-desde-arriba").style.display = "block";
        //CARGAR VISTA TOP DOWN
        console.log("BOTON CONFIGURADO");
      }
      else {
        document.getElementById("vista-desde-arriba").style.display = "none";
      }
      if (this.herramienta.getTipo() == herram.getTipo()) {
        if (herram.getTipo() === "Detector de Radiación"|| herram.getTipo() === "Fantoma") {
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

    if (this.factorCompresion == this.factorCompresiónini) {
      this.alturaCompresor += this.velocY;
    }
    this.factorCompresion = Math.max(this.factorCompresion - this.velocCompresion * this.multSubida, this.factorCompresiónini);
    this.fuerza = Math.max(Math.log2(this.factorCompresion**this.compresionExp) + this.sumaCompresion, 0);
    this.actualizar();
  }

  bajarCompresor() {


    if (this.alturaCompresor <= this.herramienta.altura) {
      if(this.fuerza < this.fuerzamax){

        this.factorCompresion = this.factorCompresion + this.velocCompresion;
        this.fuerza = Math.max(Math.min(Math.log2(this.factorCompresion**this.compresionExp) + this.sumaCompresion,this.fuerzamax),this.fuerza);
      }
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
    if (this.factorCompresion === this.factorCompresiónini) {
      this.alturaCompresor += this.velocYManual;
    }

    this.factorCompresion = Math.max(this.factorCompresion - this.velocCompresion * this.multSubida, this.factorCompresiónini);
    this.fuerza = Math.max(Math.log2(this.factorCompresion**this.compresionExp) + this.sumaCompresionManual, 0);
    this.actualizar();
  }

  bajarCompresorPerilla() {
    
    if (this.alturaCompresor <= this.herramienta.altura) {

      if(this.fuerza  < this.fuerzamaxManual){
        this.factorCompresion = this.factorCompresion + this.velocCompresionManual;
        this.fuerza = Math.max(Math.min(Math.log2(this.factorCompresion**this.compresionExp) + this.sumaCompresionManual,this.fuerzamaxManual),this.fuerza);
      }
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - this.velocYManual, this.alturaMinima());
    }
    this.actualizar();
    console.log(this.factorCompresion);
  }
  

}


