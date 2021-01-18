window.$ = window.jQuery = $ = jQuery;

function actualizar_funciones(number){
    calcular_S(number);
    corregir_K(number);
    calcular_DGM(number);
}


function calcular_S(number){
    var an = (document.getElementById("anodo_"+number.toString()).value.length == 0) ? "sin_valor" : (document.getElementById("anodo_"+number.toString()).value).toString();
    var fil = (document.getElementById("filtro_"+number.toString()).value.length == 0) ? "sin_valor" : (document.getElementById("filtro_"+number.toString()).value).toString();
    var s = null;

    if (an === "mo" && fil === "mo"){
        s = 1;
    }
    else if (an === "mo" && fil === "rh"){
        s = 1.017;
    }
    else if (an === "rh" && fil === "rh"){
        s = 1.061;
    }
    else if (an === "w" && fil === "rh"){
        s = 1.042;
    }
    else if (an === "w" && fil === "ag"){
        s = 1.042;
    }
    else{ //caso de error
        s= -1;
    }
    document.getElementById("s_"+number.toString()).value = s;
}

function corregir_K(number){
    var k = (document.getElementById("kerma_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma_"+number.toString()).value);
    var dt = (document.getElementById("dt_main").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("dt_main").value);
    var valores = [k,dt];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });
    var result = (valoresreales.length != 2) ? 0 : calcular_k(number,k,dt);
    document.getElementById("kermacorr_"+number.toString()).value = result;

}
function calcular_k(number,k,dt){
    if (number == 45){
        return k.toFixed(4);
    }
    else if (number == 20){
        return (k*Math.pow(((dt -45)/(dt - 20)),2)).toFixed(4);
    }
    else if (number == 70){
        return (k*Math.pow(((dt -45)/(dt - 70)),2)).toFixed(4);
    }

}
function calcular_DGM(number){
    var gc = (document.getElementById("gc_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("gc_"+number.toString()).value);
    var s = (document.getElementById("s_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("s_"+number.toString()).value);
    var kcor = (document.getElementById("kermacorr_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kermacorr_"+number.toString()).value);
    var valores = [gc,s,kcor];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });
    var result = (valoresreales.length != 3) ? 0 : (gc*s*kcor).toFixed(4);
    document.getElementById("dgm_"+number.toString()).value = result;
}