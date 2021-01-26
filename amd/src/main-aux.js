
window.$ = window.jQuery = $ = jQuery;

window.onload = function (event) {
  initreal(exterrores.foo);
}



var m = null;
var errores = null;
class Main {
  constructor(errors) {
    // Errores ya estan cvargados

    this.errordict = errors;

    // Plantillas de pruebas
    this.plantilla_prueba = {};
    this.plantilla_prueba["hemirreductor"] = new PlantillaHemirreductor(this.errordict);
    this.plantilla_prueba["compresion"] = new PlantillaCompresion(this.errordict);
    this.plantilla_prueba["rendimiento"] = new PlantillaRendimiento(this.errordict);
    this.plantilla_prueba["imagen"] = new PlantillaImagen(this.errordict);
    this.plantilla_prueba["kermadgm"] = new PlantillaKermaDGM(this.errordict);
    this.plantilla_prueba["cae"] = new PlantillaCAE(this.errordict);
  }

}


export const init2 = (errors) => {
  errores = errors;
  var errordict = {}
  errors.forEach((pair) => {
    errordict[pair[0]] = pair[1];

  });
  m = new Main(errordict);
  window.myLib = {}
  reload();

};

function initreal(errors){
  
  m = new Main(errors);
  reload();


};


export function reload(){
  m.plantilla_prueba["hemirreductor"].setFeedback();
  m.plantilla_prueba["compresion"].setFeedback();
  m.plantilla_prueba["rendimiento"].setFeedback();
  m.plantilla_prueba["imagen"].setFeedback();
  m.plantilla_prueba["kermadgm"].setFeedback();
  m.plantilla_prueba["cae"].setFeedback();
};

class PlantillaAbstracta {
  constructor(errors) {
    console.log(errors)
    this.errorFuerza = errors["errorf"][1] ? "Sí" : "No";
    this.errorAltura = errors["erroralt"][1] ? "Sí" : "No";
    this.errorVisor = errors["errorvis"][1] ? "Sí" : "No";
    this.rangemargenmA = errors["errorrep"][1] ? "Sí" : "No";
    this.errorLinealidad = errors["errorlin"][1] ? "Sí" : "No";
    this.errorRendimiento = errors["errorrend"][1] ? "Sí" : "No";
    this.errorImagenLineas = errors["errorimglin"][1]
      ? "No se observan líneas en la imagen (aceptable)."
      : "Se observan líneas en la imagen (no aceptable).";
    this.errorImagenRuido = errors["errorimgsp"][1]
      ? "Se observan pocos pixeles blancos y negros, y espaciados entre sí (aceptable)."
      : "Se observan muchos pixeles blancos y negros (no aceptable).";
    this.errorContraste = errors["errorvmp"][1]
      ? "Existe un bajo nivel de contraste (aceptable)."
      : "Existe un alto nivel de contraste (no aceptable).";
    // TODO: Revisar si contraste afecta el resultado de la evaluación cualitativa
    this.errorCualitativa =
      errors["errorimglin"][1] && errors["errorimgsp"][1] ? "Sí" : "No";

    this.errorHemirreductor =
      errors["errorhem"][1] ? "Sí" : "No";
    this.errorDGM =
      errors["errordgm"][1] ? "Sí" : "No";
    this.errorCAE =
      errors["errorcae"][1] ? "Sí" : "No";

    $('#plantilla').on('focus', 'input[type=number]', function (e) {
      $(this).on('wheel.disableScroll', function (e) {
        e.preventDefault()
      })
    })

    $('#plantilla').on('blur', 'input[type=number]', function (e) {
      $(this).off('wheel.disableScroll');
    })
  }

  setFeedback() { }
}

class PlantillaCompresion extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }

  setFeedback() {
    let errorAltura = this.errorAltura;
    let errorFuerza = this.errorFuerza;
    let errorVisor = this.errorVisor;

    

    $("body").on("click", "#finalizar_compresion", function () {
      $("#modal-compresion").modal("show");
      $("#plantilla").scrollTop(0);
      //$("#modal-compresion").scrollIntoView(true);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("120%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#resultado_fuerza_ejercida_real").text(errorFuerza);
      $("#resultado_diferencia_fuerza_moto_real").text(errorVisor);
      $("#resultado_diferencia_fuerza_manual_real").text(errorVisor);
      $("#resultado_espesor_20_real").text(errorAltura);
      $("#resultado_espesor_45_real").text(errorAltura);
      $("#resultado_espesor_70_real").text(errorAltura);

      // Resultados ingresados por usuario
      $("#resultado_fuerza_ejercida_ingresado").html(
        document.getElementById("cumple_fuerza_ejercida").value
      );
      $("#resultado_diferencia_fuerza_moto_ingresado").html(
        document.getElementById("cumple_moto").value
      );
      $("#resultado_diferencia_fuerza_manual_ingresado").html(
        document.getElementById("cumple_manual").value
      );
      $("#resultado_espesor_20_ingresado").html(
        document.getElementById("cumple_20").value
      );
      $("#resultado_espesor_45_ingresado").html(
        document.getElementById("cumple_45").value
      );
      $("#resultado_espesor_70_ingresado").html(
        document.getElementById("cumple_70").value
      );
    });
  }
}

