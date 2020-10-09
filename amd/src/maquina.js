import BaseNula from "./herramientas";

const alturaMax = 30;
const margenF = 0.5;
const margenKV = 1;
const margenmA = 10;

export default class Maquina {
  constructor(errorkv, errorma, errorF) {
    this.herramienta = new BaseNula();

    this.alturaCompresor = 30;
    this.fuerza = 0;

    this.kilovolt = null;
    this.miliamperios = null;

    this.errorKilovolt = errorkv;
    this.errorMiliamperios = errorma;
    this.errorFuerza = errorF;

    this.modo = null;
    this.filtro = null;
    this.anodo = null;
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

  actualizar(activo = false){
    this.herramienta.actualizar(this.construirEstado(activo));
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
      throw "altura max";
    }
    this.alturaCompresor += 1;
    this.actualizar();
  }

  bajarCompresor() {
    if (this.alturaCompresor == this.alturaMinima()) {
      throw "altura min";
    }
    this.alturaCompresor -= 1;
    this.actualizar();
  }
}