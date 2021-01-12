window.$ = window.jQuery = $ = jQuery;

function actualizar_funciones(SelectedObject){
    //console.log("actualizo")
    calcular_EHR(document.getElementById("ehr_1"),1) ;
    calcular_EHR(document.getElementById("ehr_2"),2) ;
    calcular_EHR(document.getElementById("ehr_3"),3) ;
    calcular_EHR(document.getElementById("ehr_4"),4) ;
    calcular_EHR(document.getElementById("ehr_5"),5) ;
   
}


function actualizar_funciones_iniciales(){
    console.log("actualizo")
    calcular_limites(1);
    calcular_limites(2);
    calcular_limites(3);
    calcular_limites(4);
    calcular_limites(5);
   
}


function calcular_EHR(SelectedObject,number){
    console.log("calculoehr")
    var l0 = (document.getElementById("kerma00_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma00_"+number.toString()).value);
    var l1 = (document.getElementById("kerma03_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma03_"+number.toString()).value);
    var l2 = (document.getElementById("kerma04_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma04_"+number.toString()).value);

    console.log(l0)
    console.log(l1)
    console.log(l2)
    var valores = [l0,l1,l2];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });

    var result = (valoresreales.length != 3) ? 0 : ehr(l0,l1,l2)
    console.log("valor es:")

    console.log(result)
    document.getElementById("ehr_"+number.toString()).value = result;

}

function calcular_limites(number){

    console.log("CALCULO LIMITES")

    console.log("C_"+number.toString())
    var kv = document.getElementById("kv_main").value
    console.log(kv)
    var mas = document.getElementById("mas_main").value
    var c = document.getElementById("C_"+number.toString()).value

    console.log(c)

    var liminf = parseFloat((kv/100)+0.03).toFixed(4)
    var limsup = parseFloat((kv/100)+0.02 + parseFloat(c)).toFixed(4)

    document.getElementById("liminf_"+number.toString()).value = liminf;
    document.getElementById("limsup_"+number.toString()).value = limsup;

}

function ehr(l0,l1,l2){
    console.log("goooo")
    return parseFloat((0.3*(Math.log(2*l2/l0))-0.4*(Math.log(2*l1/l0)))/(Math.log(l2/l1))).toFixed(4)
}