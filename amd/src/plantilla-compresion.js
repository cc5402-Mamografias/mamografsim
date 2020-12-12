import jQuery from "jquery";
window.$ = window.jQuery = $ = jQuery;
 
class PlantillaCompresion {
    constructor(errors){
    this.errorFuerza = errors["errorf"];
    this.errorAltura = errors["erroralt"];
    this.errorVisor = errors["errorvis"];
    this.rangemargenmA = errors["errorrep"];
    this.errorLinealidad = errors["errorlin"];
    this.errorRendimiento = errors["errorrend"];
    }
    setModal(){
        console.log("holaaaaaa")
        $("#volver-menu-desde-prueba-compresion").on('click', () => {
        $("#contenedor-button").show();
        $("#contenedor-sim").hide();
        });

        $("#loader").remove();

        $("body").on("click", "#finalizar_compresion", function () {

            $("#modal-compresion").modal("show");

            //appending modal background inside the contenedor-main div
            $('.modal-backdrop').appendTo('#plantilla');

            //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
            $('body').removeClass("modal-open");
            $('body').css("padding-right", "");
        });

    }

}





