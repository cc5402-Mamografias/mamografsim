define(['mod_mamografsim/herramientas', 'mod_mamografsim/vista'], function (hs, v) {
  // TODO rango superior altura
  //      rango inferior altura
  //      valores defecto (reemplazar nulls)
  //      construir estado
  //      no activar si esta muy alto?
  //      no deseleccionar herramienta si la altura es muy baja

  var herramienta = new hs.HerramNull();

  
  var alturaCompresor = null;
  var fuerza = null;
  var kilovolt = null;
  var miliamperios = null;
  var errorKilovolt = 0;
  var errorMiliamperios = 0;

  function construirEstado(activo) {

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
      alturaCompresor -= 1;
      actualizar()
    },
    // Baja el compresor
    bajarCompresor: function() {
      alturaCompresor += 1;
      actualizar()
    },
    // Activa el mamografo
    activar: function() {
      actualizar(activo=true);
    }
  }
});