window.$ = window.jQuery = $ = jQuery;

function actualizar_funciones(SelectedObject){
    (document.getElementById("ampv_20").innerHTML === '-') ? {} : calcular_SDNR(20) ;
    (document.getElementById("bmpv_20").innerHTML === '-') ? {} : calcular_SDNR(20) ;
    (document.getElementById("cdest_20").innerHTML === '-') ? {} : calcular_SDNR(20) ;
    (document.getElementById("ampv_45").innerHTML === '-') ? {} : calcular_SDNR(45) ;
    (document.getElementById("bmpv_45").innerHTML === '-') ? {} : calcular_SDNR(45) ;
    (document.getElementById("cdest_45").innerHTML === '-') ? {} : calcular_SDNR(45) ;
    (document.getElementById("ampv_70").innerHTML === '-') ? {} : calcular_SDNR(70) ;
    (document.getElementById("bmpv_70").innerHTML === '-') ? {} : calcular_SDNR(70) ;
    (document.getElementById("cdest_70").innerHTML === '-') ? {} : calcular_SDNR(70) ;
}


function calcular_SDNR(num){
    var A = (document.getElementById("ampv_"+num.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("ampv_"+num.toString()).value);
    var B = (document.getElementById("bmpv_"+num.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("bmpv_"+num.toString()).value);
    var C = (document.getElementById("cdest_"+num.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("cdest_"+num.toString()).value);
    var valores = [A,B,C];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });

    var result = (valoresreales.length != 3) ? 0 : parseFloat(Math.abs((B-A)/C)).toFixed(3)
    document.getElementById("sdnr_"+num.toString()).value = result;

}