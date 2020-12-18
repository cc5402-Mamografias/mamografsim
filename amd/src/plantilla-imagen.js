window.$ = window.jQuery = $ = jQuery;

function actualizar_funciones(SelectedObject){
    (document.getElementById("a_actual_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_actual_planilla")) ;
    (document.getElementById("b_actual_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_actual_planilla")) ;
    (document.getElementById("c_actual_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_actual_planilla")) ;
}



function calcular_SDNR(SelectedObject){
    var A = (document.getElementById("a_actual_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("a_actual_planilla").value);
    var B = (document.getElementById("b_actual_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("b_actual_planilla").value);
    var C = (document.getElementById("c_actual_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("c_actual_planilla").value);
    var valores = [A,B,C];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });

    var result = (valoresreales.length != 3) ? 0 : parseFloat((B-A)/C).toFixed(2)
    document.getElementById("SDNR_actual_planilla").value = result;

}