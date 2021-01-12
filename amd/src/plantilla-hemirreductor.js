window.$ = window.jQuery = $ = jQuery;

function actualizar_funciones(SelectedObject){
    (document.getElementById("kerma00_1").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_1"),1) ;
    (document.getElementById("kerma03_1").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_1"),1) ;
    (document.getElementById("kerma04_1").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_1"),1) ;

    (document.getElementById("kerma00_2").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_2"),2) ;
    (document.getElementById("kerma03_2").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_2"),2) ;
    (document.getElementById("kerma04_2").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_2"),2) ;

    (document.getElementById("kerma00_3").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_3"),3) ;
    (document.getElementById("kerma03_3").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_3"),3) ;
    (document.getElementById("kerma04_3").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_3"),3) ;

    (document.getElementById("kerma00_4").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_4"),4) ;
    (document.getElementById("kerma03_4").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_4"),4) ;
    (document.getElementById("kerma04_4").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_4"),4) ;

    (document.getElementById("kerma00_5").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_5"),5) ;
    (document.getElementById("kerma03_5").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_5"),5) ;
    (document.getElementById("kerma04_5").innerHTML === '-') ? {} : calcular_EHR(document.getElementById("ehr_5"),5) ;
}



function calcular_EHR(SelectedObject,number){
    var l0 = (document.getElementById("kerma00_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma00_"+number.toString()).value);
    var l1 = (document.getElementById("kerma03_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma03_"+number.toString()).value);
    var l2 = (document.getElementById("kerma04_"+number.toString()).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("kerma04_"+number.toString()).value);
    var valores = [l0,l1,l2];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });

    var result = (valoresreales.length != 3) ? 0 : ehr(l0,l1,l2)
    document.getElementById("ehr_"+number.toString()).value = result;

}

function ehr(l0,l1,l2){
    return parseFloat((0.3*(Math.log(2*l2/l0))-0.4*(Math.log(2*l1/l0)))/(Math.log(l2/l1))).toFixed(2)
}