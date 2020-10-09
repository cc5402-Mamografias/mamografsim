const alturaMax = 30;
const alturaMin = 0;
const margenF = 0.5;
const margenKV = 1;
const margenmA = 10;

export class Maquina {
  constructor() {
    this.alturaCompresor = 30;
    this.fuerza = 0;
    this.den = 0;
    this.kilovolt = null;
    this.miliamperios = null;
    this.errorKilovolt = 0;
    this.errorMiliamperios = 0;
    this.modo = null;
    this.filtro = null;
    this.anodo = null;
  }

  construirEstado(activo) {
    return {
      altura: this.alturaCompresor,
      fuerza:
        this.alturaCompresor == this.alturaMinima
          ? fuerza(Math.random() * margenF) - margenF
          : 0,
      kilovolt: this.kilovolt + this.errorKilovolt + Math.random() * margenKV - margenKV,
      miliamperios:
        this.miliamperios + this.errorMiliamperios + Math.random() * margenmA - margenmA,
      den: this.den,
      filtro: this.filtro,
      anodo: this.anodo,
      activo: activo,
    };
  }

  actualizar(activo = false){
    e = construirEstado(activo)
    // herramienta.actualizar(e);
    // v.dibujarMaquina(e);

  }


  setearParams(kv, ma, dn, md, fltr, anod){
    kilovolt = kv;
    miliamperios = ma;
    modo = md;
    den = dn;
    filtro = fltr;
    anodo = anod;
    // actualizar();

  }

  setHerramienta(herramienta){
    this.herramienta = herramienta;
  }

  getHerramienta(herramienta){
    return this.herramienta;
  }

  subirCompresor(){
    if (this.alturaCompresor + 1 > alturaMax) {
      throw "altura max";
    }
    this.alturaCompresor += 1;
    // actualizar()
  }

  activar(){
    this.activo = activo; 

  }

}
