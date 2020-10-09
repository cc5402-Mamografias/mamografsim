define(['mod_mamografsim/herramientas', 'mod_mamografsim/vista'], function (hs, v) {

  var herramienta = null;

  const alturaMax = 30;
  const alturaMin = 0;
  const margenF = 0.5;
  const margenKV = 1;
  const margenmA = 10;

  var alturaCompresor = 30;
  var fuerza = 20;

  var kilovolt = null;
  var miliamperios = null;

  var errorKilovolt = 0;
  var errorMiliamperios = 0;
  var errorFuerza = 0;

  var modo = null;
  var filtro = null;
  var anodo = null;

  function mError(x) {
    return (Math.random() * x) - x;
  }

  function construirEstado(activo) {
    return {
      altura: alturaCompresor,
      fuerza: alturaCompresor == alturaMinima? fuerza + mError(margenF) + errorFuerza: 0,
      kilovolt: kilovolt + errorKilovolt + mError(margenKV),
      miliamperios: miliamperios + errorMiliamperios + mError(margenmA),
      filtro: filtro,
      anodo: anodo,
      activo: activo
    };
  }

  function actualizar(activo = false) {
    let e = construirEstado(activo)
    herramienta.actualizar(e);
    v.dibujarMaquina(e);
  }

  function alturaMinima() {
    return herramienta === null? alturaMin : herramienta.getAltura();
  }

  return {
    // Setea los parametros del panel de control
    setearParams: function(kv, ma, md, fltr, anod) {
      kilovolt = kv;
      miliamperios = ma;
      modo = md;
      filtro = fltr;
      anodo = anod;
      actualizar();
    },
    // Inicializa los errores
    init: function(errorkv, errorma, errorFuerza, kv, ma, den, modo, filtro, anodo) {
      errorKilovolt = errorkv;
      errorMiliamperios = errorma;
      fuerza = 20 + errorFuerza;
      this.setearParams(kv, ma, den, modo, filtro, anodo);
    },
    // Selecciona una nueva herramienta o deselecciona la antigua
    setHerramienta: function(herram) {
      if (alturaCompresor == alturaMinima()) {
        return;
      }
      herramienta = herram;
      actualizar();
    },
    // Entrega la herramienta actual
    getHerramienta: function() {
      return herramienta;
    },
    // Sube el compresor
    subirCompresor: function() {
      if (alturaCompresor + 1 > alturaMax) {
        throw "altura max";
      }
      alturaCompresor += 1;
      actualizar();
    },
    // Baja el compresor
    bajarCompresor: function() {
      if (alturaCompresor == alturaMinima()) {
        throw "altura min";
      }
      alturaCompresor -= 1;
      actualizar();
    },
    // Activa el mamografo
    activar: function() {
      actualizar(true);
    }
  };
});