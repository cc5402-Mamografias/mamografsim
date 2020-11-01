import { BaseNula } from "./herramientas";
import { preloadImages, drawMam } from "./vista";

const alturaMax = 155;
const margenF = 0.5;
const margenKV = 1;
const margenmA = 10;
const margenAlt = 2;

export default class Maquina {
  constructor(errorkv, errorma, errorF, errorAlt, ctx) {
    this.herramienta = new BaseNula();

    this.alturaCompresor = 155;
    this.alturaEspesor = 25;
    this.fuerza = 17;
    this.factorCompresion = 0.0;
    this.factorCompMax = 1.0;
    this.factorCompManual = 1.5;

    this.margenF = this.mError(margenF);
    //NOSE SI COLOCAR VALORES POR DEFECTO EN EL CONSTRUCTOR
    this.kilovolt = 32;
    this.miliamperios = 100;

    this.errorKilovolt = errorkv;
    this.errorMiliamperios = errorma;
    this.errorFuerza = errorF;
    this.errorAltura = errorAlt;

    this.modo = null;
    this.filtro = null;
    this.anodo = null;
    preloadImages().then(() => drawMam(ctx, this.alturaCompresor));
  }

  mError(x) {
    return Math.random() * x - (x / 2);
  }

  construirEstado(isActivo) {
    return {
      altura: (this.alturaCompresor),
      fuerza:
        this.alturaCompresor == this.alturaMinima()
          ? (this.fuerza + this.errorFuerza + this.margenF) * this.factorCompresion
          : 0,
      kilovolt: isActivo
        ? this.kilovolt + this.errorKilovolt + this.mError(margenKV)
        : 0,
      miliamperios: isActivo
        ? this.miliamperios + this.errorMiliamperios + this.mError(margenmA)
        : 0,
      filtro: this.filtro,
      anodo: this.anodo,
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
      fuerza: this.alturaCompresor == this.alturaMinima()
        ? (this.fuerza + this.margenF) * this.factorCompresion
        : 0
    };
  }

  alturaMinima() {
    return this.herramienta.getAltura();
  }

  actualizar(activo = false) {

    this.herramienta.actualizar(this.construirEstado(activo));
    // this.dibujar();
  }

  dibujar(ctx) {
    drawMam(
      ctx,
      this.alturaCompresor,
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
  setHerramienta(herram) {
    if (this.alturaCompresor + 1 < herram.altura) {
      throw 'No se puede posicionar la herramienta con el compresor tan bajo';
      // return;
    }
    if (this.herramienta.getTipo() == herram.getTipo()) {
      this.herramienta = new BaseNula();
    } else {
      this.herramienta = herram;
    }
    this.actualizar();
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
    this.alturaCompresor += 5;
    this.factorCompresion = 0.0
    this.actualizar();
  }

  bajarCompresor() {
    if (this.alturaCompresor <= this.herramienta.altura) {
      this.factorCompresion = (this.factorCompresion + this.factorCompMax) / 2;
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - 5, this.alturaMinima());
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
    this.actualizar();
  }

  bajarCompresorPerilla() {
    if (this.alturaCompresor <= this.herramienta.altura) {
      this.factorCompresion = (this.factorCompresion + this.factorCompManual) / 2;
    } else {
      this.alturaCompresor = Math.max(this.alturaCompresor - 3, this.alturaMinima());
    }
    this.actualizar();
  }
  dibujarResultadoDisparo(ctx) {
    ctx.font = "14px Arial";
    ctx.fillText("KV: " + this.kilovolt , 10, 150);
    ctx.font = "14px Arial";
    ctx.fillText("mAs: " + this.miliamperios , 10, 170);
    ctx.font = "14px Arial";
    ctx.fillText("modo: " + this.modo , 10, 190);
    ctx.font = "14px Arial";
    ctx.fillText("filtro: " + this.filtro , 10, 210);
    ctx.font = "14px Arial";
    ctx.fillText("anodo: " + this.anodo , 10, 230);
    this.actualizar();
    
  }


}