class PlantillaRendimiento extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }

  setFeedback() {
    let rangemargenmA = this.rangemargenmA;
    let errorLinealidad = this.errorLinealidad;
    let errorRendimiento = this.errorRendimiento;

    $("body").on("click", "#finalizar_rendimiento", function () {
      //$("#modal-rendimiento").scrollIntoView(true);
      $("#modal-rendimiento").modal("show");
      $("#plantilla").scrollTop(0);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("270%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#repet_conf1_real").text(rangemargenmA);
      $("#repet_conf2_real").text(rangemargenmA);
      $("#repet_conf3_real").text(rangemargenmA);
      $("#repet_conf4_real").text(rangemargenmA);
      $("#linealidad_conf1_real").text(errorLinealidad);
      $("#linealidad_conf2_real").text(errorLinealidad);
      $("#linealidad_conf3_real").text(errorLinealidad);
      $("#linealidad_conf4_real").text(errorLinealidad);
      $("#rend_conf1_real").text(errorRendimiento);
      $("#rend_conf2_real").text(errorRendimiento);
      $("#rend_conf3_real").text(errorRendimiento);
      $("#rend_conf4_real").text(errorRendimiento);

      // Resultados ingresados por usuario
      $("#repet_conf1_ingresado").text(
        document.getElementById("cumple_rep_conf1").value
      );
      $("#repet_conf2_ingresado").text(
        document.getElementById("cumple_rep_conf2").value
      );
      $("#repet_conf3_ingresado").text(
        document.getElementById("cumple_rep_conf3").value
      );
      $("#repet_conf4_ingresado").text(
        document.getElementById("cumple_rep_conf4").value
      );
      $("#linealidad_conf1_ingresado").text(
        document.getElementById("cumple_lin_conf1").value
      );
      $("#linealidad_conf2_ingresado").text(
        document.getElementById("cumple_lin_conf2").value
      );
      $("#linealidad_conf3_ingresado").text(
        document.getElementById("cumple_lin_conf3").value
      );
      $("#linealidad_conf4_ingresado").text(
        document.getElementById("cumple_lin_conf4").value
      );
      $("#rend_conf1_ingresado").text(
        document.getElementById("cumple_rend_conf1").value
      );
      $("#rend_conf2_ingresado").text(
        document.getElementById("cumple_rend_conf2").value
      );
      $("#rend_conf3_ingresado").text(
        document.getElementById("cumple_rend_conf3").value
      );
      $("#rend_conf4_ingresado").text(
        document.getElementById("cumple_rend_conf4").value
      );

      //finalmente movemos la view
    });
  }
}

class PlantillaImagen extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }

  setFeedback() {
    let errorImagenLineas = this.errorImagenLineas;
    let errorImagenRuido = this.errorImagenRuido;
    let errorContraste = this.errorContraste;
    let errorCualitativa = this.errorCualitativa;


    $("body").on("click", "#finalizar_imagen", function () {
      let masIngresado =
        document.getElementById("mas_actual_planilla").value === ""
          ? 0
          : parseFloat(document.getElementById("mas_actual_planilla").value);
      let masMin = document.getElementById("mas_inferior_planilla").value;
      let masMax = document.getElementById("mas_superior_planilla").value;

      let sdnrIngresado =
        document.getElementById("SDNR_actual_planilla").value === ""
          ? 0
          : parseFloat(document.getElementById("SDNR_actual_planilla").value);
      let sdnrMin = document.getElementById("SDNR_inferior_planilla").value;
      let sdnrMax = document.getElementById("SDNR_superior_planilla").value;

      let vpmIngresado =
        document.getElementById("a_actual_planilla").value === ""
          ? 0
          : parseFloat(document.getElementById("a_actual_planilla").value);
      let vpmMin = document.getElementById("VPM_inferior_planilla").value;
      let vpmMax = document.getElementById("VPM_superior_planilla").value;

      $("#modal-imagen").modal("show");
      $("#plantilla").scrollTop(0);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("250%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#cualitativa1_real").text(errorImagenLineas + " " + errorImagenRuido);
      $("#cualitativa2_real").text(errorCualitativa);
      $("#mas_real").text(
        masMin <= masIngresado && masIngresado <= masMax ? "Sí" : "No"
      );
      $("#cuantitativa1_real").text(
        vpmMin <= vpmIngresado && vpmIngresado <= vpmMax ? "Sí" : "No"
      );
      $("#cuantitativa2_real").text(
        sdnrMin <= sdnrIngresado && sdnrIngresado <= sdnrMax ? "Sí" : "No"
      );

      // Resultados ingresados por usuario
      $("#mas_ingresada").text(document.getElementById("cumple_mas").value);
      $("#cualitativa1_ingresada").text(
        document.getElementById("cumple_cualuno").value
      );
      $("#cualitativa2_ingresada").text(
        document.getElementById("cumple_cualdos").value
      );
      $("#cuantitativa1_ingresada").text(
        document.getElementById("cumple_cuantuno").value
      );
      $("#cuantitativa2_ingresada").text(
        document.getElementById("cumple_cuantdos").value
      );
    });
  }
}

