import jQuery from "jquery";
window.$ = window.jQuery = $ = jQuery;

export default class PlantillaCompresion {

    constructor(errors){
        this.errorFuerza = errors["errorf"][1] ? "Sí" : "No";
        this.errorAltura = errors["erroralt"][1] ? "Sí" : "No";
        this.errorVisor = errors["errorvis"][1] ? "Sí" : "No";
        this.rangemargenmA = errors["errorrep"][1] ? "Sí" : "No";
        this.errorLinealidad = errors["errorlin"][1] ? "Sí" : "No";
        this.errorRendimiento = errors["errorrend"][1] ? "Sí" : "No";
    }

    setModal(){
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



function valoresIngresados(){
    $('#resultado_fuerza_ejercida_ingresado').html(this.errorFuerza);
    $('#resultado_diferencia_fuerza_ingresado').html(this.errorVisor);
    $('#resultado_espesor_20_ingresado').html(this.errorAltura);
    $('#resultado_espesor_45_ingresado').html(this.errorAltura);
    $('#resultado_espesor_70_ingresado').html(document.getElementById("cumple_75").value);
}

