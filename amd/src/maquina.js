define(['mod_mamografsim/herramientas', 'mod_mamografsim/vista'], function (hs, v) {
  // TODO rango superior altura
  //      rango inferior altura
  //      altura predeterminada
  //      construir estado
  //      no activar si esta muy alto?
  //      inicializar errores

  var herramienta = new hs.HerramNull();
  var alturaCompresor = null;

  function construirEstado(activo) {

  }

  function actualizarHerramienta(activo = false) {
    herramienta.actualizar(construirEstado(activo));
  }

  return {
    setHerramienta: function(herram) {
      herramienta = herram;
      actualizarHerramienta()
    },
    getHerramienta: function() {
      return herramienta;
    },
    subirCompresor: function() {
      alturaCompresor -= 1;
      actualizarHerramienta()
    },
    bajarCompresor: function() {
      alturaCompresor += 1;
      actualizarHerramienta()
    },
    activar: function() {
      actualizarHerramienta(activo=true);
    },
    dibujar: function() {
      v.dibujarMaquina(construirEstado(false));
    }
  }
});