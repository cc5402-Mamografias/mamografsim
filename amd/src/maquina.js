define(['mod_mamografsim/herramientas', 'mod_mamografsim/vista'], function (hs, v) {
  // TODO valores defecto (reemplazar nulls)
  //      no activar si esta muy alto?
  //      no deseleccionar herramienta si la altura es muy baja

  var herramienta = new hs.HerramNull();

  const alturaMax = 30;
  const alturaMin = 0;
  const margenKV = 0.5;
  const margenmA = 0.5;

  var alturaCompresor = 30;
  var fuerza = null;
  var kilovolt = null;
  var miliamperios = null;
  var errorKilovolt = 0;
  var errorMiliamperios = 0;

  function construirEstado(activo) {
    return {
      altura: alturaCompresor,
      fuerza: fuerza,
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

  return {
    // Inicializa los errores
    init: function(errorkv, errorma) {
      errorKilovolt = errorkv;
      errorMiliamperios = errorma;
    },
    // Setea los parametros del panel de control
    setearParams: function(kv, ma) {
      kilovolt = kv;
      miliamperios = ma;
      actualizar();
    },
    // Selecciona una nueva herramienta o deselecciona la antigua
    setHerramienta: function(herram) {
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
        throw "ya en altura máxima";
      }
      alturaCompresor += 1;
      actualizar()
    },
    // Baja el compresor
    bajarCompresor: function() {
      if (alturaCompresor - 1 < alturaMin) {
        throw "ya en altura mínima";
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