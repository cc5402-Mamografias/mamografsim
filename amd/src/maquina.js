define(['mod_mamografsim/herramientas', 'mod_mamografsim/vista'], function (hs, v) {
  // Herramienta nula?/deseleccionar herramienta
  // TODO valores defecto (reemplazar nulls)

  var herramienta = null;

  const alturaMax = 30;
  const alturaMin = 0;
  const margenF = 0.5;
  const margenKV = 1;
  const margenmA = 10;

  var alturaCompresor = 30;
  var fuerza = 0;
  var kilovolt = null;
  var miliamperios = null;
  var errorKilovolt = 0;
  var errorMiliamperios = 0;

  function construirEstado(activo) {
    return {
      altura: alturaCompresor,
      fuerza: alturaCompresor == alturaMinima? fuerza (Math.random() * margenF) - margenF: 0,
      kilovolt: kilovolt + errorKilovolt + (Math.random() * margenKV) - margenKV,
      miliamperios: miliamperios + errorMiliamperios + (Math.random() * margenmA) - margenmA,
      activo: activo
    }
  }

  function actualizar(activo = false) {
    e = construirEstado(activo)
    herramienta.actualizar(e);
    v.dibujarMaquina(e);
  }

  function alturaMinima() {
    return herramienta === null? alturaMin : herramienta.getAltura();
  }

  return {
    // Inicializa los errores
    init: function(errorkv, errorma, errorFuerza) {
      errorKilovolt = errorkv;
      errorMiliamperios = errorma;
      fuerza = 20 + errorFuerza;
    },
    // Setea los parametros del panel de control
    setearParams: function(kv, ma) {
      kilovolt = kv;
      miliamperios = ma;
      actualizar();
    },
    // Selecciona una nueva herramienta o deselecciona la antigua
    setHerramienta: function(herram) {
      if (alturaCompresor == alturaMinima()) {
        return;
      }
      herramienta = herram;
      actualizar()
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
      actualizar()
    },
    // Baja el compresor
    bajarCompresor: function() {
      if (alturaCompresor == alturaMinima()) {
        throw "altura min";
      }
      alturaCompresor -= 1;
      actualizar()
    },
    // Activa el mamografo
    activar: function() {
      actualizar(activo=true);
    }
  }
});