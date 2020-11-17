import { BaseNula } from "./herramientas";
import { preloadImages, drawMam, drawPedal } from "./vista";

import { check_pos, hide_alerta_correcta, hide_alerta_incorrecta, hide_mesa} from "./main";
//import { setearParamsMamografo } from "./control-panel";

const alturaMax = 80;

function rand(lowest, highest){
  var adjustedHigh = (highest - lowest) + 1;
  return Math.floor(Math.random()*adjustedHigh) + parseFloat(lowest);
}

export default class Maquina {
  constructor(errors, ctx) {
    this.herramienta = new BaseNula();
    this.errorKilovolt = parseInt(errors["errorkv"]);
    this.errorMiliamperios = parseInt(errors["errorma"]);
    this.errorFuerza = errors["errorf"];
    this.errorAltura = errors["erroralt"];
    this.errorVisor = errors["errorvis"];

    this.alturaCompresor = 80;
    this.alturaEspesor = 25;
    this.fuerza = 0.0;
    this.fuerzamax = 15; 
    //Formula de compresión
    this.factorCompresiónini = 1;
    this.factorCompresion = this.factorCompresiónini;
    this.velocCompresion = 0.1;
    this.factorCompresion  = 0.8;
    this.sumaCompresion = 10;
    this.factorCompManual = 1.5;

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



  construirEstado(isActivo) {
    //let errorF = rand(-this.errorFuerza,this.errorFuerza)
    //console.log(this.errorFuerza);
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
      kilovolt: this.kilovolt + this.errorKilovolt,
      miliamperios: this.miliamperios + this.errorMiliamperios,
      filtro: this.filtro,
      anodo: this.anodo,
      modo: this.modo,
      activo: isActivo,
    };
  }

  valoresMedidos() {
    return {
      altura: this.alturaCompresor == this.alturaMinima()
        ? (this.alturaCompresor + this.errorAltura)* 10
        : this.alturaCompresor < this.alturaEspesor
          ? (this.alturaCompresor) *10
          : 0,
          fuerza: this.factorCompresion > this.factorCompresiónini
          ? (this.fuerza+this.errorFuerza)
          : 0
    };
  }

  alturaMinima() {
    return this.herramienta.getAltura();
  }

  alturaDesplegada(){
    return this.alturaCompresor*2
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
    if (this.alturaCompresor + 5 < herram.altura) {
      throw 'No se puede posicionar la herramienta con el compresor tan bajo';
      // return;
    }
    if (addon){
     
      herram.action(this);
      
    }
    else{

      
    //La idea es que se compare con un arreglo de herramientas que permiten la vista desde arriba
    if (herram.getTipo() === "Detector de Radiación"){
      //MOSTRAR BOTON
      document.getElementById("vista-desde-arriba").style.display = "block";
      //CARGAR VISTA TOP DOWN
      //await Promise($("#container-vista-arriba").load(`configuraciones_top_down/top_down_rendimiento.html`));
      console.log("BOTON CONFIGURADO");
    }
    else{
      document.getElementById("vista-desde-arriba").style.display = "none";
    }
    if (this.herramienta.getTipo() == herram.getTipo()) {
      if(herram.getTipo() === "Detector de Radiación"){
        //OCULTAR BOTON
        document.getElementById("vista-desde-arriba").style.display = "none";
        
      }
      this.herramienta = new BaseNula();
    } else {
      this.herramienta = herram;
    }
    
    
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
    this.alturaCompresor += 0.5;
    this.factorCompresion = Math.max(this.factorCompresion - this.velocCompresion * 5,this.factorCompresiónini);
    this.fuerza = Math.max(Math.log2(this.factorCompresion)*this.factorCompresion + this.sumaCompresion,0);
    this.actualizar();
  }

  bajarCompresor() {
    console.log("factorCompresión",this.factorCompresion);
    console.log("fuerza",this.fuerza);
    if (this.alturaCompresor <= this.herramienta.altura) {
      //this.factorCompresion = Math.min(Math.log2(this.factorCompresion+1.05),this.factorCompMax);
      this.factorCompresion = this.factorCompresion + this.velocCompresion;
      this.fuerza = Math.min(Math.log2(this.factorCompresion)*this.factorCompresion + this.sumaCompresion,this.fuerzamax);
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - 0.8, this.alturaMinima());
    }
    this.actualizar();
  }


  subirCompresorPerilla() {
    if (
      this.alturaCompresor + 1 > alturaMax
    ) {
      throw "compresor tope arriba";
    }
    this.alturaCompresor += 3;
    this.factorCompresion = 0.0
    this.fuerza = 0;
    this.actualizar();
  }

  bajarCompresorPerilla() {
    if (this.alturaCompresor <= this.herramienta.altura) {
      this.factorCompresion = (this.factorCompresion + this.factorCompManual) / 2;
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - 0.4, this.alturaMinima());
    }
    this.actualizar();
  }


}


