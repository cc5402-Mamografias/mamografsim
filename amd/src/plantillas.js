import jQuery from "jquery";
window.$ = window.jQuery = $ = jQuery;

class PlantillaAbstracta {
    constructor(errors){
        this.errorFuerza = errors["errorf"][1] ? "Sí" : "No";
        this.errorAltura = errors["erroralt"][1] ? "Sí" : "No";
        this.errorVisor = errors["errorvis"][1] ? "Sí" : "No";
        this.rangemargenmA = errors["errorrep"][1] ? "Sí" : "No";
        this.errorLinealidad = errors["errorlin"][1] ? "Sí" : "No";
        this.errorRendimiento = errors["errorrend"][1] ? "Sí" : "No";
        //RECORDATORIO: falta agregar errores imagen    
    }
    setFeedback(){

    }
}

export class PlantillaCompresion extends PlantillaAbstracta{
    constructor(errors) {
        super(errors);
    }

    setFeedback(){
        let errorAltura = this.errorAltura;
        let errorFuerza = this.errorFuerza;
        let errorVisor = this.errorVisor;

        $("#volver-menu-desde-prueba-compresion").on('click', () => {
            $("#contenedor-button").show();
            $("#contenedor-sim").hide();
            });
    
            $("#loader").remove();

        $("body").on("click", "#finalizar_compresion", function () {

            $("#modal-compresion").modal("show");

            //appending modal background inside the contenedor-main div
            $('.modal-backdrop').appendTo('#plantilla');
            $('.modal-backdrop').height("120%");


            //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
            $('body').removeClass("modal-open");
            $('body').css("padding-right", "");

            // REsultados esperados
            $('#resultado_fuerza_ejercida_real').text(errorFuerza);
            $('#resultado_diferencia_fuerza_moto_real').text(errorVisor);
            $('#resultado_diferencia_fuerza_manual_real').text(errorVisor);
            $('#resultado_espesor_20_real').text(errorAltura);
            $('#resultado_espesor_45_real').text(errorAltura);
            $('#resultado_espesor_70_real').text(errorAltura);

            // Resultados ingresados por usuario
            $('#resultado_fuerza_ejercida_ingresado').html(document.getElementById("cumple_fuerza_ejercida").value);
            $('#resultado_diferencia_fuerza_moto_ingresado').html(document.getElementById("cumple_moto").value);
            $('#resultado_diferencia_fuerza_manual_ingresado').html(document.getElementById("cumple_manual").value);
            $('#resultado_espesor_20_ingresado').html(document.getElementById("cumple_20").value);
            $('#resultado_espesor_45_ingresado').html(document.getElementById("cumple_45").value);
            $('#resultado_espesor_70_ingresado').html(document.getElementById("cumple_70").value);
        });
    }


}

export class PlantillaRendimiento extends PlantillaAbstracta{
    constructor(errors) {
        super(errors);
    }

    setFeedback(){
        let rangemargenmA  = this.rangemargenmA;
        let errorLinealidad = this.errorLinealidad;
        let errorRendimiento = this.errorRendimiento;
        $("#volver-menu-desde-prueba-rendimiento").on('click', () => {

            console.log("RENDIMIENTO")
            $("#contenedor-button").show();
            $("#contenedor-sim").hide();
            });
    
            $("#loader").remove();


        $("body").on("click", "#finalizar_rendimiento", function () {

            $("#modal-rendimiento").modal("show");

            //appending modal background inside the contenedor-main div
            $('.modal-backdrop').appendTo('#plantilla');
            $('.modal-backdrop').height("270%");


            //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
            $('body').removeClass("modal-open");
            $('body').css("padding-right", "");
            

            // REsultados esperados
            $('#repet_conf1_real').text(rangemargenmA);
            $('#repet_conf2_real').text(rangemargenmA);
            $('#repet_conf3_real').text(rangemargenmA);
            $('#repet_conf4_real').text(rangemargenmA);
            $('#linealidad_conf1_real').text(errorLinealidad);
            $('#linealidad_conf2_real').text(errorLinealidad);
            $('#linealidad_conf3_real').text(errorLinealidad);
            $('#linealidad_conf4_real').text(errorLinealidad);
            $('#rend_conf1_real').text(errorRendimiento);
            $('#rend_conf2_real').text(errorRendimiento);
            $('#rend_conf3_real').text(errorRendimiento);
            $('#rend_conf4_real').text(errorRendimiento);

            // Resultados ingresados por usuario
            $('#repet_conf1_ingresado').text(document.getElementById("cumple_rep_conf1").value);
            $('#repet_conf2_ingresado').text(document.getElementById("cumple_rep_conf2").value);
            $('#repet_conf3_ingresado').text(document.getElementById("cumple_rep_conf3").value);
            $('#repet_conf4_ingresado').text(document.getElementById("cumple_rep_conf4").value);
            $('#linealidad_conf1_ingresado').text(document.getElementById("cumple_lin_conf1").value);
            $('#linealidad_conf2_ingresado').text(document.getElementById("cumple_lin_conf2").value);
            $('#linealidad_conf3_ingresado').text(document.getElementById("cumple_lin_conf3").value);
            $('#linealidad_conf4_ingresado').text(document.getElementById("cumple_lin_conf4").value);
            $('#rend_conf1_ingresado').text(document.getElementById("cumple_rend_conf1").value);
            $('#rend_conf2_ingresado').text(document.getElementById("cumple_rend_conf2").value);
            $('#rend_conf3_ingresado').text(document.getElementById("cumple_rend_conf3").value);
            $('#rend_conf4_ingresado').text(document.getElementById("cumple_rend_conf4").value);
            
            
        });
    }
}

export class PlantillaImagen extends PlantillaAbstracta{
    constructor(errors) {
        super(errors);
    }

    setFeedback(){
        $("#volver-menu-desde-prueba-imagen").on('click', () => {
            console.log("IMAGEN")
            $("#contenedor-button").show();
            $("#contenedor-sim").hide();
            });
    
            $("#loader").remove();
        $("body").on("click", "#finalizar_imagen", function () {

            $("#modal-imagen").modal("show");

            //appending modal background inside the contenedor-main div
            $('.modal-backdrop').appendTo('#plantilla');
            $('.modal-backdrop').height("250%");


            //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
            $('body').removeClass("modal-open");
            $('body').css("padding-right", "");

            // REsultados esperados
            //FALTA RELLENAR!!!!!!
           // $('#cualitativa_real').text();
           // $('#cuantitativa1_real').text();
           // $('##cuantitativa2_real').text();
           

            // Resultados ingresados por usuario

            $('#cualitativa_ingresada').text(document.getElementById("cumple_cual").value);
            $('#cuantitativa1_ingresada').text(document.getElementById("cumple_cuantuno").value);
            $('#cuantitativa2_ingresada').text(document.getElementById("cumple_cuantdos").value);

            
        });
    }
}