class PlantillaHemirreductor extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }

  setFeedback() {
    let errorHemirreductor = this.errorHemirreductor;
    
    $("body").on("click", "#finalizar_hemirreductor", function () {
      //$("#modal-rendimiento").scrollIntoView(true);
      $("#modal-hemirreductor").modal("show");
      $("#plantilla").scrollTop(0);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("270%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#ehr_1_real").text(errorHemirreductor);
      $("#ehr_2_real").text(errorHemirreductor);
      $("#ehr_3_real").text(errorHemirreductor);
      $("#ehr_4_real").text(errorHemirreductor);
      $("#ehr_5_real").text(errorHemirreductor);
      

      // Resultados ingresados por usuario
      $("#ehr_1_ingresado").text(
        document.getElementById("ehr_resp1").value
      );
      $("#ehr_2_ingresado").text(
        document.getElementById("ehr_resp2").value
      );
      $("#ehr_3_ingresado").text(
        document.getElementById("ehr_resp3").value
      );
      $("#ehr_4_ingresado").text(
        document.getElementById("ehr_resp4").value
      );
      $("#ehr_5_ingresado").text(
        document.getElementById("ehr_resp5").value
      );

      //finalmente movemos la view
    });
   
  }
}

class PlantillaKermaDGM extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }
  setFeedback() {
    let errorDGM = this.errorDGM;

    $("body").on("click", "#finalizar_kermadgm", function () {
      //$("#modal-rendimiento").scrollIntoView(true);
      $("#modal-kermadgm").modal("show");
      $("#plantilla").scrollTop(0);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("270%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#dgm_1_real").text(errorDGM);
      $("#dgm_2_real").text(errorDGM);
      $("#dgm_3_real").text(errorDGM);
      
      

      // Resultados ingresados por usuario
      $("#dgm_1_ingresado").text(
        document.getElementById("dgm_resp1").value
      );
      $("#dgm_2_ingresado").text(
        document.getElementById("dgm_resp2").value
      );
      $("#dgm_3_ingresado").text(
        document.getElementById("dgm_resp3").value
      );
      

      //finalmente movemos la view
    });   
  }
}

class PlantillaCAE extends PlantillaAbstracta {
  constructor(errors) {
    super(errors);
  }
  setFeedback() {
    let errorDGM = this.errorDGM;

    $("body").on("click", "#finalizar_kermadgm", function () {
      //$("#modal-rendimiento").scrollIntoView(true);
      $("#modal-kermadgm").modal("show");
      $("#plantilla").scrollTop(0);

      //appending modal background inside the contenedor-main div
      $(".modal-backdrop").appendTo("#plantilla");
      $(".modal-backdrop").height("270%");

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $("body").removeClass("modal-open");
      $("body").css("padding-right", "");

      // Resultados esperados
      $("#dgm_1_real").text(errorDGM);
      $("#dgm_2_real").text(errorDGM);
      $("#dgm_3_real").text(errorDGM);
      
      

      // Resultados ingresados por usuario
      $("#dgm_1_ingresado").text(
        document.getElementById("dgm_resp1").value
      );
      $("#dgm_2_ingresado").text(
        document.getElementById("dgm_resp2").value
      );
      $("#dgm_3_ingresado").text(
        document.getElementById("dgm_resp3").value
      );
      

      //finalmente movemos la view
    });   
  }
}



