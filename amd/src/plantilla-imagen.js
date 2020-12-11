function show_pr() {
    let x = document.getElementById("plantilla-imagen");
    x.style.display = "block";
    }

function hide_pr() {
    let x = document.getElementById("plantilla-imagen");
    x.style.display = "none";
}
      
       
function actualizar_funciones(SelectedObject){
    (document.getElementById("a_real_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_real_planilla")) ;
    (document.getElementById("b_real_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_real_planilla")) ;
    (document.getElementById("c_real_planilla").innerHTML === '-') ? {} : calcular_SDNR(document.getElementById("SDNR_real_planilla")) ;
}



function calcular_SDNR(SelectedObject){
    var A = (document.getElementById("a_real_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("a_real_planilla").value);
    var B = (document.getElementById("b_real_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("b_real_planilla").value);
    var C = (document.getElementById("c_real_planilla").value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("c_real_planilla").value);

    console.log(A)

    console.log(B)

    console.log(C)
    var valores = [A,B,C];
    var valoresreales = valores.filter(function(x) {
    return x !== "sin_valor";
    });
    
    var result = (valoresreales.length != 3) ? 0 : parseFloat((B-A)/C).toFixed(2)

    console.log(result)
    document.getElementById("SDNR_real_planilla").value = result;
    console.log(document.getElementById("SDNR_real_planilla").value)
    
}