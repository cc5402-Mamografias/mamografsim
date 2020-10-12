import { BaseNula } from "./herramientas";
import { preloadImages, drawMam } from "./vista";

const alturaMax = 160;
const margenF = 0.5;
const margenKV = 1;
const margenmA = 10;

export default class Maquina {
  constructor(errorkv, errorma, errorF) {
    this.herramienta = new BaseNula();

    this.alturaCompresor = 160;
    this.fuerza = 20;

    this.kilovolt = null;
    this.miliamperios = null;

    this.errorKilovolt = errorkv;
    this.errorMiliamperios = errorma;
    this.errorFuerza = errorF;

    this.modo = null;
    this.filtro = null;
    this.anodo = null;
    preloadImages().then(drawMam);
  }

  mError(x) {
    return (Math.random() * x) - x;
  }

  construirEstado(isActivo) {
    return {
      altura: this.alturaCompresor,
      fuerza:
        this.alturaCompresor == this.alturaMinima()
          ? this.fuerza + this.errorFuerza + this.mError(margenF)
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

  alturaMinima() {
    return this.herramienta.getAltura();
  }

  actualizar(activo = false) {
    this.herramienta.actualizar(this.construirEstado(activo));
    this.dibujar();
  }

  dibujar() {
    drawMam(this.alturaCompresor, [this.herramienta]);
  }

  // Setea los parametros del panel de control
  setearParams(kv, ma, md, fltr, anod) {
    this.kilovolt = kv;
    this.miliamperios = ma;
    this.modo = md;
    this.filtro = fltr;
    this.anodo = anod;
  }

  // Selecciona una nueva herramienta o deselecciona la antigua
  setHerramienta(herram) {
    if (this.alturaCompresor == this.alturaMinima()) {
      return;
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
    if (this.alturaCompresor + 1 > alturaMax) {
      throw "compresion max";
    }
    this.alturaCompresor += 5;
    console.log(this.alturaCompresor);
    this.actualizar();
  }

  bajarCompresor() {
    if (this.alturaCompresor == 0) {
      throw "compresion min";
    }
    this.alturaCompresor -= 5;
    console.log(this.alturaCompresor);
    this.actualizar();
  }
}